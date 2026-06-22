import { weeklyAdherence } from '../lib/adherence'
import type { DayLog, WorkoutDay } from '../types'

type Props = {
  logs: DayLog[]
  days: WorkoutDay[]
  onOpenDay: (dayId: WorkoutDay['id']) => void
}

export function SchedulePanel({ logs, days, onOpenDay }: Props) {
  const adherence = weeklyAdherence(logs)
  const nextMissed = adherence.missed[0]

  return (
    <section className="schedule-panel">
      <div className="section-heading compact">
        <span>6 PM</span>
        <h2>Week</h2>
      </div>
      <div className="adherence-strip">
        <strong>{adherence.score}%</strong>
        <span>{adherence.completed.length}/{adherence.due.length || 0} due sessions logged</span>
      </div>
      <div className="schedule-row">
        {adherence.planned.map((entry) => {
          const day = days.find((item) => item.id === entry.day)
          const state = entry.log && Object.keys(entry.log.exercises).length ? 'done' : entry.date <= new Date().toISOString().slice(0, 10) ? 'missed' : 'future'
          return (
            <button key={entry.day} type="button" className={state} onClick={() => onOpenDay(entry.day)}>
              <span>{day?.label}</span>
              <strong>6 PM</strong>
            </button>
          )
        })}
      </div>
      <p>{nextMissed ? `Rollover: use Friday or open ${nextMissed.day} to recover a missed session.` : 'No missed sessions due this week.'}</p>
    </section>
  )
}
