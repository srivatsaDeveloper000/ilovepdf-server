import morgan from "morgan";
import type { Request } from "express";

morgan.token("client_ip", (req: Request) => {
  return req.ip || req.socket.remoteAddress || "unknown";
});

morgan.token("request_body", (req: Request) => {
  return req.method === "GET" ? "-" : "[body omitted]";
});

export const requestLogger = morgan(
  ":method :url | Status :status | IP :client_ip | Time :response-time ms | Size :res[content-length]"
);