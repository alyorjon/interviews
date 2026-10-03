const TOPIC_LABELS: Readonly<Record<string, string>> = {
  ai_engineering: "AI Engineering",
  business_analyst: "Business Analyst",
  data_analitik: "Data Analytics",
  docker: "Docker",
  dsa: "DSA",
  github: "GitHub",
  javascript: "JavaScript",
  mind: "Behavioral",
  odoo: "Odoo",
  practical: "Practical",
  python: "Python",
  resume: "Resume",
  sap: "SAP",
  sql: "SQL",
  system_design: "System Design",
};

const ACRONYMS: Readonly<Record<string, string>> = { ai: "AI", dsa: "DSA", sap: "SAP", sql: "SQL" };

/** Stable, URL-safe topic key derived from the first path segment. */
export function topicId(sourcePath: string): string {
  const firstSegment = sourcePath.replace(/\\/g, "/").split("/")[0] ?? sourcePath;
  return firstSegment.replace(/\.md$/i, "").replace(/_(?:quiz|skills|maslahatlari)$/i, "")
    .toLocaleLowerCase("en-US").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function topicLabel(sourcePath: string): string {
  const key = topicId(sourcePath).replace(/-/g, "_");
  const semantic = TOPIC_LABELS[key];
  if (semantic) return semantic;
  return key.split(/_+/).filter(Boolean)
    .map((word) => ACRONYMS[word] ?? `${word.charAt(0).toLocaleUpperCase("en-US")}${word.slice(1)}`)
    .join(" ");
}
