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

The app currently requests only the `identify` scope. Discord is used for identity; Project Fit stores the workout data through this app's backend.

## Railway Variables

Set these variables in Railway:

```text
VITE_DISCORD_CLIENT_ID=your_discord_application_id
DISCORD_CLIENT_ID=your_discord_application_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
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

## Future Discord Side Piece

A Discord bot can reuse the same storage by verifying the Discord user id and reading/writing the same per-user log files. Suggested commands:

- `/today` shows the current workout.
- `/log exercise:<name> set:<n> weight:<lb> reps:<n>` saves a set.
- `/next` shows the next active lift.
- Daily reminder job sends a DM around workout time.

Keep bot tokens server-side only. Do not put a bot token or OAuth client secret in Vite environment variables.
