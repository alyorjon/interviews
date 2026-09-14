import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { CatalogCard } from "@interviews/content";
import { StudyCard } from "../src/components/StudyCard";

const card = {
  id: "card-1", fingerprint: "one", question: "React state nima?", answer: "Asl javob",
  expandedQuestion: "Frontend\n\nReact state nima?", expandedAnswer: "Komponentning o'zgaruvchan holati.",
  enrichment: { questionContext: "Frontend", answerSummary: "Komponent holati", answerDetail: "Renderni yangilaydi", groundingFragments: [] },
  sourceGrounded: true, needsSource: false, options: [], quality: { score: 8, label: "yetuk", reasons: ["aniq va amaliy"] },
  metadata: { difficulty: "intermediate", tags: ["react"], keyPoint: "Komponent holati", followUp: "Qachon context kerak?", commonMistake: "State'ni mutatsiya qilish" },
  sources: [{ sourcePath: "javascript/react.md", question: "React state nima?", line: 12 }]
} satisfies CatalogCard;

it("keeps the answer hidden until Enter or Space activates the focused eye button", async () => {
  const user = userEvent.setup();
  render(<StudyCard card={card} confidence={undefined} onConfidence={() => undefined} />);
  expect(screen.queryByText("Komponentning o'zgaruvchan holati.")).not.toBeInTheDocument();
  const reveal = screen.getByRole("button", { name: /javobni ko'rish/i });
  expect(reveal).toHaveAttribute("aria-expanded", "false");
  reveal.focus();
  await user.keyboard("{Enter}");
  expect(screen.getByText("Komponentning o'zgaruvchan holati.")).toBeVisible();
  expect(reveal).toHaveAttribute("aria-expanded", "true");
  await user.keyboard(" ");
  expect(screen.queryByText("Komponentning o'zgaruvchan holati.")).not.toBeInTheDocument();
});
