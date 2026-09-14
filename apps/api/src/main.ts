import path from "node:path";

import { createApplication } from "./app.js";

const app = await createApplication({
  catalogPath: path.resolve("content-audit/catalog.json"),
  staticRoot: path.resolve("apps/web/dist"),
});
const port = Number(process.env.PORT ?? 4173);
await app.listen(Number.isFinite(port) ? port : 4173, "0.0.0.0");
