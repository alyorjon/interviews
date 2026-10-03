const LEADING_DECORATION = /^(?:[\p{Extended_Pictographic}\p{Regional_Indicator}️‍]+\s*)+/u;

/** Suffix segments that only advertise the format, not the subject. */
const BOILERPLATE = /^(?:\d+\s+)?(?:(?:Real-World|Real|Most Popular)\s+)?(?:Interview\s+)?(?:Questions?|Problems)(?:\s*&\s*(?:Answers|Theory))?$|Bilingual|Ikki tilli|Self-Test|^Savol va Javoblar$|^Theory & /i;

/**
 * "🟩 2. JavaScript Backend (Node.js) — Real-World Interview Questions" ->
 * "JavaScript Backend (Node.js)", while "Python — YouTube Intervyu Savol-Javoblari"
 * keeps its distinguishing suffix.
 */
export function shortTitle(title: string): string {
  const plain = title.replace(LEADING_DECORATION, "").replace(/^\d+\.\s+/, "").trim();
  const segments = plain.split(/\s+[—|]\s+/).filter((segment, index) => index === 0 || !BOILERPLATE.test(segment.trim()));
  return segments.join(" — ");
}

/**
 * Many sources write questions bilingually: "What is X? | X nima?" or
 * "X nima? / What is X?". Returns the halves so the UI can show one as the
 * heading and the other as a quiet translation instead of one long line.
 */
export function splitBilingual(question: string): [string, string?] {
  const pipe = question.split(/\s+\|\s+/);
  if (pipe.length === 2 && pipe[0] && pipe[1]) return [pipe[0], pipe[1]];
  const slash = question.split(/\s+\/\s+/);
  if (slash.length === 2 && slash[0] && slash[1]) {
    const [left, right] = slash;
    const sentence = /[?.!]$/.test(left);
    const words = (text: string) => text.trim().split(/\s+/).length;
    if (sentence || (words(left) >= 3 && words(right) >= 3)) return [left, right];
  }
  return [question];
}
