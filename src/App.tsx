import { useEffect, useMemo, useState } from 'react'
import { AppNav } from './components/AppNav'
import { DayTabs } from './components/DayTabs'
import { ExerciseCard } from './components/ExerciseCard'
import { ExerciseHistoryDrawer } from './components/ExerciseHistoryDrawer'
import { HistoryView } from './components/HistoryView'
import { PlanView } from './components/PlanView'
import { ProgressionPanel } from './components/ProgressionPanel'
import { SchedulePanel } from './components/SchedulePanel'
import { SessionNotes } from './components/SessionNotes'
import { SettingsView } from './components/SettingsView'
import { SyncPanel } from './components/SyncPanel'
import { WorkoutBrief } from './components/WorkoutBrief'
import { WorkoutHeader } from './components/WorkoutHeader'
import { WorkoutTimer } from './components/WorkoutTimer'
import { homeBodyweightPlan } from './data/homeBodyweightPlan'
import { defaultWeekday, workoutPlan } from './data/workoutPlan'
import { consumeDiscordCallback } from './lib/discordAuth'
import { todayISO, weekdayFromDate } from './lib/dates'
import { hydrateAppStorage } from './storage/appStorage'
import { findPreviousExerciseLog, getLog, makeLogId, readLogs, upsertLog } from './storage/logStore'
import { readSettings, writeSettings } from './storage/settingsStore'
import { readSyncSession, writeSyncSession } from './storage/syncStore'
import type { DayLog, ExerciseLog, ExerciseSlot, SyncSession, TrainingSettings, Weekday, WorkoutProgram } from './types'
import './styles.css'

type View = 'today' | 'plan' | 'history' | 'settings'

const viewMeta: Record<View, { code: string; page: string; label: string }> = {
  today: { code: 'PF-01', page: '001', label: 'Daily lift sheet' },
  plan: { code: 'PF-02', page: '002', label: 'Weekly program map' },
  history: { code: 'PF-03', page: '003', label: 'Training ledger' },
  settings: { code: 'PF-04', page: '004', label: 'Cycle controls' }
}

const createBlankLog = (date: string, dayId: Weekday, workoutProgram: WorkoutProgram): DayLog => ({
  id: makeLogId(date, dayId, workoutProgram),
  date,
  dayId,
  workoutProgram,
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
  const [settings, setSettings] = useState<TrainingSettings>(() => readSettings())
  const [log, setLog] = useState<DayLog>(() => getLog(todayISO(), weekdayFromDate(todayISO()), readSettings().workoutProgram) ?? createBlankLog(todayISO(), weekdayFromDate(todayISO()), readSettings().workoutProgram))
  const [syncSession, setSyncSession] = useState<SyncSession | null>(() => readSyncSession())
  const [historySlot, setHistorySlot] = useState<ExerciseSlot | null>(null)
  const [activeExerciseId, setActiveExerciseId] = useState('')
  const activePlan = settings.workoutProgram === 'home-bodyweight' ? homeBodyweightPlan : workoutPlan
  const day = useMemo(() => activePlan.find((entry) => entry.id === selectedDay) ?? activePlan.find((entry) => entry.id === defaultWeekday)!, [activePlan, selectedDay])
  const logs = useMemo(() => readLogs(), [log])
  const programLogs = useMemo(() => logs.filter((entry) => entry.workoutProgram === settings.workoutProgram), [logs, settings.workoutProgram])

  useEffect(() => {
    hydrateAppStorage()
      .then(({ settings: storedSettings, syncSession: storedSession }) => {
        setSettings(storedSettings)
        setSyncSession(storedSession)
        setLog(getLog(date, selectedDay, storedSettings.workoutProgram) ?? createBlankLog(date, selectedDay, storedSettings.workoutProgram))
      })
      .catch((error) => console.error(error))
  }, [])

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
    const existing = getLog(date, selectedDay, settings.workoutProgram)
    setLog(existing ?? createBlankLog(date, selectedDay, settings.workoutProgram))
  }, [date, selectedDay, settings.workoutProgram])

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

  const updateSettings = (next: TrainingSettings) => {
    setSettings(writeSettings(next))
  }

  const showHistory = (slotId: string) => {
    const slot = activePlan.flatMap((entry) => entry.exercises).find((exercise) => exercise.id === slotId) ?? null
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
      <DayTabs days={activePlan} selectedDay={selectedDay} onSelectDay={changeDay} />

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
                defaultIncrement={settings.defaultIncrement}
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
          <SchedulePanel logs={programLogs} days={activePlan} onOpenDay={openDay} />
          <ProgressionPanel settings={settings} />
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
        <p>{settings.workoutProgram === 'home-bodyweight' ? 'Home bodyweight program · no equipment · M-F · under 45 minutes' : 'Planet Fitness-style machine split · M-F · 6 PM · under 60 minutes'}</p>
      </div>

      <AppNav activeView={activeView} onChange={setActiveView} />

      <section className="page-sheet" aria-label={viewMeta[activeView].label}>
        <div className="page-ruler" aria-hidden="true">
          <span>{viewMeta[activeView].code}</span>
          <span>Page {viewMeta[activeView].page}</span>
          <span>{viewMeta[activeView].label}</span>
        </div>
        {activeView === 'today' ? renderToday() : null}
        {activeView === 'plan' ? <PlanView days={activePlan} onOpenDay={openDay} onShowHistory={showHistory} /> : null}
        {activeView === 'history' ? <HistoryView logs={programLogs} days={activePlan} onOpenLog={openLog} /> : null}
        {activeView === 'settings' ? <SettingsView settings={settings} onChange={updateSettings} /> : null}
      </section>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Sardistic.com. All rights reserved.</p>
        <a
          className="sardistic-signature"
          href="https://sardistic.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit sardistic.com"
        >
          <span className="sardistic-mark" aria-hidden="true">
            <img src="https://veles.cards/liquid.gif" alt="" />
          </span>
          <span className="sardistic-wordmark" aria-hidden="true">ardistic.com</span>
        </a>
      </footer>

      <ExerciseHistoryDrawer slot={historySlot} logs={logs} onClose={() => setHistorySlot(null)} />
    </main>
  )
}

export default App
