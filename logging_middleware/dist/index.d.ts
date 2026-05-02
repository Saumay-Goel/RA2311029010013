type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";
type FrontendPackage = "api" | "component" | "hook" | "page" | "state" | "style" | "auth" | "config" | "middleware" | "utils";
type BackendPackage = "cache" | "controller" | "cron_job" | "db" | "domain" | "handler" | "repository" | "route" | "service" | "auth" | "config" | "middleware" | "utils";
type LogPackage = FrontendPackage | BackendPackage;
export interface LogPayload {
    stack: "frontend" | "backend";
    level: LogLevel;
    package: LogPackage;
    message: string;
}
export declare const setAuthToken: (token: string) => void;
export declare const Log: (stack: "frontend" | "backend", level: LogLevel, packageName: LogPackage, message: string) => Promise<void>;
export {};
//# sourceMappingURL=index.d.ts.map