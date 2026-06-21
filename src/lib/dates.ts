import type { Weekday } from '../types'

export const todayISO = () => new Date().toISOString().slice(0, 10)

export const weekdayFromDate = (date: string): Weekday => {
  const day = new Date(`${date}T12:00:00`).getDay()
  if (day === 1) return 'monday'
  if (day === 2) return 'tuesday'
  if (day === 3) return 'wednesday'
  if (day === 4) return 'thursday'
  if (day === 5) return 'friday'
  return 'monday'
}
