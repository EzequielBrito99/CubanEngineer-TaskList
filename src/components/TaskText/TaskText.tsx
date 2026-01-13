import React, { useMemo } from 'react';
import { EmailBadge, LinkBadge, MentionBadge, HashtagBadge } from '../CustomBadges';
import {
  TASK_ENTITY_REGEX,
  EMAIL_REGEX,
  URL_REGEX,
  MENTION_REGEX,
  HASHTAG_REGEX
} from '@/lib/regex';

interface TaskTextProps {
  /** The task content which may include mentions, hashtags, emails, or links */
  text: string;
}

/**
 * Component that formats task text by highlighting mentions, tags, emails, and URLs.
 */
export const TaskText: React.FC<TaskTextProps> = ({ text }) => {

  const renderedContent = useMemo(() => {
    // Centralized Regex to split the content
    const parts = text.split(TASK_ENTITY_REGEX);

    // Counters for dynamic labeling
    let emailCount = 0;
    let linkCount = 0;

    return parts.map((part, index) => {
      if (!part) return null;

      if (EMAIL_REGEX.test(part)) {
        emailCount++;
        return <EmailBadge key={`${index}-${part}`} email={part} label={`Mail ${emailCount}`} />;
      }

      if (URL_REGEX.test(part)) {
        linkCount++;
        return <LinkBadge key={`${index}-${part}`} label={`Link ${linkCount}`} />;
      }

      if (MENTION_REGEX.test(part)) {
        return <MentionBadge key={`${index}-${part}`} label={part} />;
      }

      if (HASHTAG_REGEX.test(part)) {
        return <HashtagBadge key={`${index}-${part}`} label={part} />;
      }

      return part;
    });
  }, [text]);

  return (
    <span className="text-sm text-slate-700 leading-relaxed wrap-break-words whitespace-pre-wrap">
      {renderedContent}
    </span>
  );
};