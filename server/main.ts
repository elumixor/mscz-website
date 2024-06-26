import chalk from "chalk";
import { Api } from "./api";
import { Server } from "./server";

async function run() {
    // Create our server
    const port = process.env["NG_DEV"] ? 4000 : 8080;
    const server = new Server({ port });

    // Create a handler and register it
    const handler = new Api();
    server.registerConnections(handler);

    // Include angular stuff, but not in dev mode
    if (!process.env["NG_DEV"]) {
        const { includeAngular } = await import("./include-angular");
        await includeAngular(server);
    } else {
        // eslint-disable-next-line no-console
        console.log(chalk.yellow("[DEV MODE]: Skipping Angular SSR"));
    }

    // Start the server
    server.start();
}

void run();
