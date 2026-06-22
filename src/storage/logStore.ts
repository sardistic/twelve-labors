import type { DayLog, Difficulty, Weekday } from '../types'
import { readValue, writeValue } from './dbStore'

const logsKey = 'project-fit.logs.v1'
let logsCache: DayLog[] = []

const safeParse = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

export const readLogs = (): DayLog[] => logsCache

const weekdays: Weekday[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
const difficulties: Difficulty[] = ['easy', 'good', 'hard', 'too-hard']

const isString = (value: unknown): value is string => typeof value === 'string'

export const validateLogs = (value: unknown): DayLog[] => {
  if (!Array.isArray(value)) throw new Error('Import must be an array of workout logs.')

  return value.map((entry, index) => {
    if (!entry || typeof entry !== 'object') throw new Error(`Log ${index + 1} is not an object.`)
    const candidate = entry as Partial<DayLog>
    if (!isString(candidate.date) || !/^\d{4}-\d{2}-\d{2}$/.test(candidate.date)) throw new Error(`Log ${index + 1} has an invalid date.`)
    if (!candidate.dayId || !weekdays.includes(candidate.dayId)) throw new Error(`Log ${index + 1} has an invalid day.`)
    const exercises = candidate.exercises && typeof candidate.exercises === 'object' ? candidate.exercises : {}
    const normalizedExercises: DayLog['exercises'] = {}

    for (const [slotId, exercise] of Object.entries(exercises)) {
      if (!exercise || typeof exercise !== 'object') continue
      const exerciseLog = exercise as DayLog['exercises'][string]
      normalizedExercises[slotId] = {
        exerciseSlotId: isString(exerciseLog.exerciseSlotId) ? exerciseLog.exerciseSlotId : slotId,
        selectedOptionName: isString(exerciseLog.selectedOptionName) ? exerciseLog.selectedOptionName : '',
        sets: Array.isArray(exerciseLog.sets)
          ? exerciseLog.sets.map((set) => ({
              weight: isString(set?.weight) ? set.weight : '',
              reps: isString(set?.reps) ? set.reps : ''
            }))
          : [],
        difficulty: difficulties.includes(exerciseLog.difficulty) ? exerciseLog.difficulty : 'good',
        notes: isString(exerciseLog.notes) ? exerciseLog.notes : ''
      }
    }

    return {
      id: isString(candidate.id) ? candidate.id : makeLogId(candidate.date, candidate.dayId),
      date: candidate.date,
      dayId: candidate.dayId,
      bodyWeight: isString(candidate.bodyWeight) ? candidate.bodyWeight : '',
      energy: isString(candidate.energy) ? candidate.energy : 'normal',
      exercises: normalizedExercises,
      cardio: isString(candidate.cardio) ? candidate.cardio : '',
      notes: isString(candidate.notes) ? candidate.notes : ''
    }
  })
}

export const hydrateLogs = async () => {
  const stored = await readValue<DayLog[]>(logsKey)
  if (stored) {
    logsCache = validateLogs(stored)
    return logsCache
  }

  const legacy = safeParse<DayLog[]>(localStorage.getItem(logsKey), [])
  logsCache = validateLogs(legacy)
  if (logsCache.length) {
    await writeValue(logsKey, logsCache)
    localStorage.removeItem(logsKey)
  }
  return logsCache
}

export const writeLogs = (logs: DayLog[]) => {
  logsCache = validateLogs(logs)
  void writeValue(logsKey, logsCache)
}

export const makeLogId = (date: string, dayId: Weekday) => `${date}:${dayId}`

export const getLog = (date: string, dayId: Weekday): DayLog | null => {
  return readLogs().find((log) => log.id === makeLogId(date, dayId)) ?? null
}

export const upsertLog = (log: DayLog) => {
  const logs = readLogs()
  const index = logs.findIndex((entry) => entry.id === log.id)
  if (index >= 0) {
    logs[index] = log
  } else {
    logs.push(log)
  }
  writeLogs(logs.sort((a, b) => b.date.localeCompare(a.date)))
  return log
}

export const findPreviousExerciseLog = (exerciseSlotId: string, beforeDate: string) => {
  return readLogs()
    .filter((log) => log.date < beforeDate)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((log) => log.exercises[exerciseSlotId])
    .find(Boolean) ?? null
}

export const exportLogs = () => {
  const data = JSON.stringify(readLogs(), null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `twelve-labors-logs-${new Date().toISOString().slice(0, 10)}.json`
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

export const importLogs = async (file: File) => {
  const text = await file.text()
  const parsed = validateLogs(JSON.parse(text))
  writeLogs(parsed)
  return parsed
}
