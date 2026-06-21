import { useEffect, useMemo, useState } from 'react'
import { AppNav } from './components/AppNav'
import { DayTabs } from './components/DayTabs'
import { ExerciseCard } from './components/ExerciseCard'
import { ExerciseHistoryDrawer } from './components/ExerciseHistoryDrawer'
import { HistoryView } from './components/HistoryView'
import { PlanView } from './components/PlanView'
import { ProgressionPanel } from './components/ProgressionPanel'
import { SessionNotes } from './components/SessionNotes'
import { SettingsView } from './components/SettingsView'
import { SyncPanel } from './components/SyncPanel'
import { WorkoutBrief } from './components/WorkoutBrief'
import { WorkoutHeader } from './components/WorkoutHeader'
import { WorkoutTimer } from './components/WorkoutTimer'
import { defaultWeekday, workoutPlan } from './data/workoutPlan'
import { consumeDiscordCallback } from './lib/discordAuth'
import { todayISO, weekdayFromDate } from './lib/dates'
import { findPreviousExerciseLog, getLog, makeLogId, readLogs, upsertLog } from './storage/logStore'
import { readSettings, writeSettings } from './storage/settingsStore'
import { readSyncSession, writeSyncSession } from './storage/syncStore'
import type { DayLog, ExerciseLog, ExerciseSlot, SyncSession, TrainingSettings, Weekday } from './types'
import './styles.css'

type View = 'today' | 'plan' | 'history' | 'settings'

const viewMeta: Record<View, { code: string; page: string; label: string }> = {
  today: { code: 'PF-01', page: '001', label: 'Daily lift sheet' },
  plan: { code: 'PF-02', page: '002', label: 'Weekly program map' },
  history: { code: 'PF-03', page: '003', label: 'Training ledger' },
  settings: { code: 'PF-04', page: '004', label: 'Cycle controls' }
}

const createBlankLog = (date: string, dayId: Weekday): DayLog => ({
  id: makeLogId(date, dayId),
  date,
  dayId,
  bodyWeight: '',
  energy: 'normal',
  exercises: {},
  cardio: '',
  notes: ''
})

