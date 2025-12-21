# Tripa

## Project Description

Tripa is a location-based app that allows users to mark and log places they have visited. Users can sign in to add new locations, view them on a map, and manage their logs. The app includes features such as a dark/light theme toggle, responsive navigation for mobile and desktop, and uses secure authentication via session-based login.

## Tech Stack

- [Next.js (App Router)](https://nextjs.org/) – Framework
- [Tailwind CSS](https://tailwindcss.com/) – Styling
- [ShadCN UI](https://ui.shadcn.com/) – UI Components
- [BetterAuth](https://www.better-auth.com/) – Authentication
- [Turso DB](https://turso.tech/) - SQLite Database
- [Drizzle ORM](https://orm.drizzle.team/) – Database ORM
- [MapLibre GL JS](https://maplibre.org/projects/maplibre-gl-js/) – Map Rendering
- [OpenFreeMap](https://openfreemap.org/) – Map Tiles
- [OpenStreetMap Nominatim API](https://nominatim.openstreetmap.org/) – Geolocation Search
- [React Hook Form](https://react-hook-form.com/) – Form Management
- [Zod](https://zod.dev/) – Schema Declaration and Validation

## Environment Variables

To run this project, the following environment variables must be set in a `.env` file:

```env
TURSO_DATABASE_URL=          # URL to your Turso database instance
TURSO_AUTH_TOKEN=            # Auth token for your Turso database

BETTER_AUTH_URL=             # Base URL for BetterAuth service
BETTER_AUTH_SECRET=          # Secret key for BetterAuth

GITHUB_CLIENT_ID=            # GitHub client ID
GITHUB_CLIENT_SECRET=        # GitHub client secret

GOOGLE_CLIENT_ID=            # Google client ID
GOOGLE_CLIENT_SECRET=        # Google client secret
```

## Getting Started

Install the required dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
