import { Log } from "logging_middleware";

const APP_NAME = "CampusNotificationsFE";

export const logInfo = (stack: string, message: string) => {
  Log(stack, "INFO", APP_NAME, message);
};

export const logError = (stack: string, message: string, error?: unknown) => {
  Log(
    stack,
    "ERROR",
    APP_NAME,
    `${message} | Details: ${JSON.stringify(error)}`,
  );
};
