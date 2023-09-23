# Full Stack Spotify Clone with Next.js 13.4 App Router: React, Tailwind, Supabase, PostgreSQL, Stripe

![Fullstack Spotify Clone](https://github.com/yutung-cheng/spotify_clone/blob/main/screenshots/thumbnail.png)

For DEMO, visit [Spotify clone](https://spotify-clone-pzn8gp2mx-yutung-cheng.vercel.app/)

This is a repository for a Full Stack Spotify Clone with Next.js 13.4 App Router: React, Tailwind, Supabase, PostgreSQL, Stripe


Key Features:

- Song upload
- Stripe integration
- Tailwind design for sleek UI
- Tailwind animations and transition effects
- Full responsiveness for all devices
- Credential authentication with Supabase
- Github authentication integration
- File and image upload using Supabase storage
- Client form validation and handling using react-hook-form
- Server error handling with react-toast
- Play song audio
- Favorites system
- Playlists / Liked songs system
- Advanced Player component
- Stripe recurring payment integration
- How to write POST, GET, and DELETE routes in route handlers (app/api)
- How to fetch data in server React components by directly accessing the database (WITHOUT API! like Magic!)
- Handling relations between Server and Child components in a real-time environment
- Cancelling Stripe subscriptions


### Screenshots
![Page view](https://github.com/yutung-cheng/spotify_clone/blob/main/screenshots/pageview.png)
![Log in dialog](https://github.com/yutung-cheng/spotify_clone/blob/main/screenshots/login_dialog.png)
![Subscribe](https://github.com/yutung-cheng/spotify_clone/blob/main/screenshots/subscribeDialog.png)
![Search](https://github.com/yutung-cheng/spotify_clone/blob/main/screenshots/search.png)
![Supabase](https://github.com/yutung-cheng/spotify_clone/blob/main/screenshots/database.png)
![Stripe Test Payment](https://github.com/yutung-cheng/spotify_clone/blob/main/screenshots/stripePayment.png)

### Prerequisites

**Node version 14.x**


### Install packages

```shell
npm i
```

### Setup .env file

```js
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

### Add SQL Tables
Use `database.sql` file, create songs and liked_songs table

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
