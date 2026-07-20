import type { ExerciseLog, ExerciseSlot, ProgressionHint } from '../types'

const numberOrNull = (value: string) => {
  if (/^(bw|bodyweight)$/i.test(value.trim())) return 0
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

const topOfRange = (repRange: string) => {
  const matches = repRange.match(/(\d+)\s*-\s*(\d+)/)
  if (!matches) return null
  return Number(matches[2])
}

export const completedSets = (log: ExerciseLog | null | undefined) => {
  if (!log) return 0
  return log.sets.filter((set) => set.weight.trim() || set.reps.trim()).length
}

export const repsSummary = (log: ExerciseLog | null | undefined) => {
  if (!log) return 'No previous log'
  const sets = log.sets.filter((set) => set.weight.trim() || set.reps.trim())
  if (!sets.length) return 'No sets logged'
  return sets.map((set) => `${set.weight || '?'} × ${set.reps || '?'}`).join(' / ')
}

export const progressionHint = (slot: ExerciseSlot, current: ExerciseLog | null, previous: ExerciseLog | null): ProgressionHint => {
  if (!current && !previous) {
    return {
      label: 'Start conservative',
      description: 'Pick a resistance or variation you can move cleanly with about 2 reps left at the end of each set.',
      tone: 'neutral'
    }
  }

  if (!current && previous) {
    return {
      label: 'Beat one number',
      description: `Previous: ${repsSummary(previous)}. Match it, then add one clean rep somewhere.`,
      tone: 'neutral'
    }
  }

  if (!current) {
    return {
      label: 'Log this lift',
      description: 'Enter load and reps after each set so next week has a target. Use BW for bodyweight work.',
      tone: 'neutral'
    }
  }

  const maxRep = topOfRange(slot.repRange)
  const loggedSets = current.sets.slice(0, slot.setCount)
  const reps = loggedSets.map((set) => numberOrNull(set.reps))
  const weights = loggedSets.map((set) => numberOrNull(set.weight))
  const complete = reps.every((rep) => rep !== null) && weights.every((weight) => weight !== null)

  if (!complete) {
    return {
      label: 'Incomplete log',
      description: 'Fill in each working set to get a progression recommendation.',
      tone: 'neutral'
    }
  }

  if (current.difficulty === 'too-hard') {
    return {
      label: 'Reduce or repeat',
      description: 'Form broke or the set failed. Reduce resistance, choose an easier variation, or repeat with cleaner reps.',
      tone: 'warning'
    }
  }

  if (maxRep && reps.every((rep) => rep !== null && rep >= maxRep)) {
    return {
      label: 'Progress next time',
      description: `You reached the top of ${slot.repRange} on every set. Add the smallest available load jump or choose a harder variation.`,
      tone: 'positive'
    }
  }

  if (previous) {
    return {
      label: 'Add reps before resistance',
      description: `Previous: ${repsSummary(previous)}. Keep the same load or variation until every set reaches ${slot.repRange}.`,
      tone: 'neutral'
    }
  }

  return {
    label: 'Build the range',
    description: `Keep this load or variation until every set reaches ${slot.repRange} with clean form.`,
    tone: 'neutral'
  }
}
