import env from '@/utils/env';
import { drizzle } from 'drizzle-orm/libsql';

import * as schema from './schema';

const db = drizzle({
  connection: {
    url: env.TURSO_DATABASE_URL,
    authToken: process.env.NODE_ENV ? env.TURSO_AUTH_TOKEN : undefined,
  },
  schema,
});

export default db;
