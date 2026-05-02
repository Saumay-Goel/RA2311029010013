"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = exports.setAuthToken = void 0;
const LOG_ENDPOINT = "http://20.207.122.201/evaluation-service/logs";
let AUTH_TOKEN = "";
const setAuthToken = (token) => {
    AUTH_TOKEN = token;
};
exports.setAuthToken = setAuthToken;
const Log = async (stack, level, packageName, message) => {
    const payload = {
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
            process.stderr.write(`[Logging Middleware] Failed: ${response.status}\n`);
        }
    }
    catch (error) {
        process.stderr.write(`[Logging Middleware] Network error: ${String(error)}\n`);
    }
};
exports.Log = Log;
//# sourceMappingURL=index.js.map