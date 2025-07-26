'use server';

import db from '@/db';
import {
  InsertLocationLog,
  InsertLocationLogType,
  locationLog,
} from '@/db/schema';
import { getSession } from '@/utils/auth';

import { getLocation } from './locationAction';

export type LocationLog = NonNullable<
  Awaited<ReturnType<typeof getLocation>>
>['locationLogs'][number];

export async function addLocationLog(
  data: InsertLocationLogType,
  slug: string,
) {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const userId = parseInt(session.user.id, 10);
  if (isNaN(userId)) {
    throw new Error('Invalid user ID');
  }

  const parsed = InsertLocationLog.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid data for add location log');
  }

  const location = await getLocation(slug);
  if (!location) {
    throw new Error('Location not found');
  }

  const [created] = await db
    .insert(locationLog)
    .values({ ...parsed.data, userId, locationId: location.id })
    .returning();

  return created;
}
