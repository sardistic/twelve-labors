type Props = {
  cardio: string
  notes: string
  onCardioChange: (value: string) => void
  onNotesChange: (value: string) => void
}

export function SessionNotes({ cardio, notes, onCardioChange, onNotesChange }: Props) {
  return (
    <section className="session-notes">
      <label>
        Cardio / finisher log
        <input value={cardio} onChange={(event) => onCardioChange(event.target.value)} placeholder="8 min incline walk, 5% @ 3 mph" />
      </label>
      <label>
        Session notes
        <textarea value={notes} onChange={(event) => onNotesChange(event.target.value)} placeholder="What felt good, what hurt, what was taken, what to adjust next time" />
      </label>
    </section>
  )
}
