import env from '@/utils/env';
import { defineConfig } from 'drizzle-kit';

import './envConfig';

export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/schema/index.ts',
  dialect: 'turso',
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken: process.env.NODE_ENV ? env.TURSO_AUTH_TOKEN : undefined,
  },
});
