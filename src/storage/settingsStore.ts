import type { BodyProfile, Goal, ThemeMode, TrainingSettings, WorkoutProgram } from '../types'
import { readValue, writeValue } from './dbStore'

const settingsKey = 'project-fit.settings.v1'
let settingsCache: TrainingSettings | null = null

export const defaultSettings: TrainingSettings = {
  goal: 'recomp',
  bodyProfile: 'balanced',
  workoutProgram: 'gym',
  theme: 'light',
  weight: '',
  height: '',
  age: '',
  gymType: 'Planet Fitness',
  injuryFlags: '',
  rampWeeks: 2,
  normalWeeks: 4,
  deloadWeek: 7,
  defaultIncrement: '5',
  notes: ''
}

const goals: Goal[] = ['recomp', 'fat-loss', 'muscle-gain', 'strength']
const bodyProfiles: BodyProfile[] = ['lean', 'balanced', 'larger', 'returning']
const themes: ThemeMode[] = ['light', 'dark']
const workoutPrograms: WorkoutProgram[] = ['gym', 'home-bodyweight']

const numberInRange = (value: unknown, fallback: number, min: number, max: number) => {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return fallback
  return Math.min(max, Math.max(min, Math.round(parsed)))
}

export const normalizeSettings = (value: unknown): TrainingSettings => {
  if (!value || typeof value !== 'object') return defaultSettings
  const candidate = value as Partial<TrainingSettings>
  return {
    goal: candidate.goal && goals.includes(candidate.goal) ? candidate.goal : defaultSettings.goal,
    bodyProfile: candidate.bodyProfile && bodyProfiles.includes(candidate.bodyProfile) ? candidate.bodyProfile : defaultSettings.bodyProfile,
    workoutProgram: candidate.workoutProgram && workoutPrograms.includes(candidate.workoutProgram) ? candidate.workoutProgram : defaultSettings.workoutProgram,
    theme: candidate.theme && themes.includes(candidate.theme) ? candidate.theme : defaultSettings.theme,
    weight: typeof candidate.weight === 'string' ? candidate.weight : defaultSettings.weight,
    height: typeof candidate.height === 'string' ? candidate.height : defaultSettings.height,
    age: typeof candidate.age === 'string' ? candidate.age : defaultSettings.age,
    gymType: typeof candidate.gymType === 'string' ? candidate.gymType : defaultSettings.gymType,
    injuryFlags: typeof candidate.injuryFlags === 'string' ? candidate.injuryFlags : defaultSettings.injuryFlags,
    rampWeeks: numberInRange(candidate.rampWeeks, defaultSettings.rampWeeks, 0, 12),
    normalWeeks: numberInRange(candidate.normalWeeks, defaultSettings.normalWeeks, 1, 20),
    deloadWeek: numberInRange(candidate.deloadWeek, defaultSettings.deloadWeek, 2, 24),
    defaultIncrement: typeof candidate.defaultIncrement === 'string' ? candidate.defaultIncrement : defaultSettings.defaultIncrement,
    notes: typeof candidate.notes === 'string' ? candidate.notes : defaultSettings.notes
  }
}

export const readSettings = (): TrainingSettings => {
  return settingsCache ?? defaultSettings
}

export const hydrateSettings = async (): Promise<TrainingSettings> => {
  const stored = await readValue<TrainingSettings>(settingsKey)
  if (stored) {
    settingsCache = normalizeSettings(stored)
    return settingsCache
  }

  try {
    settingsCache = normalizeSettings(JSON.parse(localStorage.getItem(settingsKey) ?? 'null'))
    await writeValue(settingsKey, settingsCache)
    localStorage.removeItem(settingsKey)
    return settingsCache
  } catch {
    settingsCache = defaultSettings
    return settingsCache
  }
}

export const writeSettings = (settings: TrainingSettings) => {
  const normalized = normalizeSettings(settings)
  settingsCache = normalized
  void writeValue(settingsKey, normalized)
  return normalized
}
