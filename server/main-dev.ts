import { Api } from "./api";
import { Server } from "./server";

// Create our server
const server = new Server();

// Create a handler and register it
const handler = new Api();
server.registerConnections(handler);

// Start the server
server.start();
