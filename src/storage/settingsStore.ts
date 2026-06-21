import type { BodyProfile, Goal, ThemeMode, TrainingSettings } from '../types'

const settingsKey = 'project-fit.settings.v1'

export const defaultSettings: TrainingSettings = {
  goal: 'recomp',
  bodyProfile: 'balanced',
  theme: 'light',
  rampWeeks: 2,
  normalWeeks: 4,
  deloadWeek: 7,
  defaultIncrement: '5',
  notes: ''
}

const goals: Goal[] = ['recomp', 'fat-loss', 'muscle-gain', 'strength']
const bodyProfiles: BodyProfile[] = ['lean', 'balanced', 'larger', 'returning']
const themes: ThemeMode[] = ['light', 'dark']

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
    theme: candidate.theme && themes.includes(candidate.theme) ? candidate.theme : defaultSettings.theme,
    rampWeeks: numberInRange(candidate.rampWeeks, defaultSettings.rampWeeks, 0, 12),
    normalWeeks: numberInRange(candidate.normalWeeks, defaultSettings.normalWeeks, 1, 20),
    deloadWeek: numberInRange(candidate.deloadWeek, defaultSettings.deloadWeek, 2, 24),
    defaultIncrement: typeof candidate.defaultIncrement === 'string' ? candidate.defaultIncrement : defaultSettings.defaultIncrement,
    notes: typeof candidate.notes === 'string' ? candidate.notes : defaultSettings.notes
  }
}

export const readSettings = (): TrainingSettings => {
  try {
    return normalizeSettings(JSON.parse(localStorage.getItem(settingsKey) ?? 'null'))
  } catch {
    return defaultSettings
  }
}

export const writeSettings = (settings: TrainingSettings) => {
  const normalized = normalizeSettings(settings)
  localStorage.setItem(settingsKey, JSON.stringify(normalized))
  return normalized
}
