# Discord + Railway Setup

## Discord Developer Portal

1. Create an application at https://discord.com/developers/applications.
2. Copy the Application ID into:
   - `VITE_DISCORD_CLIENT_ID`
   - `DISCORD_CLIENT_ID`
3. Open OAuth2 settings and add Redirect URLs:
   - Local dev: `http://127.0.0.1:5178/`
   - Railway: `https://YOUR-RAILWAY-DOMAIN/`
4. Copy the Client Secret into `DISCORD_CLIENT_SECRET`.
5. On General Information, copy the Public Key into `DISCORD_PUBLIC_KEY`.
6. On Bot, create or reset the token and put it in `DISCORD_BOT_TOKEN`.
7. On General Information, set Interactions Endpoint URL to:
   - Railway: `https://YOUR-RAILWAY-DOMAIN/api/discord/interactions`
   - Local tunnel, if testing locally: `https://YOUR-TUNNEL-DOMAIN/api/discord/interactions`

The browser sign-in requests only the `identify` scope. Discord is used for identity; Twelve Labors stores workout data through this app's backend. The bot uses signed interaction webhooks, so Railway receives slash commands directly.

## Railway Variables

Set these variables in Railway:

```text
VITE_DISCORD_CLIENT_ID=your_discord_application_id
DISCORD_CLIENT_ID=your_discord_application_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_PUBLIC_KEY=your_discord_public_key
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_REDIRECT_URI=https://YOUR-RAILWAY-DOMAIN/
SESSION_SECRET=a_long_random_string
DATA_DIR=/data
```

If you use `DATA_DIR=/data`, attach a Railway volume mounted at `/data`. Without a volume, file storage may disappear on redeploy.

## Railway Build/Start

Railway can use:

```text
npm install
npm run build
npm start
```

The Node server serves `dist/` and exposes:

- `POST /api/auth/discord/exchange`
- `PUT /api/sync/logs`
- `GET /api/sync/logs`
- `POST /api/discord/interactions`

## Slash Commands

Register or update commands after setting bot credentials:

```text
npm run discord:commands
```

Set `DISCORD_GUILD_ID` first for instant test-server commands. Omit it for global commands, which can take longer to appear.

The bot supports:

- `/today` shows today's saved workout log.
- `/log exercise:<name> set:<n> weight:<lb> reps:<n>` saves a set to the same data the site syncs.
- `/next` shows the next incomplete lift from today's saved data.
- `/remind time:17:30` stores a daily reminder time and DMs the user once per day.

Keep bot tokens server-side only. Do not put a bot token or OAuth client secret in Vite environment variables.
