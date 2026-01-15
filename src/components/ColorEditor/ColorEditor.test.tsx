import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ColorEditor } from "./ColorEditor";
import "@testing-library/jest-dom";

describe("ColorEditor", () => {
  it("should render placeholder when text is empty", () => {
    render(<ColorEditor text="" placeholder="Type something..." />);
    expect(screen.getByPlaceholderText("Type something...")).toBeInTheDocument();
  });

  /**
   * Helper to find text inside the highlight layer, ignoring the textarea
   */
  const getHighlightedText = (text: string) => {
    return screen.getAllByText(text).find(el => el.tagName === 'SPAN');
  };

  it("should apply correct class for mentions", () => {
    render(<ColorEditor text="Hello @user" />);
    const mention = getHighlightedText("@user");
    expect(mention).toBeDefined();
    expect(mention).toHaveClass("text-entity-mention-dark");
  });

  it("should apply correct class for hashtags", () => {
    render(<ColorEditor text="An important #topic" />);
    const hashtag = getHighlightedText("#topic");
    expect(hashtag).toBeDefined();
    expect(hashtag).toHaveClass("text-entity-hashtag-dark");
  });

  it("should apply correct class for emails", () => {
    render(<ColorEditor text="mail@test.com" />);
    const email = getHighlightedText("mail@test.com");
    expect(email).toBeDefined();
    expect(email).toHaveClass("text-entity-email-dark");
  });

  it("should apply correct class for links", () => {
    render(<ColorEditor text="Visit https://test.com" />);
    const link = getHighlightedText("https://test.com");
    expect(link).toBeDefined();
    expect(link).toHaveClass("text-entity-link-dark");
  });

  it("should synchronize height on text change", () => {
    const { rerender } = render(<ColorEditor text="Hello" />);
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    Object.defineProperty(textarea, 'scrollHeight', { value: 700, configurable: true });
    rerender(<ColorEditor text="Hello\nNew Line" />);
    expect(textarea.style.height).toBe("700px");
  });

  it("should render plain text without special classes", () => {
    render(<ColorEditor text="Normal text" />);
    const normalTexts = screen.getAllByText("Normal text");
    const spanElement = normalTexts.find(el => el.tagName === "SPAN");    
    expect(spanElement).toBeDefined();
    expect(spanElement).not.toHaveClass("text-entity-mention-dark");
    expect(spanElement).not.toHaveClass("text-entity-hashtag-dark");
  });

  it("should handle text ending with a newline for cursor alignment", () => {
    const { container } = render(<ColorEditor text={"Hello\n"} />);
    const highlightLayer = container.querySelector('[aria-hidden="true"]');
    expect(highlightLayer?.textContent).toContain("Hello\n ");
  });

  it("should return null if part is empty in applyColors", () => {
    const { container } = render(<ColorEditor text="\n\n" />);
    const highlightLayer = container.querySelector('[aria-hidden="true"]');
    expect(highlightLayer).toBeInTheDocument();
  });

  it("should handle mixed content with multiple entities", () => {
    render(<ColorEditor text="Contact @user about #project at mail@test.com" />);
    expect(screen.getAllByText("@user").length).toBeGreaterThan(0);
    expect(screen.getAllByText("#project").length).toBeGreaterThan(0);
    expect(screen.getAllByText("mail@test.com").length).toBeGreaterThan(0);
  });
});