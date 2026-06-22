import type { ExerciseOption } from '../types'

export type EquipmentType = 'pin-stack' | 'plate-loaded' | 'cable' | 'dumbbell' | 'bodyweight' | 'other'

export const equipmentLabels: Record<EquipmentType, string> = {
  'pin-stack': 'Pin stack',
  'plate-loaded': 'Plate loaded',
  cable: 'Cable',
  dumbbell: 'Dumbbell',
  bodyweight: 'Bodyweight',
  other: 'Other'
}

export const inferEquipmentType = (option: ExerciseOption): EquipmentType => {
  const text = `${option.name} ${option.machineLooksLike} ${option.setup.join(' ')}`.toLowerCase()
  if (text.includes('bodyweight') || text.includes('no equipment')) return 'bodyweight'
  if (text.includes('dumbbell')) return 'dumbbell'
  if (text.includes('plate-loaded') || text.includes('plate loaded') || text.includes('smith')) return 'plate-loaded'
  if (text.includes('cable') || text.includes('pulley')) return 'cable'
  if (text.includes('pin-loaded') || text.includes('pin loaded') || text.includes('weight stack')) return 'pin-stack'
  return 'other'
}

export const incrementRecommendation = (type: EquipmentType, fallback: string) => {
  if (type === 'bodyweight') return 'Add reps or slower tempo before load.'
  if (type === 'dumbbell') return 'Use the smallest matching dumbbell jump available.'
  if (type === 'cable') return 'Move one stack pin when every set clears the range.'
  if (type === 'pin-stack') return 'Move one pin plate, usually 5-10 lb.'
  if (type === 'plate-loaded') return 'Add the smallest plates per side, usually 2.5-5 lb.'
  return `Default jump: ${fallback || '5'} lb.`
}

export const equipmentIcon = (type: EquipmentType) => {
  if (type === 'bodyweight') return 'BW'
  if (type === 'dumbbell') return 'DB'
  if (type === 'cable') return 'CB'
  if (type === 'pin-stack') return 'PIN'
  if (type === 'plate-loaded') return 'PL'
  return 'EQ'
}
