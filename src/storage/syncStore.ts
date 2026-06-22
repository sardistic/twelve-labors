import type { SyncSession } from '../types'
import { readValue, removeValue, writeValue } from './dbStore'

const syncKey = 'project-fit.discord-session.v1'
let syncCache: SyncSession | null = null

export const readSyncSession = (): SyncSession | null => {
  return syncCache
}

export const hydrateSyncSession = async (): Promise<SyncSession | null> => {
  try {
    const stored = await readValue<SyncSession>(syncKey)
    const parsed = stored ?? JSON.parse(localStorage.getItem(syncKey) ?? 'null') as SyncSession | null
    if (!parsed || parsed.provider !== 'discord' || !parsed.accessToken || !parsed.userId) return null
    syncCache = parsed
    if (!stored) {
      await writeValue(syncKey, parsed)
      localStorage.removeItem(syncKey)
    }
    return syncCache
  } catch {
    return null
  }
}

export const writeSyncSession = (session: SyncSession) => {
  syncCache = session
  void writeValue(syncKey, session)
  return session
}

export const clearSyncSession = () => {
  syncCache = null
  void removeValue(syncKey)
}
