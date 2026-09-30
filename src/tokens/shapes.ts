import { Token, TokenSet } from '../registry';

export interface ShapeToken extends Token {
  /** outer blob silhouette, 220 x 220 canvas */
  path: string;
  reads: string;
}

// These are the six silhouettes already in the live app. Export them from
// Figma as outer-ring SVGs and paste the d attribute here to replace one.
export const shapes = new TokenSet<ShapeToken>('shape', [
  { id: 'round', label: 'Soft round ring', reads: 'settled and open, nothing sharp', path: 'M110 31 C151 28 183 54 184 98 C187 144 157 183 111 188 C65 191 31 159 33 111 C30 66 67 34 110 31 Z' },
  { id: 'weighted', label: 'Low weighted ring', reads: 'mass has sunk to the bottom', path: 'M110 42 C151 41 181 65 177 109 C173 158 145 187 105 180 C63 174 36 147 43 103 C49 61 72 41 110 42 Z' },
  { id: 'spiked', label: 'Taut pointed ring', reads: 'contained force, edges gone sharp', path: 'M110 27 L145 43 C170 42 190 69 179 97 L190 127 C178 153 156 181 125 178 L97 191 L65 172 C37 165 29 132 40 105 L32 76 L58 50 L83 42 Z' },
  { id: 'contracted', label: 'Contracted irregular ring', reads: 'pulling inward in places, unsettled', path: 'M109 34 C143 25 176 49 177 80 C194 104 176 126 179 151 C159 174 137 184 110 179 C84 190 55 171 45 146 C31 122 45 101 40 77 C55 47 79 28 109 34 Z' },
  { id: 'tall', label: 'Tall expanded ring', reads: 'stretched upward mid-reaction', path: 'M110 20 C147 23 172 57 169 91 C187 124 162 185 110 198 C58 185 33 124 51 91 C48 57 73 23 110 20 Z' },
  { id: 'lopsided', label: 'Lopsided ring', reads: 'off balance, leaning away', path: 'M109 34 C152 30 180 52 183 93 C191 132 162 175 123 183 C91 197 48 175 38 138 C29 108 49 79 52 56 C71 36 88 32 109 34 Z' }
]);
