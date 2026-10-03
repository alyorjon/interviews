/*
 * A deliberately small Markdown subset. Output is plain data rendered by React,
 * so raw HTML in sources is shown as text and never executed.
 */
export type Block =
  | { kind: "heading"; level: number; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "quote"; text: string }
  | { kind: "code"; language: string; text: string }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "table"; rows: string[][] }
  | { kind: "rule" };

export type Inline =
  | { kind: "text"; text: string }
  | { kind: "code"; text: string }
  | { kind: "strong"; text: string }
  | { kind: "em"; text: string }
  | { kind: "link"; text: string; href: string };

const FENCE = /^\s{0,3}(`{3,}|~{3,})\s*([^\s`]*)/;
const LIST_ITEM = /^\s*(?:(\d+)[.)]|[-*+])\s+(.+)/;
const RULE = /^\s{0,3}(?:-{3,}|\*{3,}|_{3,})\s*$/;

function isBlockStart(line: string): boolean {
  return FENCE.test(line) || RULE.test(line) || /^\s*(?:#{1,6}\s|>|\|)/.test(line) || LIST_ITEM.test(line);
}

export function parseMarkdown(markdown: string): Block[] {
  const lines = markdown.replace(/\r/g, "").split("\n");
  const blocks: Block[] = [];
  let index = 0;
  const at = (position: number) => lines[position] ?? "";
  while (index < lines.length) {
    const line = at(index);
    if (!line.trim()) { index++; continue; }

    const fence = line.match(FENCE);
    if (fence) {
      const marker = fence[1]!;
      const code: string[] = [];
      index++;
      while (index < lines.length && !at(index).trimStart().startsWith(marker)) code.push(at(index++));
      index++;
      blocks.push({ kind: "code", language: fence[2] ?? "", text: code.join("\n") });
      continue;
    }
    if (RULE.test(line)) { blocks.push({ kind: "rule" }); index++; continue; }

    const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (heading) { blocks.push({ kind: "heading", level: heading[1]!.length, text: heading[2]! }); index++; continue; }

    if (/^\s*>/.test(line)) {
      const quote: string[] = [];
      while (index < lines.length && /^\s*>/.test(at(index))) quote.push(at(index++).replace(/^\s*>\s?/, ""));
      blocks.push({ kind: "quote", text: quote.join(" ") });
      continue;
    }

    const list = line.match(LIST_ITEM);
    if (list) {
      const ordered = Boolean(list[1]);
      const items: string[] = [];
      while (index < lines.length) {
        const item = at(index).match(LIST_ITEM);
        if (item && Boolean(item[1]) === ordered) { items.push(item[2]!); index++; continue; }
        // Indented continuation lines belong to the previous item.
        if (items.length && /^\s{2,}\S/.test(at(index)) && !isBlockStart(at(index))) { items[items.length - 1] += ` ${at(index++).trim()}`; continue; }
        break;
      }
      blocks.push({ kind: "list", ordered, items });
      continue;
    }

    if (/^\s*\|/.test(line)) {
      const rows: string[][] = [];
      while (index < lines.length && /^\s*\|/.test(at(index))) {
        const cells = at(index++).trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
        if (!cells.every((cell) => /^:?-{2,}:?$/.test(cell))) rows.push(cells);
      }
      blocks.push({ kind: "table", rows });
      continue;
    }

    const paragraph = [line.trim()];
    index++;
    while (index < lines.length && at(index).trim() && !isBlockStart(at(index))) paragraph.push(at(index++).trim());
    blocks.push({ kind: "paragraph", text: paragraph.join(" ") });
  }
  return blocks;
}

// Link targets may contain one level of parentheses, e.g. wiki URLs or `javascript:alert(1)`.
const LINK_TARGET = String.raw`\((?:[^()\s]|\([^()\s]*\))+\)`;
const INLINE = new RegExp(String.raw`(` + "`[^`]+`" + String.raw`|\*\*[^*]+\*\*|__[^_]+__|\[[^\]]+\]` + LINK_TARGET + String.raw`|(?<![\w*])\*[^*\s][^*]*\*(?!\w)|(?<!\w)_[^_\s][^_]*_(?!\w))`, "g");

function safeHref(href: string): string | undefined {
  try {
    const url = new URL(href, "https://example.invalid");
    return url.protocol === "https:" || url.protocol === "http:" ? href : undefined;
  } catch {
    return undefined;
  }
}

export function parseInline(text: string): Inline[] {
  const clean = text.replace(/<\/?(?:br|b|i|strong|em|span|div|p|sup|sub|u|details|summary)[^>]*>/gi, " ");
  return clean.split(INLINE).filter(Boolean).map((part): Inline => {
    if (part.startsWith("`") && part.endsWith("`") && part.length > 1) return { kind: "code", text: part.slice(1, -1) };
    if (/^(\*\*|__).+\1$/.test(part)) return { kind: "strong", text: part.slice(2, -2) };
    const link = part.match(/^\[([^\]]+)\]\((.+)\)$/);
    if (link) {
      const href = safeHref(link[2]!);
      return href && /^https?:/i.test(href) ? { kind: "link", text: link[1]!, href } : { kind: "text", text: link[1]! };
    }
    if (/^([*_]).+\1$/.test(part)) return { kind: "em", text: part.slice(1, -1) };
    return { kind: "text", text: part };
  });
}
