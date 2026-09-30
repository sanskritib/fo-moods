import { Token, TokenSet } from '../registry';

/** The seven cores of the feelings wheel. Every colour belongs to one. */
export type Family = 'happy' | 'sad' | 'angry' | 'fearful' | 'disgusted' | 'surprised' | 'bad';

export interface ColorToken extends Token {
  /** blob fill */
  hex: string;
  /** face stroke, chosen to stay readable on top of hex */
  ink: string;
  family: Family;
  temperature: 'warm' | 'cool' | 'neutral';
  /** what this colour carries on its own, before any face is drawn */
  reads: string;
}

export const colors = new TokenSet<ColorToken>('color', [
  { id: 'saffron', label: 'Saffron', hex: '#F9C74F', ink: '#2C2407', family: 'happy', temperature: 'warm', reads: 'open, uncomplicated lift' },
  { id: 'blush', label: 'Blush', hex: '#FF8FA3', ink: '#3A0A14', family: 'happy', temperature: 'warm', reads: 'soft, fond, a little exposed' },
  { id: 'slate', label: 'Slate', hex: '#577590', ink: '#E8F0F5', family: 'sad', temperature: 'cool', reads: 'quiet, low energy, settled' },
  { id: 'signal', label: 'Signal', hex: '#F94144', ink: '#300B0D', family: 'angry', temperature: 'warm', reads: 'pressure, urgency, heat' },
  { id: 'violet', label: 'Violet', hex: '#9B5DE5', ink: '#1E0E35', family: 'fearful', temperature: 'cool', reads: 'alert, uncertain, watchful' },
  { id: 'cyan', label: 'Cyan', hex: '#00B4D8', ink: '#062A34', family: 'surprised', temperature: 'cool', reads: 'sudden, bright, unresolved' },
  { id: 'moss', label: 'Moss', hex: '#7CB518', ink: '#172604', family: 'disgusted', temperature: 'neutral', reads: 'off, sour, pulling away' },
  { id: 'fern', label: 'Fern', hex: '#6FB07F', ink: '#10231A', family: 'bad', temperature: 'neutral', reads: 'depleted, stretched thin, running on empty' },
  { id: 'sand', label: 'Sand', hex: '#E4C9A0', ink: '#2E2314', family: 'bad', temperature: 'neutral', reads: 'flat, steady, nothing much happening' }
]);

/** All colours in one family, for picking a shade without leaving the core. */
export function colorsInFamily(family: Family): ColorToken[] {
  return colors.all().filter((color) => color.family === family);
}
