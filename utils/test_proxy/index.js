import { log } from "node:console";
import https from "node:https";
import { ProxyAgent } from "proxy-agent";

const HTTP_TIMEOUT = 3000;

function createRequest(method, hostname, path, body, reqOptions = {}) {
    reqOptions = {
        headers: undefined,
        port: 443,
        timeout: HTTP_TIMEOUT,
        ...reqOptions,
    };

    return new Promise((_resolve, _reject) => {
        const options = {
            ...reqOptions,
            hostname,
            path,
            method,
        };

        const startTime = performance.now();

        let tResetId = null;

        let responseBody = null;
        let chunkCount = 0;
        let chunkReceivedTime = 0;
        let code = 0;

        const _finally = (e) => {
            clearTimeout(tResetId);

            const endTime = performance.now();

            const duration = endTime - startTime;

            log({
                ...options,
                agent: undefined,
                useProxy: !!options.agent,
                reason: e?.message,
                body,
                response: responseBody,
                chunks: {
                    count: chunkCount,
                    lastReceivedAt: chunkReceivedTime,
                },
                total: {
                    duration,
                    bytes: responseBody?.length || 0,
                },
            });
        };

        const resolve = (resolveData) => {
            _finally();

            _resolve(resolveData);
        };

        const reject = async (e) => {
            _finally(e);

            _reject(e);
        };

        log(`[Req][${method.toUpperCase()} https://${hostname}${path}]`);

        log(`[Req][Body]`, body);

        const req = https.request(options);

        tResetId = setTimeout(() => {
            req.destroy(new Error("Hard timeout"));
        }, reqOptions.timeout * 2);

        req.on("response", (res) => {
            res.setEncoding("utf8");
            res.setTimeout(0);

            // Build JSON string from response chunks.
            res.on("data", (chunk) => {
                chunkCount++;
                responseBody = (responseBody ?? "") + chunk;

                chunkReceivedTime = performance.now() - startTime;
            });

            res.on("aborted", () => {
                reject(new Error("aborted"));
            });

            res.on("end", async () => {
                const headers = res.headers;

                code = res.statusCode;

                log(`[Resp][Code: ${code}]`);

                if (code === 302 || code === 301) {
                    log(`[Resp][Redirect]`, headers.location);
                }

                resolve([res, responseBody]);
            });
        });

        req.on("timeout", () => {
            req.destroy(new Error("Soft timeout"));
        });

        req.on("error", (e) => {
            reject(e);
        });

        if (body !== null) req.write(body);

        req.end();
    });
}

await createRequest("GET", "icanhazip.com", "/", null, {
    agent: new ProxyAgent(),
});
