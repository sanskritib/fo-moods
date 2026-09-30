import { Token, TokenSet } from '../registry';

export interface ColorToken extends Token {
  /** blob fill */
  hex: string;
  /** face stroke, chosen to stay readable on top of hex */
  ink: string;
  temperature: 'warm' | 'cool' | 'neutral';
  /** what this colour carries on its own, before any face is drawn */
  reads: string;
}

export const colors = new TokenSet<ColorToken>('color', [
  { id: 'saffron', label: 'Saffron', hex: '#F9C74F', ink: '#2C2407', temperature: 'warm', reads: 'open, uncomplicated lift' },
  { id: 'slate', label: 'Slate', hex: '#577590', ink: '#E8F0F5', temperature: 'cool', reads: 'quiet, low energy, settled' },
  { id: 'signal', label: 'Signal', hex: '#F94144', ink: '#300B0D', temperature: 'warm', reads: 'pressure, urgency, heat' },
  { id: 'violet', label: 'Violet', hex: '#9B5DE5', ink: '#1E0E35', temperature: 'cool', reads: 'alert, uncertain, watchful' },
  { id: 'cyan', label: 'Cyan', hex: '#00B4D8', ink: '#062A34', temperature: 'cool', reads: 'sudden, bright, unresolved' },
  { id: 'moss', label: 'Moss', hex: '#7CB518', ink: '#172604', temperature: 'neutral', reads: 'off, sour, pulling away' },
  { id: 'blush', label: 'Blush', hex: '#FF8FA3', ink: '#3A0A14', temperature: 'warm', reads: 'soft, fond, a little exposed' },
  { id: 'sand', label: 'Sand', hex: '#E4C9A0', ink: '#2E2314', temperature: 'neutral', reads: 'flat, steady, nothing much' }
]);
