import path from "node:path";

import { writeContentAudit } from "./index.js";
import { writeStaticBundle } from "./static-bundle.js";

const root = path.resolve(process.argv[2] ?? path.join(import.meta.dirname, "../../.."));
const staticOutput = path.resolve(process.argv[3] ?? path.join(root, "apps/web/public/data"));
const catalog = await writeContentAudit(root);
const manifest = await writeStaticBundle(catalog, staticOutput);
process.stdout.write(`${JSON.stringify({ ...catalog.summary, staticVersion: manifest.version, topics: manifest.topics.length })}\n`);
