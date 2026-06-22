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
  const chartPoints = entries
    .slice()
    .reverse()
    .map(({ exercise }) => {
      const topSet = exercise.sets.reduce((best, set) => Math.max(best, Number(set.weight) || 0), 0)
      return topSet
    })
  const maxPoint = Math.max(...chartPoints, 1)

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
          <>
            <div className="history-chart" aria-label="Top weight trend">
              <svg viewBox="0 0 100 40" role="img">
                <polyline
                  points={chartPoints.map((point, index) => {
                    const x = chartPoints.length === 1 ? 50 : (index / (chartPoints.length - 1)) * 96 + 2
                    const y = 36 - (point / maxPoint) * 30
                    return `${x},${y}`
                  }).join(' ')}
                />
              </svg>
              <span>Top weight trend</span>
            </div>
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
          </>
        ) : (
          <p className="empty-state">No logs for this exercise yet.</p>
        )}
      </aside>
    </div>
  )
}
