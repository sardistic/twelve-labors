import { bodyProfileLabels } from '../lib/trainingGuidance'
import type { BodyProfile, Goal, TrainingSettings } from '../types'

type Props = {
  settings: TrainingSettings
  onChange: (settings: TrainingSettings) => void
}

const goalOptions: Array<{ id: Goal; label: string; detail: string }> = [
  { id: 'recomp', label: 'Recomp', detail: 'Keep effort steady and track body weight without aggressive swings.' },
  { id: 'fat-loss', label: 'Fat loss', detail: 'Bias consistency, steps, and recoverable volume.' },
  { id: 'muscle-gain', label: 'Muscle gain', detail: 'Push volume and small load jumps when recovery is good.' },
  { id: 'strength', label: 'Strength', detail: 'Favor repeatable heavy sets and longer rest windows.' }
]

const bodyOptions: Array<{ id: BodyProfile; detail: string }> = [
  { id: 'lean', detail: 'Smaller jumps, recovery and nutrition matter most.' },
  { id: 'balanced', detail: 'Run the plan close to written.' },
  { id: 'larger', detail: 'Stable machines, joint comfort, repeatable volume.' },
  { id: 'returning', detail: 'Conservative effort while the habit locks in.' }
]

export function SettingsView({ settings, onChange }: Props) {
  const update = <Key extends keyof TrainingSettings>(key: Key, value: TrainingSettings[Key]) => onChange({ ...settings, [key]: value })

  return (
    <section className="settings-layout">
      <div className="section-heading">
        <span>Preferences</span>
        <h2>Settings</h2>
      </div>
      <div className="profile-block">
        <span>Body profile</span>
        <div className="body-grid">
          {bodyOptions.map((profile) => (
            <button key={profile.id} type="button" className={settings.bodyProfile === profile.id ? 'active' : ''} onClick={() => update('bodyProfile', profile.id)}>
              <strong>{bodyProfileLabels[profile.id]}</strong>
              <span>{profile.detail}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="profile-block">
        <span>Workout aim</span>
        <div className="goal-grid">
          {goalOptions.map((goal) => (
            <button key={goal.id} type="button" className={settings.goal === goal.id ? 'active' : ''} onClick={() => update('goal', goal.id)}>
              <strong>{goal.label}</strong>
              <span>{goal.detail}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="theme-switch">
        <span>Display</span>
        <button type="button" className={settings.theme === 'light' ? 'active' : ''} onClick={() => update('theme', 'light')}>Light</button>
        <button type="button" className={settings.theme === 'dark' ? 'active' : ''} onClick={() => update('theme', 'dark')}>Dark</button>
      </div>
      <div className="onboarding-grid">
        <label>
          Weight
          <input inputMode="decimal" value={settings.weight} onChange={(event) => update('weight', event.target.value)} placeholder="185" />
        </label>
        <label>
          Height
          <input value={settings.height} onChange={(event) => update('height', event.target.value)} placeholder="5'10&quot;" />
        </label>
        <label>
          Age
          <input inputMode="numeric" value={settings.age} onChange={(event) => update('age', event.target.value)} placeholder="32" />
        </label>
        <label>
          Gym type
          <input value={settings.gymType} onChange={(event) => update('gymType', event.target.value)} placeholder="Planet Fitness" />
        </label>
      </div>
      <div className="settings-grid">
        <label>
          Ramp weeks
          <input type="number" min="0" max="12" value={settings.rampWeeks} onChange={(event) => update('rampWeeks', Number(event.target.value))} />
        </label>
        <label>
          Normal weeks
          <input type="number" min="1" max="20" value={settings.normalWeeks} onChange={(event) => update('normalWeeks', Number(event.target.value))} />
        </label>
        <label>
          Deload week
          <input type="number" min="2" max="24" value={settings.deloadWeek} onChange={(event) => update('deloadWeek', Number(event.target.value))} />
        </label>
        <label>
          Default increment
          <input inputMode="decimal" value={settings.defaultIncrement} onChange={(event) => update('defaultIncrement', event.target.value)} placeholder="5" />
        </label>
      </div>
      <label className="settings-notes">
        Injury flags
        <textarea value={settings.injuryFlags} onChange={(event) => update('injuryFlags', event.target.value)} placeholder="shoulder, knee, back, recovery constraints" />
      </label>
      <label className="settings-notes">
        Training notes
        <textarea value={settings.notes} onChange={(event) => update('notes', event.target.value)} placeholder="preferred machines, schedule notes, coaching reminders" />
      </label>
    </section>
  )
}
