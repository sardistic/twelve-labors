import { useEffect, useMemo, useState } from 'react'
import type { Difficulty, ExerciseLog, ExerciseSlot, OptionKind } from '../types'
import { progressionHint, repsSummary } from '../lib/progression'
import { equipmentIcon, equipmentLabels, incrementRecommendation, inferEquipmentType } from '../lib/equipment'

type Props = {
  slot: ExerciseSlot
  value: ExerciseLog | null
  previous: ExerciseLog | null
  isActive: boolean
  onChange: (log: ExerciseLog) => void
  onActivate: () => void
  onNext: () => void
  onShowHistory: () => void
  defaultIncrement: string
}

const optionLabels: Record<OptionKind, string> = {
  primary: 'Primary',
  backup: 'Backup',
  fallback: 'Fallback'
}

const difficultyLabels: Record<Difficulty, string> = {
  easy: 'Easy',
  good: 'Good',
  hard: 'Hard',
  'too-hard': 'Too hard'
}

const buildEmptySets = (count: number, defaultWeight = '') => Array.from({ length: count }, () => ({ weight: defaultWeight, reps: '' }))

const noteTags = ['felt strong', 'pain', 'machine taken', 'low energy', 'form check', 'add weight', 'repeat load']

const parseTags = (notes: string) => notes.split(',').map((tag) => tag.trim()).filter(Boolean)

const serializeTags = (tags: string[]) => Array.from(new Set(tags.map((tag) => tag.trim()).filter(Boolean))).join(', ')

