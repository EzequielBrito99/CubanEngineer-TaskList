import { useRef, useEffect, useState } from "react";
import { EMAIL_REGEX, HASHTAG_REGEX, MENTION_REGEX, TASK_ENTITY_REGEX, URL_REGEX } from "@/lib/regex";

interface ColorEditorProps {
  /** The current text value of the editor */
  text: string;
  /** Callback function triggered when the text changes */
  onChange?: (value: string) => void;
  /** Placeholder text displayed when the editor is empty */
  placeholder?: string;
  /** Optional tailwind classes for the container */
  className?: string;
}

/**
 * ColorEditor component with synchronized overlay and auto-managed custom scrollbar.
 * Uses external CSS classes for scrollbar and entity styling.
 */
export const ColorEditor = ({
  text,
  onChange,
  placeholder = "Type @mention or #hashtag...",
  className = ""
}: ColorEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const [textareaHeight, setTextareaHeight] = useState<number | undefined>(undefined);

  /**
   * Synchronizes the scroll position between the highlight layer and the textarea.
   */
  const handleScroll = () => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  /**
   * Updates height and scroll sync whenever the text content changes.
   */
  useEffect(() => {
    handleScroll();
    if (textareaRef.current) {
      // Set height based on content to allow parent container to manage scroll
      setTextareaHeight(textareaRef.current.scrollHeight);
    }
  }, [text]);

  /**
   * Processes text and wraps entities in styled spans based on regex matches.
   */
  const applyColors = (content: string) => {
    const parts = content.split(TASK_ENTITY_REGEX);
    return parts.map((part, i) => {
      if (!part) return null;
      
      if (EMAIL_REGEX.test(part)) return <span key={i} className="text-entity-email-dark">{part}</span>;
      if (MENTION_REGEX.test(part)) return <span key={i} className="text-entity-mention-dark">{part}</span>;
      if (HASHTAG_REGEX.test(part)) return <span key={i} className="text-entity-hashtag-dark">{part}</span>;
      if (URL_REGEX.test(part)) return <span key={i} className="text-entity-link-dark">{part}</span>;
      
      return <span key={i}>{part}</span>;
    });
  };

  /**
   * Shared styling to guarantee identical text wrapping and alignment.
   */
  const sharedStyle: React.CSSProperties = {
    overflowWrap: 'anywhere',
    wordBreak: 'normal',      
    whiteSpace: 'pre-wrap',
  };

  return (
    <div className={`relative group border rounded-md overflow-hidden  ${className}`}>
      {/* Scrollable container with external custom-scrollbar class */}
      <div className="min-h-10 max-h-32 overflow-y-auto custom-scrollbar">
        <div className="relative w-full min-h-full">
          
          {/* BACKGROUND HIGHLIGHT LAYER */}
          <div
            ref={highlightRef}
            style={sharedStyle}
            className="absolute inset-0 pointer-events-none m-0 border-none select-none font-sans text-sm leading-relaxed text-slate-900 overflow-hidden"
            aria-hidden="true"
          >
            {applyColors(text)}
            {text.endsWith('\n') ? ' ' : ''}
          </div>

          {/* INTERACTIVE TEXTAREA LAYER */}
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => onChange?.(e.target.value)}
            onScroll={handleScroll}
            style={{ ...sharedStyle, height: textareaHeight }}
            className="relative w-full bg-transparent border-none focus:ring-0 resize-none m-0 text-transparent caret-black outline-none font-sans text-sm leading-relaxed block overflow-hidden"
            placeholder={placeholder}
            spellCheck={false}
            rows={1}
          />
        </div>
      </div>
    </div>
  );
};