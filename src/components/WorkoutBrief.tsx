import { trainingBias } from '../lib/trainingGuidance'
import type { TrainingSettings, WorkoutDay } from '../types'

type Props = {
  day: WorkoutDay
  settings: TrainingSettings
}

export function WorkoutBrief({ day, settings }: Props) {
  return (
    <section className="brief-grid">
      <article className="brief-card training-guide-card">
        <span>Training bias</span>
        <strong>{trainingBias(settings)}</strong>
      </article>
      <details className="brief-card">
        <summary><span>Prep</span><strong>Warm-up</strong></summary>
        <p>{day.warmup}</p>
      </details>
      <details className="brief-card">
        <summary><span>Notes</span><strong>Cues + finisher</strong></summary>
        <div className="note-stack">
          <p>{day.finisher}</p>
          {day.muscleNotes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      </details>
    </section>
  )
}
