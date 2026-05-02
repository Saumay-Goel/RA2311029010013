/**
 * @param stack
 * @param level
 * @param packageName
 * @param message
 */
export const Log = async (stack, level, packageName, message) => {
    const payload = {
        stack: stack,
        level: level,
        package: packageName,
        message: message,
    };
    try {
        const response = await fetch("http://20.207.122.201/evaluation-service/log", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer YOUR_ACCESS_TOKEN`,
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            console.warn(`[Logging Middleware] Remote logging failed with status: ${response.status}`);
        }
    }
    catch (error) {
        console.error("[Logging Middleware] Network error while sending log:", error);
    }
};
//# sourceMappingURL=index.js.map