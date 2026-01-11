/**
 * Regular expression to match email addresses.
 * Format: user\@domain.tld
 */
export const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/;

/**
 * Regular expression to match URLs (http, https, and www).
 */
export const URL_REGEX = /https?:\/\/[^\s]+|www\.[^\s]+/;

/**
 * Regular expression to match user mentions starting with \@.
 * Matches alphanumeric characters and underscores.
 */
export const MENTION_REGEX = /@[a-zA-Z0-9_]+/;

/**
 * Regular expression to match hashtags starting with #.
 * Matches alphanumeric characters and underscores.
 */
export const HASHTAG_REGEX = /#[a-zA-Z0-9_]+/;

/**
 * Global Regex used for splitting task text into identifiable parts.
 * It combines all entity patterns into a single capturing group.
 */
export const TASK_ENTITY_REGEX = new RegExp(
  `(${EMAIL_REGEX.source}|${URL_REGEX.source}|${MENTION_REGEX.source}|${HASHTAG_REGEX.source})`,
  'g'
);