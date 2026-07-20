import type { BodyProfile, Goal, TrainingSettings } from '../types'

export const goalLabels: Record<Goal, string> = {
  recomp: 'Recomp',
  'fat-loss': 'Fat loss',
  'muscle-gain': 'Muscle gain',
  strength: 'Strength'
}

export const bodyProfileLabels: Record<BodyProfile, string> = {
  lean: 'Lean frame',
  balanced: 'Balanced',
  larger: 'Larger frame',
  returning: 'Returning'
}

const goalCue: Record<Goal, string> = {
  recomp: 'Hold the line: clean reps, steady loads, no junk fatigue.',
  'fat-loss': 'Keep rest honest and leave one rep in reserve so recovery stays cheap.',
  'muscle-gain': 'Chase controlled volume first, then add load when all sets are clean.',
  strength: 'Treat the first lift as the day: longer rest, fewer sloppy grinders.'
}

const profileCue: Record<BodyProfile, string> = {
  lean: 'Add small jumps slowly; prioritize food, sleep, and full-range reps.',
  balanced: 'Use the written plan as-is and adjust only when recovery says so.',
  larger: 'Bias joint-friendly variations, steady tempo, and repeatable weekly volume.',
  returning: 'Start conservative; win the habit before pushing set difficulty.'
}

export const trainingBias = (settings: TrainingSettings) => {
  return `${bodyProfileLabels[settings.bodyProfile]} + ${goalLabels[settings.goal]}: ${profileCue[settings.bodyProfile]} ${goalCue[settings.goal]}`
}

export const progressionBias = (settings: TrainingSettings) => {
  if (settings.bodyProfile === 'returning') return 'Cap most sets at Good for two weeks before chasing Hard.'
  if (settings.goal === 'fat-loss') return 'Progress by reps first; add load only when energy is not dipping.'
  if (settings.goal === 'muscle-gain') return 'Add one clean set or a small load jump when recovery is solid.'
  if (settings.goal === 'strength') return 'Rest longer on the first lift and keep back-off work controlled.'
  if (settings.bodyProfile === 'lean') return 'Small load jumps beat big jumps missed next week.'
  if (settings.bodyProfile === 'larger') return 'Prefer stable variations and smooth knees/shoulders over max resistance.'
  return 'Use the base progression and let logged difficulty steer jumps.'
}
