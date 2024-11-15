import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z
    .string()
    .min(1)
    .transform(Number)
    .refine((value) => value > 0),
  CLIENT_URL: z.string().url(),
});

const { PORT, CLIENT_URL } = envSchema.parse(process.env);

export const GENERAL_CONFIG = {
  PORT,
  CLIENT_URL,
};
