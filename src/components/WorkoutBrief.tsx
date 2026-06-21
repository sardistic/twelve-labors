import type { WorkoutDay } from '../types'

type Props = {
  day: WorkoutDay
}

export function WorkoutBrief({ day }: Props) {
  return (
    <section className="brief-grid">
      <details className="brief-card">
        <summary><span>Warm-up</span><strong>Open prep note</strong></summary>
        <p>{day.warmup}</p>
      </details>
      <details className="brief-card">
        <summary><span>Finisher</span><strong>Open finish note</strong></summary>
        <p>{day.finisher}</p>
      </details>
      <details className="brief-card notes-card">
        <summary><span>Muscle notes</span><strong>Open cues</strong></summary>
        <div className="note-stack">
          {day.muscleNotes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      </details>
    </section>
  )
}
