import type { DayLog, SyncSession, TrainingSettings } from '../types'

const stateKey = 'project-fit.discord-oauth-state.v1'

const discordClientId = import.meta.env.VITE_DISCORD_CLIENT_ID as string | undefined
const authExchangeEndpoint = (import.meta.env.VITE_DISCORD_AUTH_ENDPOINT as string | undefined) ?? '/api/auth/discord/exchange'
const syncEndpoint = (import.meta.env.VITE_SYNC_ENDPOINT as string | undefined) ?? '/api/sync/logs'

const makeState = () => {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export const hasDiscordClientId = () => Boolean(discordClientId)

export const startDiscordAuth = () => {
  if (!discordClientId) throw new Error('Missing VITE_DISCORD_CLIENT_ID.')
  const state = makeState()
  localStorage.setItem(stateKey, state)
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: discordClientId,
    scope: 'identify',
    state,
    redirect_uri: window.location.origin + window.location.pathname,
    prompt: 'consent'
  })
  window.location.assign(`https://discord.com/oauth2/authorize?${params.toString()}`)
}

export const consumeDiscordCallback = async (): Promise<SyncSession | null> => {
  const url = new URL(window.location.href)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  if (!code) return null

  const expectedState = localStorage.getItem(stateKey)
  localStorage.removeItem(stateKey)
  url.searchParams.delete('code')
  url.searchParams.delete('state')
  window.history.replaceState({}, document.title, `${url.pathname}${url.search}${url.hash}`)

  if (!state || !expectedState || state !== expectedState) throw new Error('Discord sign-in state did not match.')

  const response = await fetch(authExchangeEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code,
      redirectUri: window.location.origin + window.location.pathname
    })
  })

  if (!response.ok) throw new Error('Discord sign-in backend is not available yet.')
  return (await response.json()) as SyncSession
}

export const saveLogsToSync = async (session: SyncSession, logs: DayLog[], settings: TrainingSettings) => {
  const response = await fetch(syncEndpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`
    },
    body: JSON.stringify({ logs, settings })
  })
  if (!response.ok) throw new Error('Cloud save endpoint is not available yet.')
  return response.json() as Promise<{ savedAt: string }>
}
