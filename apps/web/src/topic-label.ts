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

export function topicLabel(sourcePath: string): string {
  const normalizedPath = sourcePath.replace(/\\/g, "/");
  const firstSegment = normalizedPath.split("/")[0] ?? normalizedPath;
  const key = firstSegment.replace(/\.md$/i, "").replace(/_(?:quiz|skills|maslahatlari)$/i, "").toLocaleLowerCase("en-US");
  const semantic = TOPIC_LABELS[key];
  if (semantic) return semantic;
  return key.split(/[_-]+/).filter(Boolean)
    .map((word) => ACRONYMS[word] ?? `${word.charAt(0).toLocaleUpperCase("en-US")}${word.slice(1)}`)
    .join(" ");
}
