'use server';

import db from '@/db';
import { InsertLocation, location } from '@/db/schema/location';
import { getSession } from '@/utils/auth';
import { eq } from 'drizzle-orm';
import { customAlphabet } from 'nanoid';
import slugify from 'slug';

export type AddLocationFormData = {
  name: string;
  description: string | null;
  lat: number;
  long: number;
};

function findLocationBySlug(slug: string) {
  return db.query.location.findFirst({
    where: eq(location.slug, slug),
  });
}

export async function addLocation(data: AddLocationFormData) {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const parsed = InsertLocation.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid data for add location');
  }

  let slug = slugify(parsed.data.name);
  let existing = !!findLocationBySlug(slug);

  while (existing) {
    const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 8);
    const newSlug = `${slug}-${nanoid}`;
    existing = !!findLocationBySlug(newSlug);

    if (!existing) {
      slug = newSlug;
    }
  }

  const [created] = await db
    .insert(location)
    .values({
      ...parsed.data,
      userId: Number(session.user.id),
      slug,
    })
    .returning();

  return created;
}
