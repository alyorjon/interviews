import path from "node:path";
import type { Server } from "node:http";

import { createApplication } from "./app.js";

const app = await createApplication({ staticRoot: path.resolve("apps/web/dist") });
const port = Number(process.env.PORT ?? 4173);
await app.listen(Number.isFinite(port) ? port : 4173, "0.0.0.0");

// Load balancers (Cloudflare, ALB, nginx) reuse idle upstream connections for
// ~60s. Keeping Node's timeouts above that prevents sporadic 502s on reuse.
const server = app.getHttpServer() as Server;
server.keepAliveTimeout = 65_000;
server.headersTimeout = 66_000;
