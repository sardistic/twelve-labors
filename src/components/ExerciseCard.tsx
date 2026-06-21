import { useEffect, useMemo, useState } from 'react'
import type { Difficulty, ExerciseLog, ExerciseSlot, OptionKind } from '../types'
import { progressionHint, repsSummary } from '../lib/progression'

type Props = {
  slot: ExerciseSlot
  value: ExerciseLog | null
  previous: ExerciseLog | null
  isActive: boolean
  onChange: (log: ExerciseLog) => void
  onActivate: () => void
  onNext: () => void
  onShowHistory: () => void
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

const buildEmptySets = (count: number) => Array.from({ length: count }, () => ({ weight: '', reps: '' }))

export function ExerciseCard({ slot, value, previous, isActive, onChange, onActivate, onNext, onShowHistory }: Props) {
  const initialOptionName = value?.selectedOptionName ?? slot.options[0]?.name ?? ''
  const [selectedOptionName, setSelectedOptionName] = useState(initialOptionName)
  const selectedOption = (slot.options.find((option) => option.name === selectedOptionName) ?? slot.options[0])!

  useEffect(() => {
    setSelectedOptionName(value?.selectedOptionName ?? slot.options[0]?.name ?? '')
  }, [slot.id, slot.options, value?.selectedOptionName])
  const log = useMemo<ExerciseLog>(() => {
    const sets = value?.sets?.length ? value.sets : buildEmptySets(slot.setCount)
    return {
      exerciseSlotId: slot.id,
      selectedOptionName,
      sets: Array.from({ length: slot.setCount }, (_, index) => sets[index] ?? { weight: '', reps: '' }),
      difficulty: value?.difficulty ?? 'good',
      notes: value?.notes ?? ''
    }
  }, [selectedOptionName, slot.id, slot.setCount, value])
  const hint = progressionHint(slot, value, previous)
  const completedCount = log.sets.filter((set) => set.weight.trim() && set.reps.trim()).length

  const updateLog = (next: ExerciseLog) => {
    onChange(next)
  }

  const chooseOption = (name: string) => {
    setSelectedOptionName(name)
    updateLog({ ...log, selectedOptionName: name })
  }

  const updateSet = (index: number, field: 'weight' | 'reps', fieldValue: string) => {
    const sets = log.sets.map((set, setIndex) => (setIndex === index ? { ...set, [field]: fieldValue } : set))
    updateLog({ ...log, sets })
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
          <p>{slot.setCount} sets · {slot.repRange} reps · {Math.round(slot.restSeconds / 60)} min rest</p>
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
                Weight
                <input inputMode="decimal" value={set.weight} onChange={(event) => updateSet(index, 'weight', event.target.value)} placeholder="lb" aria-label={`Set ${index + 1} weight`} />
              </label>
              <label>
                Reps
                <input inputMode="numeric" value={set.reps} onChange={(event) => updateSet(index, 'reps', event.target.value)} placeholder="reps" aria-label={`Set ${index + 1} reps`} />
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
          <label className="notes-field">
            Notes
            <input value={log.notes} onChange={(event) => updateLog({ ...log, notes: event.target.value })} placeholder="pain, machine taken, felt strong" />
          </label>
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
          <span>Machine notes</span>
          <strong>{selectedOption.name}</strong>
        </summary>
        <div className="instruction-grid">
          <section>
            <h3>Looks like</h3>
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
      </details>
    </article>
  )
}
