import type { SyncSession } from '../types'

const syncKey = 'project-fit.discord-session.v1'

export const readSyncSession = (): SyncSession | null => {
  try {
    const parsed = JSON.parse(localStorage.getItem(syncKey) ?? 'null') as SyncSession | null
    if (!parsed || parsed.provider !== 'discord' || !parsed.accessToken || !parsed.userId) return null
    return parsed
  } catch {
    return null
  }
}

export const writeSyncSession = (session: SyncSession) => {
  localStorage.setItem(syncKey, JSON.stringify(session))
  return session
}

export const clearSyncSession = () => {
  localStorage.removeItem(syncKey)
}
