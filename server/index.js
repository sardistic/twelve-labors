import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import nacl from 'tweetnacl'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const distDir = join(root, 'dist')
const dataDir = resolve(process.env.DATA_DIR ?? join(root, 'data'))
const port = Number(process.env.PORT ?? 3000)
const sessionSecret = process.env.SESSION_SECRET ?? 'dev-session-secret-change-me'
const discordPublicKey = process.env.DISCORD_PUBLIC_KEY ?? ''
const discordBotToken = process.env.DISCORD_BOT_TOKEN ?? ''
const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']

const json = (response, status, body) => {
  response.writeHead(status, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(body))
}

const readBody = async (request) => {
  const chunks = []
  for await (const chunk of request) chunks.push(chunk)
  return Buffer.concat(chunks)
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

const readJsonBody = async (request) => JSON.parse((await readBody(request)).toString('utf8'))

const todayISO = () => new Date().toISOString().slice(0, 10)

const weekdayFromDate = (date) => {
  const day = new Date(`${date}T12:00:00`).getDay()
  if (day >= 1 && day <= 5) return weekdays[day - 1]
  return 'monday'
}

const makeLogId = (date, dayId) => `${date}:${dayId}`

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'exercise'

const emptyRecord = () => ({ logs: [], settings: null, savedAt: '' })

const readUserData = async (userId) => {
  const path = userPath(userId)
  if (!existsSync(path)) return emptyRecord()
  return { ...emptyRecord(), ...JSON.parse(await readFile(path, 'utf8')) }
}

const writeUserData = async (userId, record) => {
  await mkdir(dataDir, { recursive: true })
  const savedAt = new Date().toISOString()
  await writeFile(userPath(userId), JSON.stringify({ ...record, savedAt }, null, 2))
  return savedAt
}

const getOrCreateTodayLog = (record) => {
  const date = todayISO()
  const dayId = weekdayFromDate(date)
  const id = makeLogId(date, dayId)
  const logs = Array.isArray(record.logs) ? record.logs : []
  let log = logs.find((entry) => entry.id === id)
  if (!log) {
    log = { id, date, dayId, bodyWeight: '', energy: 'normal', exercises: {}, cardio: '', notes: '' }
    logs.push(log)
    record.logs = logs
  }
  return log
}

const siteUrl = `https://${process.env.RAILWAY_PUBLIC_DOMAIN ?? 'gym-playbook-production.up.railway.app'}`

const titleCase = (value) => value.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())

const compact = (value, max = 950) => (value.length > max ? `${value.slice(0, max - 3)}...` : value)

const stamp = (label) => [
  '```text',
  'TWELVE LABORS / FIELD TERMINAL',
  `STATUS: ${label.toUpperCase()}`,
  '```'
].join('\n')

const setBar = (done, total) => {
  const width = Math.max(total, 3)
  return `[${Array.from({ length: width }, (_, index) => (index < done ? '#' : '-')).join('')}] ${done}/${total}`
}

const actionRows = (mode = 'default') => [
  {
    type: 1,
    components: [
      {
        type: 2,
        style: mode === 'today' ? 2 : 1,
        label: 'Today',
        custom_id: 'project-fit:today'
      },
      {
        type: 2,
        style: mode === 'next' ? 2 : 1,
        label: 'Next',
        custom_id: 'project-fit:next'
      },
      {
        type: 2,
        style: 5,
        label: 'Open Site',
        url: siteUrl
      }
    ]
  }
]

const fieldManualResponse = ({ title, description, fields = [], tone = 'neutral', mode = 'default', ephemeral = true }) => {
  const colors = {
    neutral: 0x33382f,
    success: 0x7f946f,
    warning: 0xb28a53,
    danger: 0x9d6058
  }

  return {
    type: 4,
    data: {
      flags: ephemeral ? 64 : undefined,
      content: stamp(title),
      embeds: [
        {
          color: colors[tone] ?? colors.neutral,
          author: { name: 'TWELVE LABORS // WORK SET' },
          title,
          description,
          fields: fields.map((field) => ({ ...field, value: compact(String(field.value || '-')) })),
          footer: { text: 'quiet reps / clean records / no ceremony' },
          timestamp: new Date().toISOString()
        }
      ],
      components: actionRows(mode)
    }
  }
}

const errorResponse = (description) => fieldManualResponse({
  title: 'Input check',
  description,
  tone: 'warning'
})

