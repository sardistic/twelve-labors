import { readLogs } from '../storage/logStore'
import { goalLabels, progressionBias } from '../lib/trainingGuidance'
import type { TrainingSettings } from '../types'

type Props = {
  settings: TrainingSettings
}

export function ProgressionPanel({ settings }: Props) {
  const logs = readLogs()
  const completed = logs.length
  const latest = logs[0]

  return (
    <aside className="progression-panel">
      <h2>Progression</h2>
      <p>Add reps first, then add weight when clean sets reach the top of the range.</p>
      <div className="stats-box">
        <span>Current goal</span>
        <strong>{goalLabels[settings.goal]}</strong>
        <p>{progressionBias(settings)}</p>
      </div>
      <details className="legacy-data-panel">
        <summary><span>Effort rules</span><strong>Open guide</strong></summary>
        <div className="rule-stack">
          <div>
            <span>Most sets</span>
            <strong>Good</strong>
            <p>About 2 reps left.</p>
          </div>
          <div>
            <span>Final set</span>
            <strong>Hard is fine</strong>
            <p>1 rep left, no form break.</p>
          </div>
          <div>
            <span>Avoid</span>
            <strong>Too hard</strong>
            <p>Failed reps or sloppy form.</p>
          </div>
        </div>
      </details>
      <div className="stats-box">
        <span>Logged sessions</span>
        <strong>{completed}</strong>
        <p>{latest ? `Latest: ${latest.date}` : 'No sessions logged yet.'}</p>
      </div>
    </aside>
  )
}
