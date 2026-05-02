export type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG" | "SUCCESS";

export interface LogPayload {
  stack: string;
  level: LogLevel;
  package: string;
  message: string;
}

/**
 * @param stack
 * @param level
 * @param packageName
 * @param message
 */
export const Log = async (
  stack: string,
  level: LogLevel,
  packageName: string,
  message: string,
): Promise<void> => {
  const payload: LogPayload = {
    stack: stack,
    level: level,
    package: packageName,
    message: message,
  };

  try {
    const response = await fetch(
      "http://20.207.122.201/evaluation-service/log",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_ACCESS_TOKEN`,
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      console.warn(
        `[Logging Middleware] Remote logging failed with status: ${response.status}`,
      );
    }
  } catch (error) {
    console.error(
      "[Logging Middleware] Network error while sending log:",
      error,
    );
  }
};