const todayResponse = (record) => {
  const log = getOrCreateTodayLog(record)
  const exercises = Object.values(log.exercises ?? {})
  if (!exercises.length) {
    return fieldManualResponse({
      title: 'Today is empty',
      description: 'No sets are logged yet. Start from Discord with `/log`, or open the site to work from the full plan.',
      fields: [
        { name: 'Date', value: log.date, inline: true },
        { name: 'Session', value: titleCase(log.dayId), inline: true }
      ],
      mode: 'today'
    })
  }

  const fields = exercises.slice(0, 6).map((exercise) => {
    const sets = (exercise.sets ?? []).filter((set) => set.weight || set.reps)
    const total = Math.max(exercise.sets?.length ?? 0, sets.length, 1)
    const summary = sets.length ? sets.map((set) => `${set.weight || '?'} x ${set.reps || '?'}`).join(', ') : 'no sets'
    return {
      name: exercise.selectedOptionName || exercise.exerciseSlotId,
      value: `${setBar(sets.length, total)}\n${summary}`,
      inline: false
    }
  })

  return fieldManualResponse({
    title: `${log.date} // ${titleCase(log.dayId)}`,
    description: `${exercises.length} lift${exercises.length === 1 ? '' : 's'} on the board.`,
    fields,
    tone: 'success',
    mode: 'today'
  })
}

const nextLiftResponse = (record) => {
  const log = getOrCreateTodayLog(record)
  const exercises = Object.values(log.exercises ?? {})
  const open = exercises.find((exercise) => (exercise.sets ?? []).some((set) => !set.weight || !set.reps))
  if (open) {
    const emptyIndex = open.sets.findIndex((set) => !set.weight || !set.reps)
    return fieldManualResponse({
      title: 'Next lift',
      description: open.selectedOptionName || open.exerciseSlotId,
      fields: [
        { name: 'Set', value: String(emptyIndex + 1), inline: true },
        { name: 'Move', value: 'Fill weight and reps', inline: true }
      ],
      mode: 'next'
    })
  }
  if (exercises.length) {
    return fieldManualResponse({
      title: 'Board is clear',
      description: 'Everything currently saved for today has logged sets. Add another lift with `/log` or open the site for the full plan.',
      tone: 'success',
      mode: 'next'
    })
  }
  return fieldManualResponse({
    title: 'No active lift',
    description: 'Today has not been seeded yet. Open the site once, or start from Discord with `/log`.',
    mode: 'next'
  })
}

const optionValue = (interaction, name) => {
  const option = interaction.data?.options?.find((entry) => entry.name === name)
  return option?.value
}

const verifyDiscordSignature = (request, rawBody) => {
  if (!discordPublicKey) return false
  const signature = request.headers['x-signature-ed25519']
  const timestamp = request.headers['x-signature-timestamp']
  if (!signature || !timestamp) return false

  return nacl.sign.detached.verify(
    Buffer.from(`${timestamp}${rawBody.toString('utf8')}`),
    Buffer.from(signature, 'hex'),
    Buffer.from(discordPublicKey, 'hex')
  )
}

const handleDiscordCommand = async (interaction) => {
  const userId = interaction.member?.user?.id ?? interaction.user?.id
  if (!userId) return errorResponse('I could not identify your Discord user.')

  const command = interaction.data?.name
  const record = await readUserData(userId)

  if (command === 'today') {
    return todayResponse(record)
  }

  if (command === 'next') {
    return nextLiftResponse(record)
  }

  if (command === 'remind') {
    const time = String(optionValue(interaction, 'time') ?? '').trim()
    if (!/^\d{2}:\d{2}$/.test(time)) return errorResponse('Use 24-hour time like `17:30`.')
    const [hours, minutes] = time.split(':').map(Number)
    if (hours > 23 || minutes > 59) return errorResponse('Use a real 24-hour time like `17:30`.')
    record.reminderTime = time
    record.lastReminderDate = ''
    await writeUserData(userId, record)
    return fieldManualResponse({
      title: 'Reminder armed',
      description: 'A daily training check-in is set.',
      fields: [
        { name: 'Time', value: time, inline: true },
        { name: 'Delivery', value: 'Discord DM', inline: true }
      ],
      tone: 'success'
    })
  }

  if (command === 'log') {
    const exercise = String(optionValue(interaction, 'exercise') ?? '').trim()
    const weight = String(optionValue(interaction, 'weight') ?? '').trim()
    const reps = String(optionValue(interaction, 'reps') ?? '').trim()
    const setNumber = Number(optionValue(interaction, 'set') ?? 1)
    const notes = String(optionValue(interaction, 'notes') ?? '').trim()

    if (!exercise || !weight || !reps || !Number.isInteger(setNumber) || setNumber < 1 || setNumber > 12) {
      return errorResponse('Send exercise, weight, reps, and set number. Example: `/log exercise:"Leg press" weight:180 reps:10 set:1`')
    }

    const log = getOrCreateTodayLog(record)
    const slotId = slugify(exercise)
    const existing = log.exercises[slotId] ?? {
      exerciseSlotId: slotId,
      selectedOptionName: exercise,
      sets: [],
      difficulty: 'good',
      notes: ''
    }

    while (existing.sets.length < setNumber) existing.sets.push({ weight: '', reps: '' })
    existing.sets[setNumber - 1] = { weight, reps }
    existing.notes = [existing.notes, notes].filter(Boolean).join(' | ')
    log.exercises[slotId] = existing

    await writeUserData(userId, record)
    return fieldManualResponse({
      title: 'Set saved',
      description: exercise,
      fields: [
        { name: 'Set', value: String(setNumber), inline: true },
        { name: 'Load', value: weight, inline: true },
        { name: 'Reps', value: reps, inline: true },
        ...(notes ? [{ name: 'Note', value: notes, inline: false }] : [])
      ],
      tone: 'success'
    })
  }

  return errorResponse('Unknown command.')
}

