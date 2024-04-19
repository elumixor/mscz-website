import { Api } from "./api";
import { Server } from "./server";

// Create our server
const server = new Server({ port: 4000 });

// Create a handler and register it
const handler = new Api();
server.registerConnections(handler);

// Start the server
server.start();
