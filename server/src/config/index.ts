import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(5000),
  CLIENT_URL: z.string().url(),
});

const { PORT, CLIENT_URL } = envSchema.parse(process.env);

export const GENERAL_CONFIG = {
  PORT,
  CLIENT_URL,
};