export function ExerciseCard({ slot, value, previous, isActive, onChange, onActivate, onNext, onShowHistory, defaultIncrement }: Props) {
  const initialOptionName = value?.selectedOptionName ?? slot.options[0]?.name ?? ''
  const [selectedOptionName, setSelectedOptionName] = useState(initialOptionName)
  const [customTag, setCustomTag] = useState('')
  const selectedOption = (slot.options.find((option) => option.name === selectedOptionName) ?? slot.options[0])!
  const equipmentType = inferEquipmentType(selectedOption)

  useEffect(() => {
    setSelectedOptionName(value?.selectedOptionName ?? slot.options[0]?.name ?? '')
  }, [slot.id, slot.options, value?.selectedOptionName])
  const log = useMemo<ExerciseLog>(() => {
    const sets = value?.sets?.length ? value.sets : previous?.sets?.length ? previous.sets : buildEmptySets(slot.setCount, equipmentType === 'bodyweight' ? 'BW' : '')
    return {
      exerciseSlotId: slot.id,
      selectedOptionName,
      sets: Array.from({ length: slot.setCount }, (_, index) => sets[index] ?? { weight: '', reps: '' }),
      difficulty: value?.difficulty ?? 'good',
      notes: value?.notes ?? ''
    }
  }, [equipmentType, previous?.sets, selectedOptionName, slot.id, slot.setCount, value])
  const hint = progressionHint(slot, value, previous)
  const completedCount = log.sets.filter((set) => set.weight.trim() && set.reps.trim()).length
  const selectedTags = parseTags(log.notes)

  const updateLog = (next: ExerciseLog) => {
    onChange(next)
  }

  const chooseOption = (name: string) => {
    setSelectedOptionName(name)
    updateLog({ ...log, selectedOptionName: name })
  }

  const updateSet = (index: number, field: 'weight' | 'reps', fieldValue: string) => {
    const sets = log.sets.map((set, setIndex) => (setIndex === index ? { ...set, [field]: fieldValue } : set))
    if (index === 0 && fieldValue.trim()) {
      for (let setIndex = 1; setIndex < sets.length; setIndex += 1) {
        if (!sets[setIndex][field].trim()) sets[setIndex] = { ...sets[setIndex], [field]: fieldValue }
      }
    }
    updateLog({ ...log, sets })
  }

  const toggleTag = (tag: string) => {
    const nextTags = selectedTags.includes(tag) ? selectedTags.filter((item) => item !== tag) : [...selectedTags, tag]
    updateLog({ ...log, notes: serializeTags(nextTags) })
  }

  const addCustomTag = () => {
    const tag = customTag.trim()
    if (!tag) return
    updateLog({ ...log, notes: serializeTags([...selectedTags, tag]) })
    setCustomTag('')
  }

  if (!isActive) {
    return (
      <article className="exercise-card collapsed">
        <button className="collapsed-exercise-button" type="button" onClick={onActivate}>
          <span className="muscle-pill">{slot.muscleGroup}</span>
          <strong>{slot.title}</strong>
          <small>{completedCount}/{slot.setCount} sets · {selectedOption.name}</small>
        </button>
      </article>
    )
  }

  return (
    <article className="exercise-card">
      <div className="exercise-topline">
        <div>
          <span className="muscle-pill">{slot.muscleGroup}</span>
          <h2>{slot.title}</h2>
          <p>{slot.setCount} sets · target {slot.repRange} · {Math.round(slot.restSeconds / 60)} min rest</p>
          <button className="link-button" type="button" onClick={onShowHistory}>View history</button>
        </div>
        <div className={`progression-hint ${hint.tone}`}>
          <strong>{hint.label}</strong>
          <span>{hint.description}</span>
        </div>
      </div>

      <div className="log-banner">
        <span>Log this lift</span>
        <strong>{completedCount}/{slot.setCount} sets filled</strong>
      </div>

      <div className="log-grid">
        <div className="previous-box">
          <span>Previous</span>
          <strong>{repsSummary(previous)}</strong>
        </div>
        <div className="sets-grid" style={{ gridTemplateColumns: `repeat(${slot.setCount}, minmax(120px, 1fr))` }}>
          {log.sets.map((set, index) => (
            <div className="set-box" key={`${slot.id}-set-${index}`}>
              <span>Set {index + 1}</span>
              <label>
                Load
                <input inputMode="decimal" value={set.weight} onChange={(event) => updateSet(index, 'weight', event.target.value)} placeholder={equipmentType === 'bodyweight' ? 'BW' : 'lb'} aria-label={`Set ${index + 1} load`} />
              </label>
              <label>
                Reps / sec
                <input inputMode="numeric" value={set.reps} onChange={(event) => updateSet(index, 'reps', event.target.value)} placeholder="reps" aria-label={`Set ${index + 1} reps or seconds`} />
              </label>
            </div>
          ))}
        </div>
        <div className="exercise-log-footer">
          <label>
            Difficulty
            <select value={log.difficulty} onChange={(event) => updateLog({ ...log, difficulty: event.target.value as Difficulty })}>
              {Object.entries(difficultyLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </label>
          <div className="tag-field">
            <span>Tags</span>
            <div className="tag-list">
              {noteTags.map((tag) => (
                <button key={tag} type="button" className={selectedTags.includes(tag) ? 'active' : ''} onClick={() => toggleTag(tag)}>
                  {tag}
                </button>
              ))}
            </div>
            <div className="custom-tag-row">
              <input value={customTag} onChange={(event) => setCustomTag(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') addCustomTag() }} placeholder="add your own" />
              <button type="button" onClick={addCustomTag}>Add</button>
            </div>
          </div>
        </div>
        <div className="current-actions">
          <button type="button" onClick={onNext}>{completedCount >= slot.setCount ? 'Next lift' : 'Skip to next'}</button>
          <button type="button" onClick={onShowHistory}>History</button>
        </div>
      </div>

      <details className="movement-picker">
        <summary>
          <span>Movement</span>
          <strong>{selectedOption.name}</strong>
        </summary>
        <div className="option-grid">
          {slot.options.map((option) => (
            <button
              key={option.name}
              type="button"
              className={option.name === selectedOption.name ? 'option-button active' : 'option-button'}
              onClick={() => chooseOption(option.name)}
            >
              <span>{optionLabels[option.kind]}</span>
              <strong>{option.name}</strong>
            </button>
          ))}
        </div>
      </details>

      <details className="instruction-panel">
        <summary>
          <span>Movement notes</span>
          <strong>{selectedOption.name}</strong>
        </summary>
        <div className="instruction-grid">
          <section>
            <h3>What it looks like</h3>
            <p>{selectedOption.machineLooksLike}</p>
          </section>
          <section>
            <h3>Setup</h3>
            <ul>
              {selectedOption.setup.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h3>Execution</h3>
            <ul>
              {selectedOption.execution.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h3>Checks</h3>
            <ul>
              {selectedOption.formChecks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
        <div className="target-box">
          <strong>Muscle target</strong>
          <span>{selectedOption.muscleTarget}</span>
        </div>
        <div className="equipment-card">
          <span>{equipmentIcon(equipmentType)}</span>
          <div>
            <strong>{equipmentLabels[equipmentType]}</strong>
            <p>{incrementRecommendation(equipmentType, defaultIncrement)}</p>
          </div>
        </div>
      </details>
    </article>
  )
}
