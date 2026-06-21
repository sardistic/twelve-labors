type View = 'today' | 'plan' | 'history' | 'settings'

type Props = {
  activeView: View
  onChange: (view: View) => void
}

const views: Array<{ id: View; label: string }> = [
  { id: 'today', label: 'Today' },
  { id: 'plan', label: 'Plan' },
  { id: 'history', label: 'History' },
  { id: 'settings', label: 'Settings' }
]

export function AppNav({ activeView, onChange }: Props) {
  return (
    <nav className="app-nav" aria-label="Primary views">
      {views.map((view) => (
        <button key={view.id} type="button" className={activeView === view.id ? 'active' : ''} onClick={() => onChange(view.id)}>
          {view.label}
        </button>
      ))}
    </nav>
  )
}
