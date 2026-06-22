import { hydrateLogs } from './logStore'
import { hydrateSettings } from './settingsStore'
import { hydrateSyncSession } from './syncStore'

export const hydrateAppStorage = async () => {
  const [logs, settings, syncSession] = await Promise.all([
    hydrateLogs(),
    hydrateSettings(),
    hydrateSyncSession()
  ])

  return { logs, settings, syncSession }
}
