import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const distDir = join(root, 'dist')
const dataDir = resolve(process.env.DATA_DIR ?? join(root, 'data'))
const port = Number(process.env.PORT ?? 3000)
const sessionSecret = process.env.SESSION_SECRET ?? 'dev-session-secret-change-me'

const json = (response, status, body) => {
  response.writeHead(status, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(body))
}

const readBody = async (request) => {
  const chunks = []
  for await (const chunk of request) chunks.push(chunk)
  return Buffer.concat(chunks).toString('utf8')
}

const base64url = (value) => Buffer.from(value).toString('base64url')

const sign = (payload) => createHmac('sha256', sessionSecret).update(payload).digest('base64url')

const createToken = (userId) => {
  const payload = base64url(JSON.stringify({ userId, nonce: randomBytes(8).toString('hex') }))
  return `${payload}.${sign(payload)}`
}

const verifyToken = (token = '') => {
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return null
  const expected = sign(payload)
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')).userId
  } catch {
    return null
  }
}

const userPath = (userId) => join(dataDir, `${userId.replace(/[^0-9]/g, '')}.json`)

const exchangeDiscordCode = async (request, response) => {
  const { code, redirectUri } = JSON.parse(await readBody(request))
  const clientId = process.env.DISCORD_CLIENT_ID
  const clientSecret = process.env.DISCORD_CLIENT_SECRET
  const configuredRedirectUri = process.env.DISCORD_REDIRECT_URI ?? redirectUri

  if (!clientId || !clientSecret) return json(response, 500, { error: 'Discord credentials are not configured.' })

  const tokenBody = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: configuredRedirectUri
  })

  const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: tokenBody,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
    }
  })

  if (!tokenResponse.ok) return json(response, 401, { error: 'Discord token exchange failed.' })
  const token = await tokenResponse.json()

  const userResponse = await fetch('https://discord.com/api/users/@me', {
    headers: { Authorization: `Bearer ${token.access_token}` }
  })

  if (!userResponse.ok) return json(response, 401, { error: 'Discord user lookup failed.' })
  const user = await userResponse.json()
  const avatarUrl = user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : ''

  json(response, 200, {
    provider: 'discord',
    userId: user.id,
    username: user.global_name || user.username,
    avatarUrl,
    accessToken: createToken(user.id),
    savedAt: ''
  })
}

const syncLogs = async (request, response) => {
  const auth = request.headers.authorization ?? ''
  const userId = verifyToken(auth.replace(/^Bearer\s+/i, ''))
  if (!userId) return json(response, 401, { error: 'Not signed in.' })

  await mkdir(dataDir, { recursive: true })
  const path = userPath(userId)

  if (request.method === 'GET') {
    if (!existsSync(path)) return json(response, 200, { logs: [], settings: null, savedAt: '' })
    return json(response, 200, JSON.parse(await readFile(path, 'utf8')))
  }

  const payload = JSON.parse(await readBody(request))
  const savedAt = new Date().toISOString()
  await writeFile(path, JSON.stringify({ ...payload, savedAt }, null, 2))
  json(response, 200, { savedAt })
}

const serveStatic = async (request, response) => {
  const url = new URL(request.url ?? '/', `http://${request.headers.host}`)
  const safePath = url.pathname === '/' ? 'index.html' : url.pathname.slice(1)
  const filePath = resolve(distDir, safePath)
  const target = filePath.startsWith(distDir) && existsSync(filePath) ? filePath : join(distDir, 'index.html')
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' }
  response.writeHead(200, { 'Content-Type': types[extname(target)] ?? 'application/octet-stream' })
  response.end(await readFile(target))
}

createServer(async (request, response) => {
  try {
    if (request.url === '/api/auth/discord/exchange' && request.method === 'POST') return await exchangeDiscordCode(request, response)
    if (request.url === '/api/sync/logs' && (request.method === 'PUT' || request.method === 'GET')) return await syncLogs(request, response)
    return await serveStatic(request, response)
  } catch (error) {
    json(response, 500, { error: error instanceof Error ? error.message : 'Server error.' })
  }
}).listen(port, () => {
  console.log(`Project Fit server listening on ${port}`)
})
