'use server';

import db from '@/db';
import {
  InsertLocationLog,
  InsertLocationLogType,
  locationLog,
} from '@/db/schema';
import { getSession } from '@/utils/auth';
import { and, eq } from 'drizzle-orm';

import { getLocation } from './locationAction';

export type LocationLog = NonNullable<
  Awaited<ReturnType<typeof getLocation>>
>['locationLogs'][number];

export async function getLocationLog(logId: number) {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const userId = parseInt(session.user.id, 10);
  if (isNaN(userId)) {
    throw new Error('Invalid user ID');
  }

  const log = await db.query.locationLog.findFirst({
    where: and(eq(locationLog.id, logId), eq(locationLog.userId, userId)),
  });

  if (!log) {
    throw new Error('Location log not found');
  }

  return log;
}

export async function updateLocationLog(
  data: InsertLocationLogType,
  logId: number,
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
    throw new Error('Invalid data for update location log');
  }

  const updated = await db
    .update(locationLog)
    .set(parsed.data)
    .where(and(eq(locationLog.id, logId), eq(locationLog.userId, userId)))
    .returning();

  if (updated.length === 0) {
    throw new Error('Location log not found or not updated');
  }

  return updated[0];
}

export async function deleteLocationLog(logId: number) {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const userId = parseInt(session.user.id, 10);
  if (isNaN(userId)) {
    throw new Error('Invalid user ID');
  }

  const deleted = await db
    .delete(locationLog)
    .where(and(eq(locationLog.id, logId), eq(locationLog.userId, userId)))
    .returning();

  if (deleted.length === 0) {
    throw new Error('Location log not found or not deleted');
  }

  return deleted[0];
}

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
