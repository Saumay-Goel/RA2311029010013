type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";

type LogPackage =
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style"
  | "auth"
  | "config"
  | "middleware"
  | "utils"
  | "cache"
  | "controller"
  | "cron_job"
  | "db"
  | "domain"
  | "handler"
  | "repository"
  | "route"
  | "service";

export interface LogPayload {
  stack: "frontend" | "backend";
  level: LogLevel;
  package: LogPackage;
  message: string;
}

const LOG_ENDPOINT = "/api/logs";

let AUTH_TOKEN = process.env.NEXT_PUBLIC_EVAL_AUTH_TOKEN ?? "";

export const setAuthToken = (token: string): void => {
  AUTH_TOKEN = token;
};

const internalErr = (msg: string): void => {
  if (
    typeof process !== "undefined" &&
    process.stderr &&
    typeof process.stderr.write === "function"
  ) {
    process.stderr.write(msg + "\n");
  }
};

export const Log = async (
  stack: "frontend" | "backend",
  level: LogLevel,
  packageName: LogPackage,
  message: string,
): Promise<void> => {
  const payload: LogPayload = {
    stack,
    level,
    package: packageName,
    message,
  };

  try {
    const response = await fetch(LOG_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      internalErr(`[Logging Middleware] Failed: ${response.status}`);
    }
  } catch (error) {
    internalErr(`[Logging Middleware] Network error: ${String(error)}`);
  }
};