function App() {
  const [activeView, setActiveView] = useState<View>('today')
  const [date, setDate] = useState(todayISO())
  const [selectedDay, setSelectedDay] = useState<Weekday>(() => weekdayFromDate(todayISO()))
  const [log, setLog] = useState<DayLog>(() => getLog(todayISO(), weekdayFromDate(todayISO())) ?? createBlankLog(todayISO(), weekdayFromDate(todayISO())))
  const [dataRevision, setDataRevision] = useState(0)
  const [settings, setSettings] = useState<TrainingSettings>(() => readSettings())
  const [syncSession, setSyncSession] = useState<SyncSession | null>(() => readSyncSession())
  const [historySlot, setHistorySlot] = useState<ExerciseSlot | null>(null)
  const [activeExerciseId, setActiveExerciseId] = useState('')
  const day = useMemo(() => workoutPlan.find((entry) => entry.id === selectedDay) ?? workoutPlan.find((entry) => entry.id === defaultWeekday)!, [selectedDay])
  const logs = useMemo(() => readLogs(), [dataRevision, log])

  useEffect(() => {
    consumeDiscordCallback()
      .then((session) => {
        if (!session) return
        setSyncSession(writeSyncSession(session))
        setActiveView('settings')
      })
      .catch((error) => console.error(error))
  }, [])

  useEffect(() => {
    const existing = getLog(date, selectedDay)
    setLog(existing ?? createBlankLog(date, selectedDay))
  }, [date, selectedDay, dataRevision])

  useEffect(() => {
    setActiveExerciseId((current) => (day.exercises.some((slot) => slot.id === current) ? current : day.exercises[0]?.id ?? ''))
  }, [day])

  const persist = (next: DayLog) => {
    const saved = upsertLog(next)
    setLog(saved)
  }

  const changeDate = (nextDate: string) => {
    setDate(nextDate)
    const nextWeekday = weekdayFromDate(nextDate)
    setSelectedDay(nextWeekday)
  }

  const changeDay = (dayId: Weekday) => {
    setSelectedDay(dayId)
  }

  const openDay = (dayId: Weekday) => {
    setSelectedDay(dayId)
    setActiveView('today')
  }

  const openLog = (nextDate: string, dayId: Weekday) => {
    setDate(nextDate)
    setSelectedDay(dayId)
    setActiveView('today')
  }

  const updateExercise = (exerciseSlotId: string, exerciseLog: ExerciseLog) => {
    persist({
      ...log,
      exercises: {
        ...log.exercises,
        [exerciseSlotId]: exerciseLog
      }
    })
  }

  const updateSessionField = (field: 'bodyWeight' | 'energy' | 'cardio' | 'notes', value: string) => {
    persist({ ...log, [field]: value })
  }

  const handleImported = () => {
    setDataRevision((value) => value + 1)
  }

  const updateSettings = (next: TrainingSettings) => {
    setSettings(writeSettings(next))
  }

  const showHistory = (slotId: string) => {
    const slot = workoutPlan.flatMap((entry) => entry.exercises).find((exercise) => exercise.id === slotId) ?? null
    setHistorySlot(slot)
  }

  const setAndStoreSyncSession = (session: SyncSession | null) => {
    if (session) {
      setSyncSession(writeSyncSession(session))
    } else {
      setSyncSession(null)
    }
  }

  const activateNextExercise = (slotId: string) => {
    const index = day.exercises.findIndex((slot) => slot.id === slotId)
    const next = day.exercises[index + 1] ?? day.exercises[index]
    setActiveExerciseId(next?.id ?? slotId)
  }

  const renderToday = () => (
    <>
      <DayTabs days={workoutPlan} selectedDay={selectedDay} onSelectDay={changeDay} />

      <div className="layout-grid">
        <div className="main-column">
          <WorkoutHeader
            day={day}
            date={date}
            bodyWeight={log.bodyWeight}
            energy={log.energy}
            onDateChange={changeDate}
            onBodyWeightChange={(value) => updateSessionField('bodyWeight', value)}
            onEnergyChange={(value) => updateSessionField('energy', value)}
          />

          <WorkoutBrief day={day} settings={settings} />

          <section className="exercise-stack">
            {day.exercises.map((slot) => (
              <ExerciseCard
                key={slot.id}
                slot={slot}
                value={log.exercises[slot.id] ?? null}
                previous={findPreviousExerciseLog(slot.id, date)}
                isActive={activeExerciseId === slot.id}
                onChange={(exerciseLog) => updateExercise(slot.id, exerciseLog)}
                onActivate={() => setActiveExerciseId(slot.id)}
                onNext={() => activateNextExercise(slot.id)}
                onShowHistory={() => setHistorySlot(slot)}
              />
            ))}
          </section>

          <SessionNotes
            cardio={log.cardio}
            notes={log.notes}
            onCardioChange={(value) => updateSessionField('cardio', value)}
            onNotesChange={(value) => updateSessionField('notes', value)}
          />
        </div>

        <div className="side-column">
          <SyncPanel logs={logs} settings={settings} session={syncSession} onSessionChange={setAndStoreSyncSession} />
          <WorkoutTimer />
          <ProgressionPanel onImported={handleImported} settings={settings} />
        </div>
      </div>
    </>
  )

  return (
    <main className={`app-shell view-${activeView}`} data-theme={settings.theme}>
      <div className="app-titlebar">
        <div>
          <span className="brand-mark"><img src="/twelve-labors-logo.png" alt="Twelve Labors" /></span>
          <h1>Twelve Labors</h1>
        </div>
        <p>Planet Fitness-style machine split · M-F · 6 PM · under 60 minutes</p>
      </div>

      <AppNav activeView={activeView} onChange={setActiveView} />

      <section className="page-sheet" aria-label={viewMeta[activeView].label}>
        <div className="page-ruler" aria-hidden="true">
          <span>{viewMeta[activeView].code}</span>
          <span>Page {viewMeta[activeView].page}</span>
          <span>{viewMeta[activeView].label}</span>
        </div>
        {activeView === 'today' ? renderToday() : null}
        {activeView === 'plan' ? <PlanView days={workoutPlan} onOpenDay={openDay} onShowHistory={showHistory} /> : null}
        {activeView === 'history' ? <HistoryView logs={logs} days={workoutPlan} onOpenLog={openLog} /> : null}
        {activeView === 'settings' ? <SettingsView settings={settings} onChange={updateSettings} /> : null}
      </section>

      <ExerciseHistoryDrawer slot={historySlot} logs={logs} onClose={() => setHistorySlot(null)} />
    </main>
  )
}

export default App
