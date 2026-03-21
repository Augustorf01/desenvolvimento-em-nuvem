import type { StringValue } from "ms";

export type BackendEnv = {
  port: number;
  databaseUrl: string;
  jwtSecret: string;
  jwtExpiresIn: StringValue;
  corsOrigin: string;
  dbSynchronize: boolean;
};

const parseBoolean = (value: string | undefined, fallback = false): boolean => {
  if (!value) {
    return fallback;
  }

  return value.toLowerCase() === "true";
};

export const getBackendEnv = (): BackendEnv => ({
  port: Number(process.env.PORT ?? 3001),
  databaseUrl:
    process.env.DATABASE_URL ??
    "postgres://postgres:postgres@localhost:5433/library_cloud",
  jwtSecret: process.env.JWT_SECRET ?? "change-me",
  jwtExpiresIn: (process.env.JWT_EXPIRES_IN ?? "1d") as StringValue,
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  dbSynchronize: parseBoolean(process.env.DB_SYNCHRONIZE, false),
});
