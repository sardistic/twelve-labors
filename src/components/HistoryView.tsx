import { completedSets } from '../lib/progression'
import type { DayLog, WorkoutDay } from '../types'

type Props = {
  logs: DayLog[]
  days: WorkoutDay[]
  onOpenLog: (date: string, dayId: DayLog['dayId']) => void
}

const dayTitle = (days: WorkoutDay[], dayId: DayLog['dayId']) => days.find((day) => day.id === dayId)?.title ?? dayId

export function HistoryView({ logs, days, onOpenLog }: Props) {
  const completedWorkouts = logs.filter((log) => Object.keys(log.exercises).length > 0)
  const totalSets = logs.reduce((sum, log) => sum + Object.values(log.exercises).reduce((setSum, exercise) => setSum + completedSets(exercise), 0), 0)
  const latestWeight = logs.find((log) => log.bodyWeight.trim())?.bodyWeight

  return (
    <section className="view-stack">
      <div className="section-heading">
        <span>Training log</span>
        <h2>History</h2>
      </div>
      <div className="metric-grid">
        <article><span>Sessions</span><strong>{completedWorkouts.length}</strong></article>
        <article><span>Logged sets</span><strong>{totalSets}</strong></article>
        <article><span>Latest weight</span><strong>{latestWeight ? `${latestWeight} lb` : '-'}</strong></article>
      </div>
      <div className="history-table">
        {logs.length ? logs.map((log) => (
          <button key={log.id} type="button" onClick={() => onOpenLog(log.date, log.dayId)}>
            <span>{log.date}</span>
            <strong>{dayTitle(days, log.dayId)}</strong>
            <em>{Object.keys(log.exercises).length} exercises</em>
          </button>
        )) : <p className="empty-state">No sessions logged yet.</p>}
      </div>
    </section>
  )
}
