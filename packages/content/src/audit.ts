import path from "node:path";

import { writeContentAudit } from "./index.js";

const root = path.resolve(process.argv[2] ?? path.join(import.meta.dirname, "../../.."));
const catalog = await writeContentAudit(root);
process.stdout.write(`${JSON.stringify(catalog.summary)}\n`);
