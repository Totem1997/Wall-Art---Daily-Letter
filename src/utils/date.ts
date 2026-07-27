import lettersData from '../data/LetterBody.json';
import themesData from '../data/Theme.json';
import headerTextData from '../data/HeaderText.json';
import { Letter, ThemeConfig } from '../types';

// Format current date e.g. "Monday, July 28, 2025" or "July 28, 2025"
export function getFormattedDate(date = new Date()): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export function getDayOfWeek(date = new Date()): string {
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

// Get day of year number (1-366)
function getDayOfYear(date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// Get deterministic daily letter based on date
export function getTodayLetter(date = new Date()): Letter {
  const dayOfYear = getDayOfYear(date);
  const index = (dayOfYear - 1) % lettersData.length;
  return lettersData[index] || lettersData[0];
}

// Get letter by ID
export function getLetterById(id: number): Letter {
  return lettersData.find(l => l.id === id) || lettersData[0];
}

// Get deterministic theme based on date or custom preference
export function getTodayTheme(customThemeId?: string, date = new Date()): ThemeConfig {
  if (customThemeId) {
    const found = themesData.find(t => t.id === customThemeId);
    if (found) return found as ThemeConfig;
  }
  const dayOfYear = getDayOfYear(date);
  const index = (dayOfYear - 1) % themesData.length;
  return (themesData[index] || themesData[0]) as ThemeConfig;
}

// Get header tagline for envelope screen
export function getTodayHeaderTagline(date = new Date()): string {
  const dayOfYear = getDayOfYear(date);
  const index = dayOfYear % headerTextData.length;
  return headerTextData[index] || headerTextData[0];
}

// Get randomized warm handwritten signature
const SIGNATURES = [
  "With warmth, A Friend",
  "With love, Your Daily Letter ♡",
  "Thinking of you, A Friend",
  "With gentle care, Your Companion",
  "Always here, A Quiet Voice"
];

export function getRandomSignature(date = new Date()): string {
  const dayOfYear = getDayOfYear(date);
  const index = dayOfYear % SIGNATURES.length;
  return SIGNATURES[index];
}
