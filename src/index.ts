import * as dotenv from "dotenv";
import Fastify, { FastifyInstance } from "fastify";
import fastifyNow from "fastify-now";
import path from "path";

dotenv.config();

const server: FastifyInstance = Fastify();

server.register(fastifyNow, {
  routesFolder: path.join(__dirname, "./routes"),
  pathPrefix: "/api/v1",
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start().then(() => {
  console.log("Server started");
});
