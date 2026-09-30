import { Token, TokenSet } from '../registry';

// Eyes and mouths are raw SVG fragments drawn inside one <g> that sets
// stroke colour and width, so a token never hardcodes a colour.
// Canvas is 220 x 220. Eyes sit around y=100, mouths around y=140.

export interface EyeToken extends Token {
  svg: string;
  reads: string;
}

export interface MouthToken extends Token {
  svg: string;
  reads: string;
}

export const eyes = new TokenSet<EyeToken>('eyes', [
  { id: 'arched', label: 'Curved U-shapes', reads: 'warmth, eyes creased by a real smile', svg: '<path d="M68 102 Q79 86 90 102"/><path d="M130 102 Q141 86 152 102"/>' },
  { id: 'downturned', label: 'Downturned lids', reads: 'weight, tiredness, sadness', svg: '<path d="M67 99 Q79 111 91 99"/><path d="M129 99 Q141 111 153 99"/>' },
  { id: 'slanted', label: 'Narrow slanted', reads: 'focus under pressure, anger', svg: '<path d="M65 93 L92 104"/><path d="M128 104 L155 93"/>' },
  { id: 'wide', label: 'Wide lifted ovals', reads: 'fear, being caught off guard', svg: '<ellipse cx="79" cy="101" rx="10" ry="15"/><ellipse cx="141" cy="101" rx="10" ry="15"/>' },
  { id: 'round', label: 'Open round', reads: 'surprise, full attention', svg: '<circle cx="79" cy="96" r="10"/><circle cx="141" cy="96" r="10"/>' },
  { id: 'asymmetric', label: 'Asymmetric narrowed', reads: 'distaste, scepticism', svg: '<path d="M66 101 Q78 109 91 96"/><path d="M129 96 Q142 90 154 98"/>' },
  { id: 'sleepy', label: 'Flat lids', reads: 'drained, unbothered, over it', svg: '<path d="M68 100 L92 100"/><path d="M128 100 L152 100"/>' },
  { id: 'wink', label: 'Wink', reads: 'playful, in on it', svg: '<path d="M68 102 Q79 88 90 102"/><circle cx="141" cy="99" r="9"/>' }
]);

export const mouths = new TokenSet<MouthToken>('mouth', [
  { id: 'grin', label: 'Wide curve up', reads: 'plain happiness', svg: '<path d="M79 127 Q110 155 141 127"/>' },
  { id: 'frown', label: 'Curve down', reads: 'sadness, disappointment', svg: '<path d="M82 139 Q110 120 138 139"/>' },
  { id: 'flat', label: 'Straight line', reads: 'held in, saying nothing', svg: '<path d="M82 142 L138 142"/>' },
  { id: 'small', label: 'Small tight curve', reads: 'nervous, bracing', svg: '<path d="M95 142 Q110 132 125 142"/>' },
  { id: 'oh', label: 'Open circle', reads: 'shock, a sound escaping', svg: '<circle cx="110" cy="139" r="13" fill="none"/>' },
  { id: 'wavy', label: 'Uneven wave', reads: 'disgust, unease', svg: '<path d="M84 142 Q106 132 137 143"/>' },
  { id: 'smirk', label: 'One side lifted', reads: 'amused, slightly smug', svg: '<path d="M84 136 Q110 150 136 130"/>' }
]);
