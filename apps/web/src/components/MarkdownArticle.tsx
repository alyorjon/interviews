import type { ReactNode } from "react";

type Block =
  | { kind: "heading"; level: number; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "quote"; text: string }
  | { kind: "code"; language: string; text: string }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "table"; rows: string[][] };

function isBlockStart(line: string) {
  return /^\s*(?:```|#{1,6}\s|>|[-*+]\s|\d+[.)]\s|\|)/.test(line);
}

function parse(markdown: string): Block[] {
  const lines = markdown.replace(/\r/g, "").split("\n");
  const blocks: Block[] = [];
  for (let index = 0; index < lines.length;) {
    const line = lines[index] ?? "";
    if (!line.trim()) { index++; continue; }
    const fence = line.match(/^\s*```([^\s]*)/);
    if (fence) { const code: string[] = []; index++; while (index < lines.length && !/^\s*```/.test(lines[index] ?? "")) code.push(lines[index++] ?? ""); if (index < lines.length) index++; blocks.push({ kind: "code", language: fence[1] ?? "", text: code.join("\n") }); continue; }
    const heading = line.match(/^(#{1,6})\s+(.+)/);
    if (heading) { blocks.push({ kind: "heading", level: heading[1]!.length, text: heading[2]! }); index++; continue; }
    if (/^\s*>/.test(line)) { const quote: string[] = []; while (index < lines.length && /^\s*>/.test(lines[index] ?? "")) quote.push((lines[index++] ?? "").replace(/^\s*>\s?/, "")); blocks.push({ kind: "quote", text: quote.join(" ") }); continue; }
    const list = line.match(/^\s*(?:(\d+)[.)]|[-*+])\s+(.+)/);
    if (list) { const ordered = Boolean(list[1]); const items: string[] = []; while (index < lines.length) { const item = (lines[index] ?? "").match(/^\s*(?:(\d+)[.)]|[-*+])\s+(.+)/); if (!item || Boolean(item[1]) !== ordered) break; items.push(item[2]!); index++; } blocks.push({ kind: "list", ordered, items }); continue; }
    if (/^\s*\|/.test(line)) { const rows: string[][] = []; while (index < lines.length && /^\s*\|/.test(lines[index] ?? "")) { const cells = (lines[index++] ?? "").replace(/^\s*\||\|\s*$/g, "").split("|").map(cell => cell.trim()); if (!cells.every(cell => /^:?-{3,}:?$/.test(cell))) rows.push(cells); } blocks.push({ kind: "table", rows }); continue; }
    const paragraph = [line.trim()]; index++; while (index < lines.length && lines[index]?.trim() && !isBlockStart(lines[index] ?? "")) paragraph.push((lines[index++] ?? "").trim()); blocks.push({ kind: "paragraph", text: paragraph.join(" ") });
  }
  return blocks;
}

function inline(text: string): ReactNode[] {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).filter(Boolean).map((part, index) => part.startsWith("`") ? <code key={index}>{part.slice(1, -1)}</code> : part.startsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : part);
}

export function MarkdownArticle({ markdown, title }: { markdown: string; title: string }) {
  return <article className="markdown-article" aria-label={`${title} maqolasi`}><div className="article-heading"><span className="eyebrow">To'liq maqola</span><p>Asl Markdown manbasi xavfsiz o'qish formatida</p></div>{parse(markdown).map((block, index) => {
    if (block.kind === "heading") { const Tag = `h${Math.min(block.level + 1, 6)}` as "h2"; return <Tag key={index}>{inline(block.text)}</Tag>; }
    if (block.kind === "paragraph") return <p key={index}>{inline(block.text)}</p>;
    if (block.kind === "quote") return <blockquote key={index}>{inline(block.text)}</blockquote>;
    if (block.kind === "code") return <pre key={index} data-language={block.language}><code>{block.text}</code></pre>;
    if (block.kind === "table") return <div className="markdown-table-wrap" key={index}><table><tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => rowIndex === 0 ? <th key={cellIndex}>{inline(cell)}</th> : <td key={cellIndex}>{inline(cell)}</td>)}</tr>)}</tbody></table></div>;
    const List = block.ordered ? "ol" : "ul"; return <List key={index}>{block.items.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>)}</List>;
  })}</article>;
}
