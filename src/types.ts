export type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'

export type OptionKind = 'primary' | 'backup' | 'fallback'

export type Difficulty = 'easy' | 'good' | 'hard' | 'too-hard'

export type WorkoutProgram = 'gym' | 'home-bodyweight'

export type ExerciseOption = {
  kind: OptionKind
  name: string
  machineLooksLike: string
  setup: string[]
  execution: string[]
  formChecks: string[]
  muscleTarget: string
}

export type ExerciseSlot = {
  id: string
  title: string
  muscleGroup: string
  setCount: number
  repRange: string
  restSeconds: number
  options: ExerciseOption[]
}

export type WorkoutDay = {
  id: Weekday
  label: string
  title: string
  focus: string
  warmup: string
  finisher: string
  muscleNotes: string[]
  exercises: ExerciseSlot[]
}

export type SetLog = {
  weight: string
  reps: string
}

export type ExerciseLog = {
  exerciseSlotId: string
  selectedOptionName: string
  sets: SetLog[]
  difficulty: Difficulty
  notes: string
}

export type DayLog = {
  id: string
  date: string
  dayId: Weekday
  workoutProgram: WorkoutProgram
  bodyWeight: string
  energy: string
  exercises: Record<string, ExerciseLog>
  cardio: string
  notes: string
}

export type ProgressionHint = {
  label: string
  description: string
  tone: 'neutral' | 'positive' | 'warning'
}

export type Goal = 'recomp' | 'fat-loss' | 'muscle-gain' | 'strength'

export type ThemeMode = 'light' | 'dark'

export type BodyProfile = 'lean' | 'balanced' | 'larger' | 'returning'

export type TrainingSettings = {
  goal: Goal
  bodyProfile: BodyProfile
  workoutProgram: WorkoutProgram
  theme: ThemeMode
  weight: string
  height: string
  age: string
  gymType: string
  injuryFlags: string
  rampWeeks: number
  normalWeeks: number
  deloadWeek: number
  defaultIncrement: string
  notes: string
}

export type SyncSession = {
  provider: 'discord'
  userId: string
  username: string
  avatarUrl: string
  accessToken: string
  savedAt: string
}
