import type { WorkoutDay } from '../types'

type Props = {
  day: WorkoutDay
  date: string
  bodyWeight: string
  energy: string
  onDateChange: (date: string) => void
  onBodyWeightChange: (value: string) => void
  onEnergyChange: (value: string) => void
}

export function WorkoutHeader({ day, date, bodyWeight, energy, onDateChange, onBodyWeightChange, onEnergyChange }: Props) {
  return (
    <section className="hero-card">
      <div className="workout-title-block">
        <p className="eyebrow">6:00 PM · Under 60 minutes</p>
        <h1>{day.title}</h1>
        <p className="hero-focus">{day.focus}</p>
      </div>
      <div className="header-fields">
        <label>
          Date
          <input type="date" value={date} onChange={(event) => onDateChange(event.target.value)} />
        </label>
        <label>
          Body weight
          <input inputMode="decimal" value={bodyWeight} onChange={(event) => onBodyWeightChange(event.target.value)} placeholder="185" />
        </label>
        <label>
          Energy
          <select value={energy} onChange={(event) => onEnergyChange(event.target.value)}>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="low">Low</option>
            <option value="beat-up">Beat up</option>
          </select>
        </label>
      </div>
      <p className="next-action">Next: log sets, then mark difficulty.</p>
    </section>
  )
}
