import { importLogs, readLogs } from '../storage/logStore'
import type { TrainingSettings } from '../types'

type Props = {
  onImported: () => void
  settings: TrainingSettings
}

const goalLabels: Record<TrainingSettings['goal'], string> = {
  recomp: 'Recomp',
  'fat-loss': 'Fat loss',
  'muscle-gain': 'Muscle gain',
  strength: 'Strength'
}

export function ProgressionPanel({ onImported, settings }: Props) {
  const logs = readLogs()
  const completed = logs.length
  const latest = logs[0]

  const handleImport = async (file: File | null) => {
    if (!file) return
    await importLogs(file)
    onImported()
  }

  return (
    <aside className="progression-panel">
      <h2>Progression</h2>
      <p>Use double progression: add reps first, then increase weight when every set reaches the top of the rep range cleanly.</p>
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
      <div className="stats-box">
        <span>Logged sessions</span>
        <strong>{completed}</strong>
        <p>{latest ? `Latest: ${latest.date}` : 'No sessions logged yet.'}</p>
      </div>
      <div className="stats-box">
        <span>Current goal</span>
        <strong>{goalLabels[settings.goal]}</strong>
        <p>{settings.rampWeeks} ramp weeks · deload around week {settings.deloadWeek} · default jump {settings.defaultIncrement || '5'} lb</p>
      </div>
      <details className="legacy-data-panel">
        <summary><span>Local backup</span><strong>JSON tools</strong></summary>
        <div className="data-actions">
          <label className="import-button">
            Import JSON
            <input type="file" accept="application/json" onChange={(event) => handleImport(event.target.files?.[0] ?? null)} />
          </label>
        </div>
      </details>
    </aside>
  )
}
