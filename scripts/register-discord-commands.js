const token = process.env.DISCORD_BOT_TOKEN
const clientId = process.env.DISCORD_CLIENT_ID
const guildId = process.env.DISCORD_GUILD_ID

if (!token || !clientId) {
  console.error('Set DISCORD_BOT_TOKEN and DISCORD_CLIENT_ID before registering commands.')
  process.exit(1)
}

const commands = [
  {
    name: 'today',
    description: 'Show today\'s saved workout log.'
  },
  {
    name: 'next',
    description: 'Show the next lift to focus on.'
  },
  {
    name: 'log',
    description: 'Save a workout set to Project Fitness.',
    options: [
      { name: 'exercise', description: 'Exercise name', type: 3, required: true },
      { name: 'weight', description: 'Weight used, such as 180 or bodyweight', type: 3, required: true },
      { name: 'reps', description: 'Reps completed', type: 3, required: true },
      { name: 'set', description: 'Set number', type: 4, required: true, min_value: 1, max_value: 12 },
      { name: 'notes', description: 'Optional note', type: 3, required: false }
    ]
  },
  {
    name: 'remind',
    description: 'Set a daily Discord workout reminder.',
    options: [
      { name: 'time', description: '24-hour local server time, like 17:30', type: 3, required: true }
    ]
  }
]

const path = guildId
  ? `/applications/${clientId}/guilds/${guildId}/commands`
  : `/applications/${clientId}/commands`

const response = await fetch(`https://discord.com/api/v10${path}`, {
  method: 'PUT',
  headers: {
    Authorization: `Bot ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(commands)
})

const body = await response.text()
if (!response.ok) {
  console.error(`Discord command registration failed: ${response.status}`)
  console.error(body)
  process.exit(1)
}

console.log(`Registered ${commands.length} Discord commands ${guildId ? `for guild ${guildId}` : 'globally'}.`)
