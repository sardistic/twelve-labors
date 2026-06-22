import type { DayLog, Weekday } from '../types'

const plannedDays: Weekday[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']

const dateForWeekday = (monday: Date, offset: number) => {
  const next = new Date(monday)
  next.setDate(monday.getDate() + offset)
  return next.toISOString().slice(0, 10)
}

export const getMonday = (date = new Date()) => {
  const monday = new Date(date)
  const day = monday.getDay()
  const offset = day === 0 ? -6 : 1 - day
  monday.setDate(monday.getDate() + offset)
  monday.setHours(0, 0, 0, 0)
  return monday
}

export const hasLoggedWork = (log: DayLog | undefined) => Boolean(log && Object.keys(log.exercises).length > 0)

export const weeklyAdherence = (logs: DayLog[], now = new Date()) => {
  const monday = getMonday(now)
  const today = now.toISOString().slice(0, 10)
  const planned = plannedDays.map((day, index) => ({
    day,
    date: dateForWeekday(monday, index),
    log: logs.find((entry) => entry.date === dateForWeekday(monday, index) && entry.dayId === day)
  }))
  const due = planned.filter((entry) => entry.date <= today)
  const completed = due.filter((entry) => hasLoggedWork(entry.log))
  const missed = due.filter((entry) => !hasLoggedWork(entry.log))
  const score = due.length ? Math.round((completed.length / due.length) * 100) : 0

  return { planned, due, completed, missed, score }
}
