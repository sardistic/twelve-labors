import type { WorkoutDay } from '../types'

type Props = {
  days: WorkoutDay[]
  onOpenDay: (dayId: WorkoutDay['id']) => void
  onShowHistory: (slotId: string) => void
}

export function PlanView({ days, onOpenDay, onShowHistory }: Props) {
  return (
    <section className="view-stack">
      <div className="section-heading">
        <span>Program</span>
        <h2>Weekly plan</h2>
      </div>
      <div className="plan-grid">
        {days.map((day) => (
          <details className="plan-day" key={day.id}>
            <summary className="plan-day-header">
              <div>
                <span>{day.label}</span>
                <h3>{day.title}</h3>
                <p>{day.focus}</p>
              </div>
              <span>{day.exercises.length} movements</span>
            </summary>
            <button className="open-day-button" type="button" onClick={() => onOpenDay(day.id)}>Open workout</button>
            <div className="plan-exercise-list">
              {day.exercises.map((slot) => (
                <button key={slot.id} type="button" onClick={() => onShowHistory(slot.id)}>
                  <strong>{slot.title}</strong>
                  <span>{slot.setCount} x {slot.repRange} · {slot.muscleGroup}</span>
                </button>
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
