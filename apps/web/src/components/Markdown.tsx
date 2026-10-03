import { memo, type ReactNode } from "react";

import { type Block, parseInline, parseMarkdown } from "../lib/markdown";

const inlineCode = "rounded bg-code px-1.5 py-px font-mono text-[0.9em]";

export function InlineText({ text }: { text: string }): ReactNode {
  return parseInline(text).map((part, index) => {
    switch (part.kind) {
      case "code": return <code key={index} className={inlineCode}>{part.text}</code>;
      case "strong": return <strong key={index} className="font-semibold">{part.text}</strong>;
      case "em": return <em key={index}>{part.text}</em>;
      case "link": return <a key={index} className="text-accent underline-offset-2 hover:underline" href={part.href} target="_blank" rel="noopener noreferrer">{part.text}</a>;
      default: return part.text;
    }
  });
}

const HEADING_CLASS: Record<number, string> = {
  2: "mt-8 text-[19px] font-bold tracking-tight",
  3: "mt-6 text-base font-bold",
  4: "mt-5 text-[15px] font-semibold",
  5: "mt-5 text-[15px] font-semibold",
  6: "mt-5 text-[15px] font-semibold",
};

function renderBlock(block: Block, index: number, headingOffset: number): ReactNode {
  switch (block.kind) {
    case "heading": {
      const level = Math.min(Math.max(block.level + headingOffset, 2), 6);
      const Tag = `h${level}` as "h2";
      return <Tag key={index} className={HEADING_CLASS[level]}><InlineText text={block.text} /></Tag>;
    }
    case "paragraph": return <p key={index}><InlineText text={block.text} /></p>;
    case "quote": return (
      <blockquote key={index} className="rounded-r-lg border-l-3 border-line-strong bg-surface-muted px-3.5 py-2 text-muted">
        <InlineText text={block.text} />
      </blockquote>
    );
    case "rule": return <hr key={index} className="border-line" />;
    case "code": return (
      <pre key={index} data-language={block.language || undefined} tabIndex={0}
        className="overflow-x-auto rounded-xl border border-line bg-code px-4 py-3.5 text-[13px] leading-relaxed">
        <code className="font-mono whitespace-pre">{block.text}</code>
      </pre>
    );
    case "table": return (
      <div key={index} tabIndex={0} className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full border-collapse text-sm">
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-line last:border-b-0">
                {row.map((cell, cellIndex) => rowIndex === 0
                  ? <th key={cellIndex} className="bg-surface-muted px-3 py-2 text-left align-top font-semibold"><InlineText text={cell} /></th>
                  : <td key={cellIndex} className="px-3 py-2 align-top"><InlineText text={cell} /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List key={index} className={`space-y-1 pl-5.5 ${block.ordered ? "list-decimal" : "list-disc"}`}>
          {block.items.map((item, itemIndex) => <li key={itemIndex}><InlineText text={item} /></li>)}
        </List>
      );
    }
  }
}

/**
 * `headingOffset` shifts source headings down so a page keeps a single <h1>.
 * Memoised because long articles (100+ KB) are expensive to re-parse.
 */
export const Markdown = memo(function Markdown({ source, headingOffset = 1 }: { source: string; headingOffset?: number }) {
  return (
    <div className="min-w-0 space-y-3 [overflow-wrap:anywhere]">
      {parseMarkdown(source).map((block, index) => renderBlock(block, index, headingOffset))}
    </div>
  );
});
