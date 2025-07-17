import z, { ZodError, ZodObject, ZodRawShape } from 'zod';

const EnvSchema = z.object({
  TURSO_DATABASE_URL: z.string(),
  TURSO_AUTH_TOKEN: z.string(),
  BETTER_AUTH_URL: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
});

export type EnvSchemaType = z.infer<typeof EnvSchema>;

export default tryParseEnv(EnvSchema);

function tryParseEnv<T extends ZodRawShape>(
  schema: ZodObject<T>,
  buildEnv: Record<string, string | undefined> = process.env,
) {
  try {
    return schema.parse(buildEnv);
  } catch (error) {
    if (error instanceof ZodError) {
      let message = 'Missing required values in .env:\n';
      error.issues.forEach((issue) => {
        message += `${String(issue.path[0])}\n`;
      });
      throw new Error(message);
    } else {
      console.error('Unexpected error during environment validation:', error);
      throw error;
    }
  }
}
