import { server } from "./server";
import "./database";
const io = require("socket.io")(8080);
import config from "./config";

io.on("connect", () => {
  console.log("new connection");
});

const options = {
  port: config.PORT,
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/",
};

server.start(options, ({ port }) =>
  console.log(`Server listening on port ${port}.`)
);
