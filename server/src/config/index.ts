import dotenv from "dotenv";

dotenv.config();

const { PORT, CLIENT_URL } = process.env;

export const GENERAL_CONFIG = {
  PORT: Number(PORT),
  CLIENT_URL,
};
