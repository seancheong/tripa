import { relations } from 'drizzle-orm';
import { int, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';

import { user } from './auth';
import { location } from './location';

export const locationLog = sqliteTable('locationLog', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text(),
  startedAt: int().notNull(),
  endedAt: int().notNull(),
  lat: real().notNull(),
  long: real().notNull(),
  locationId: int()
    .notNull()
    .references(() => location.id),
  userId: int()
    .notNull()
    .references(() => user.id),
  createdAt: int()
    .notNull()
    .$default(() => Date.now()),
  updatedAt: int()
    .notNull()
    .$default(() => Date.now())
    .$onUpdate(() => Date.now()),
});

export const locationLogRelations = relations(locationLog, ({ one }) => ({
  location: one(location, {
    fields: [locationLog.locationId],
    references: [location.id],
  }),
}));

export const InsertLocationLog = createInsertSchema(locationLog, {
  name: (field) => field.min(1).max(100),
  description: (field) => field.max(1000),
  lat: (field) => field.min(-90).max(90),
  long: (field) => field.min(-180).max(180),
})
  .omit({
    id: true,
    userId: true,
    locationId: true,
    createdAt: true,
    updatedAt: true,
  })
  .superRefine((values, context) => {
    if (values.startedAt > values.endedAt) {
      context.addIssue({
        code: 'custom',
        message: 'Start date must be before End date',
        path: ['startedAt'],
      });
      context.addIssue({
        code: 'custom',
        message: 'End date must be after Start date',
        path: ['endedAt'],
      });
    }
  });

export type InsertLocationLogType = z.infer<typeof InsertLocationLog>;
