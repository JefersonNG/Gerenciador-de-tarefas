import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number() || 3000,
  DATABASE_URL: z.string(),
  SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
