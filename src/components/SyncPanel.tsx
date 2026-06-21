import { useState } from 'react'
import { hasDiscordClientId, saveLogsToSync, startDiscordAuth } from '../lib/discordAuth'
import { clearSyncSession } from '../storage/syncStore'
import type { DayLog, SyncSession, TrainingSettings } from '../types'

type Props = {
  logs: DayLog[]
  settings: TrainingSettings
  session: SyncSession | null
  onSessionChange: (session: SyncSession | null) => void
}

export function SyncPanel({ logs, settings, session, onSessionChange }: Props) {
  const [status, setStatus] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const canStartOAuth = hasDiscordClientId()

  const saveNow = async () => {
    if (!session) return
    setIsSaving(true)
    setStatus('Saving...')
    try {
      const result = await saveLogsToSync(session, logs, settings)
      onSessionChange({ ...session, savedAt: result.savedAt })
      setStatus(`Saved ${logs.length} sessions.`)
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Save failed.')
    } finally {
      setIsSaving(false)
    }
  }

  const disconnect = () => {
    clearSyncSession()
    onSessionChange(null)
    setStatus('Disconnected. Local logs stayed on this device.')
  }

  return (
    <aside className="sync-panel">
      <span>Cloud save</span>
      <h2>Discord account</h2>
      {session ? (
        <>
          <div className="sync-user">
            {session.avatarUrl ? <img src={session.avatarUrl} alt="" /> : <div aria-hidden="true" />}
            <strong>{session.username}</strong>
            <small>{session.savedAt ? `Last saved ${session.savedAt}` : 'Not saved yet'}</small>
          </div>
          <div className="data-actions">
            <button type="button" onClick={saveNow} disabled={isSaving}>Save now</button>
            <button type="button" onClick={disconnect}>Disconnect</button>
          </div>
        </>
      ) : (
        <>
          <p>Sign in with Discord to save logs under your account instead of passing JSON files around.</p>
          <button className="discord-button" type="button" onClick={startDiscordAuth} disabled={!canStartOAuth}>
            Connect Discord
          </button>
          {!canStartOAuth ? <p className="sync-warning">Set VITE_DISCORD_CLIENT_ID to enable sign-in.</p> : null}
        </>
      )}
      {status ? <p className="sync-status">{status}</p> : null}
    </aside>
  )
}
