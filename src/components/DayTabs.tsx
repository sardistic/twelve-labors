import type { Weekday, WorkoutDay } from '../types'

type Props = {
  days: WorkoutDay[]
  selectedDay: Weekday
  onSelectDay: (day: Weekday) => void
}

export function DayTabs({ days, selectedDay, onSelectDay }: Props) {
  return (
    <div className="day-tabs" role="tablist" aria-label="Workout days">
      {days.map((day) => (
        <button
          key={day.id}
          className={day.id === selectedDay ? 'day-tab active' : 'day-tab'}
          onClick={() => onSelectDay(day.id)}
          type="button"
        >
          <span>{day.label}</span>
          <strong>{day.title}</strong>
        </button>
      ))}
    </div>
  )
}
