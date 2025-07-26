'use server';

import db from '@/db';
import {
  InsertLocation,
  InsertLocationType,
  location,
} from '@/db/schema/location';
import { getSession } from '@/utils/auth';
import { and, eq } from 'drizzle-orm';
import { customAlphabet } from 'nanoid';
import slugify from 'slug';

export type Location = Awaited<ReturnType<typeof getLocations>>[number];
export type NewLocation = Pick<Location, 'lat' | 'long'>;

function findLocationBySlug(slug: string) {
  return db.query.location.findFirst({
    where: eq(location.slug, slug),
  });
}

export async function getLocation(slug: string) {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const userId = parseInt(session.user.id, 10);
  if (isNaN(userId)) {
    throw new Error('Invalid user ID');
  }

  return db.query.location.findFirst({
    where: and(eq(location.userId, userId), eq(location.slug, slug)),
    with: {
      locationLogs: {
        orderBy: (fields, operator) => operator.desc(fields.startedAt),
      },
    },
  });
}

export async function getLocations() {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const userId = parseInt(session.user.id, 10);
  if (isNaN(userId)) {
    throw new Error('Invalid user ID');
  }

  return db.query.location.findMany({
    where: eq(location.userId, userId),
    with: {
      locationLogs: {
        orderBy: (fields, operator) => operator.desc(fields.startedAt),
      },
    },
  });
}

export async function addLocation(data: InsertLocationType) {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const userId = parseInt(session.user.id, 10);
  if (isNaN(userId)) {
    throw new Error('Invalid user ID');
  }

  const parsed = InsertLocation.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid data for add location');
  }

  let slug = slugify(parsed.data.name);
  const baseSlug = slug;
  let existing = !!(await findLocationBySlug(slug));

  while (existing) {
    const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 8);
    slug = `${baseSlug}-${nanoid()}`;
    existing = !!(await findLocationBySlug(slug));
  }

  const [created] = await db
    .insert(location)
    .values({
      ...parsed.data,
      userId,
      slug,
    })
    .returning();

  return created;
}

export async function updateLocation(slug: string, data: InsertLocationType) {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const userId = parseInt(session.user.id, 10);
  if (isNaN(userId)) {
    throw new Error('Invalid user ID');
  }

  const parsed = InsertLocation.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid data for update location');
  }

  const updated = await db
    .update(location)
    .set(parsed.data)
    .where(and(eq(location.slug, slug), eq(location.userId, userId)))
    .returning();

  if (updated.length === 0) {
    throw new Error('Location not found or unauthorized');
  }

  return updated[0];
}

export async function deleteLocation(slug: string) {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const userId = parseInt(session.user.id, 10);
  if (isNaN(userId)) {
    throw new Error('Invalid user ID');
  }

  const deleted = await db
    .delete(location)
    .where(and(eq(location.slug, slug), eq(location.userId, userId)))
    .returning();

  if (deleted.length === 0) {
    throw new Error('Location not found or unauthorized');
  }

  return deleted[0];
}
