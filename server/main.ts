import { APP_BASE_HREF } from "@angular/common";
import { CommonEngine } from "@angular/ssr";
import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import bootstrap from "../src/main.server";

import { Api } from "./api";
import { Server } from "./server";

// Create our server
const server = new Server({ port: 8080 });

// Create a handler and register it
const handler = new Api();
server.registerConnections(handler);

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, "../../browser");
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

// Start the server
server.start();
