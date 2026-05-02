import { Log } from "@/lib/logging_middleware";

export type FrontendPackage =
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style"
  | "auth"
  | "config"
  | "middleware"
  | "utils";

export const logInfo = (pkg: FrontendPackage, message: string): void => {
  void Log("frontend", "info", pkg, message);
};

export const logWarn = (pkg: FrontendPackage, message: string): void => {
  void Log("frontend", "warn", pkg, message);
};

export const logError = (
  pkg: FrontendPackage,
  message: string,
  error?: unknown,
): void => {
  void Log(
    "frontend",
    "error",
    pkg,
    `${message} | Details: ${JSON.stringify(error)}`,
  );
};

export const logDebug = (pkg: FrontendPackage, message: string): void => {
  void Log("frontend", "debug", pkg, message);
};

export const logFatal = (pkg: FrontendPackage, message: string): void => {
  void Log("frontend", "fatal", pkg, message);
};
