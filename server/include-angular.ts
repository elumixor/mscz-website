import express from "express";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Server } from "./server";

export async function includeAngular(server: Server) {
    const { APP_BASE_HREF } = await import("@angular/common");
    const { CommonEngine } = await import("@angular/ssr");
    const { default: bootstrap } = await import("../src/main.server");

    const serverDistFolder = dirname(fileURLToPath(import.meta.url));
    const browserDistFolder = resolve(serverDistFolder, "../browser");
    const indexHtml = join(serverDistFolder, "index.server.html");

    const commonEngine = new CommonEngine();

    server.server.set("view engine", "html");
    server.server.set("views", browserDistFolder);

    server.server.use(express.static("server/public"));
    server.server.use(express.static(browserDistFolder));

    // Serve static files from /browser
    server.server.get(
        "*.*",
        express.static(browserDistFolder, {
            maxAge: "1y",
        }),
    );

    // All regular routes use the Angular engine
    server.server.get("*", (req, res, next) => {
        const { protocol, originalUrl, baseUrl, headers } = req;

        commonEngine
            .render({
                bootstrap,
                documentFilePath: indexHtml,
                url: `${protocol}://${headers.host}${originalUrl}`,
                publicPath: browserDistFolder,
                providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
            })
            .then((html) => res.send(html))
            .catch((err) => next(err));
    });
}
