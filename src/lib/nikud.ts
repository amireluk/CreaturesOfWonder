/**
 * Strips Hebrew nikud (vowel points) and cantillation marks from a string.
 * Unicode ranges: U+0591–U+05C7 covers all Hebrew diacritics.
 */
export function stripNikud(text: string): string {
  return text.replace(/[\u0591-\u05C7]/g, "");
}
