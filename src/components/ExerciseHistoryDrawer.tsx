import { repsSummary } from '../lib/progression'
import type { DayLog, ExerciseSlot } from '../types'

type Props = {
  slot: ExerciseSlot | null
  logs: DayLog[]
  onClose: () => void
}

export function ExerciseHistoryDrawer({ slot, logs, onClose }: Props) {
  if (!slot) return null

  const entries = logs
    .filter((log) => log.exercises[slot.id])
    .map((log) => ({ log, exercise: log.exercises[slot.id] }))

  return (
    <div className="drawer-backdrop" role="presentation" onClick={onClose}>
      <aside className="history-drawer" role="dialog" aria-modal="true" aria-label={`${slot.title} history`} onClick={(event) => event.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <span>Exercise history</span>
            <h2>{slot.title}</h2>
          </div>
          <button type="button" onClick={onClose}>Close</button>
        </div>
        {entries.length ? (
          <div className="drawer-list">
            {entries.map(({ log, exercise }) => (
              <article key={log.id}>
                <div>
                  <strong>{log.date}</strong>
                  <span>{exercise.selectedOptionName}</span>
                </div>
                <p>{repsSummary(exercise)}</p>
                {exercise.notes ? <small>{exercise.notes}</small> : null}
              </article>
            ))}
          </div>
        ) : (
          <p className="empty-state">No logs for this exercise yet.</p>
        )}
      </aside>
    </div>
  )
}
