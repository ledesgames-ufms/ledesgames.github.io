export interface SectionTheme {
  accent: string;
  accentGlow: string;
  bg: string;
}

export type SectionId = 'hero' | 'games' | 'research' | 'institutional' | 'media';

export const THEME = {
  colors: {
    primary: '#0051ff',
    primaryGlow: 'rgba(0, 81, 255, 0.25)',
    primaryHover: '#3373ff',
    background: '#08080A',
    surface: '#0E0E12',
    border: 'rgba(255, 255, 255, 0.1)',
    textMuted: '#9999A5',
  },
  sections: {
    hero: {
      accent: '#0051ff',
      accentGlow: 'rgba(0, 81, 255, 0.25)',
      bg: '#08080A',
    },
    games: {
      accent: '#0051ff',
      accentGlow: 'rgba(0, 81, 255, 0.25)',
      bg: '#0E0E12',
    },
    research: {
      accent: '#0051ff',
      accentGlow: 'rgba(0, 81, 255, 0.25)',
      bg: '#F4F4F6',
    },
    institutional: {
      accent: '#0051ff',
      accentGlow: 'rgba(0, 81, 255, 0.25)',
      bg: '#08080A',
    },
    media: {
      accent: '#0051ff',
      accentGlow: 'rgba(0, 81, 255, 0.25)',
      bg: '#07070B',
    },
  } as Record<SectionId, SectionTheme>,
} as const;
