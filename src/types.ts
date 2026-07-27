export interface UserProfile {
  name: string;
  hasOnboarded: boolean;
  meditationMinutes: number;
  openedLetterIds: number[];
  favoriteStamps: string[];
  themeId?: string;
  soundEnabled?: boolean;
}

export interface Letter {
  id: number;
  body: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  primary: string;
  primaryHover: string;
  secondary: string;
  accent: string;
  bg: string;
  cardBg: string;
  envelopeBg: string;
  envelopeFlap: string;
  waxSeal: string;
  waxSealBorder: string;
  botanical: string;
  stampBg: string;
  textColor: string;
}

export interface MeditationItem {
  id: string;
  title: string;
  duration: number;
  durationText: string;
  icon: 'sun' | 'leaf' | 'book' | 'flower' | 'moon' | 'bird';
  bgGradient: string;
  stampColor: string;
  description: string;
  quote: string;
  audioUrl: string;
}

export type ViewScreen = 'welcome' | 'letter' | 'companion' | 'meditation' | 'archive';
