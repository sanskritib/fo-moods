import { Token, TokenSet } from '../registry';

export interface MotionToken extends Token {
  /** value written to data-motion, matched by a keyframe rule in index.html */
  animation: string;
  reads: string;
}

export const motions = new TokenSet<MotionToken>('motion', [
  { id: 'buoyant', label: 'Buoyant bounce', animation: 'buoyant', reads: 'light, wants to rise' },
  { id: 'drift', label: 'Slow downward drift', animation: 'drift', reads: 'heavy, giving in to gravity' },
  { id: 'flare', label: 'Tense flare', animation: 'flare', reads: 'pressure looking for an exit' },
  { id: 'tremble', label: 'Small tremble', animation: 'tremble', reads: 'holding still badly' },
  { id: 'pop', label: 'Quick pop', animation: 'pop', reads: 'one sharp expansion' },
  { id: 'recoil', label: 'Recoil', animation: 'recoil', reads: 'moving away from something' }
]);
