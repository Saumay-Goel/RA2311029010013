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
export declare const Log: (stack: string, level: LogLevel, packageName: string, message: string) => Promise<void>;
//# sourceMappingURL=index.d.ts.map