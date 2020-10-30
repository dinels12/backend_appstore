"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
require("./database");
const io = require("socket.io")(8080);
const config_1 = __importDefault(require("./config"));
io.on("connect", () => {
    console.log("new connection");
});
const options = {
    port: config_1.default.PORT,
    endpoint: "/graphql",
    subscriptions: "/subscriptions",
    playground: "/",
};
server_1.server.start(options, ({ port }) => console.log(`Server listening on port ${port}.`));