const handleDiscordComponent = async (interaction) => {
  const userId = interaction.member?.user?.id ?? interaction.user?.id
  if (!userId) return errorResponse('I could not identify your Discord user.')

  const record = await readUserData(userId)
  if (interaction.data?.custom_id === 'project-fit:today') return todayResponse(record)
  if (interaction.data?.custom_id === 'project-fit:next') return nextLiftResponse(record)
  return errorResponse('Unknown control.')
}

const discordInteractions = async (request, response) => {
  const rawBody = await readBody(request)
  if (!verifyDiscordSignature(request, rawBody)) return json(response, 401, { error: 'Invalid request signature.' })

  const interaction = JSON.parse(rawBody.toString('utf8'))
  if (interaction.type === 1) return json(response, 200, { type: 1 })
  if (interaction.type === 2) return json(response, 200, await handleDiscordCommand(interaction))
  if (interaction.type === 3) return json(response, 200, await handleDiscordComponent(interaction))
  return json(response, 200, errorResponse('Unsupported Discord interaction.'))
}

const exchangeDiscordCode = async (request, response) => {
  const { code, redirectUri } = await readJsonBody(request)
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
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
    },
    body: tokenBody
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

  if (request.method === 'GET') {
    return json(response, 200, await readUserData(userId))
  }

  const payload = await readJsonBody(request)
  const existing = await readUserData(userId)
  const savedAt = await writeUserData(userId, {
    ...existing,
    logs: payload.logs ?? [],
    settings: payload.settings ?? null
  })
  json(response, 200, { savedAt })
}

const sendDiscordDm = async (userId, content) => {
  if (!discordBotToken) return false
  const channelResponse = await fetch('https://discord.com/api/v10/users/@me/channels', {
    method: 'POST',
    headers: {
      Authorization: `Bot ${discordBotToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ recipient_id: userId })
  })
  if (!channelResponse.ok) return false
  const channel = await channelResponse.json()
  const messageResponse = await fetch(`https://discord.com/api/v10/channels/${channel.id}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bot ${discordBotToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content })
  })
  return messageResponse.ok
}

const runReminderSweep = async () => {
  if (!discordBotToken || !existsSync(dataDir)) return
  const now = new Date()
  const hhmm = now.toTimeString().slice(0, 5)
  const today = todayISO()
  for (const file of await readdir(dataDir)) {
    if (!/^\d+\.json$/.test(file)) continue
    const userId = file.replace('.json', '')
    const record = await readUserData(userId)
    if (record.reminderTime !== hhmm || record.lastReminderDate === today) continue
    const sent = await sendDiscordDm(userId, `Training check-in: open Twelve Labors or use /today, /next, and /log right here.`)
    if (sent) {
      record.lastReminderDate = today
      await writeUserData(userId, record)
    }
  }
}

const serveStatic = async (request, response) => {
  const url = new URL(request.url ?? '/', `http://${request.headers.host}`)
  const safePath = url.pathname === '/' ? 'index.html' : url.pathname.slice(1)
  const filePath = resolve(distDir, safePath)
  const target = filePath.startsWith(distDir) && existsSync(filePath) ? filePath : join(distDir, 'index.html')
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webmanifest': 'application/manifest+json' }
  response.writeHead(200, { 'Content-Type': types[extname(target)] ?? 'application/octet-stream' })
  response.end(await readFile(target))
}

createServer(async (request, response) => {
  try {
    if (request.url === '/api/discord/interactions' && request.method === 'POST') return await discordInteractions(request, response)
    if (request.url === '/api/auth/discord/exchange' && request.method === 'POST') return await exchangeDiscordCode(request, response)
    if (request.url === '/api/sync/logs' && (request.method === 'PUT' || request.method === 'GET')) return await syncLogs(request, response)
    return await serveStatic(request, response)
  } catch (error) {
    json(response, 500, { error: error instanceof Error ? error.message : 'Server error.' })
  }
}).listen(port, () => {
  console.log(`Twelve Labors server listening on ${port}`)
})

setInterval(() => {
  runReminderSweep().catch((error) => console.error('Reminder sweep failed', error))
}, 60_000)
