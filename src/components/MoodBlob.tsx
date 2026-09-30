import React from 'react';
import { Mood } from '../mood';

interface MoodBlobProps {
  mood: Mood;
  size?: number;
}

/**
 * Draws whatever combination it is handed. It knows nothing about happy or sad,
 * which is the point: add a token, and this renders it without changing.
 *
 * The eye and mouth tokens are local constants in src/tokens/face.ts, never user
 * input, so injecting them as markup is safe here.
 */
export function MoodBlob({ mood, size = 220 }: MoodBlobProps) {
  const gradientId = `fill-${mood.id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 220 220"
      role="img"
      aria-label={`${mood.name} blob`}
      data-motion={mood.motion.animation}
      style={mood.toCSSVars() as React.CSSProperties}
    >
      <defs>
        <radialGradient id={gradientId} cx="34%" cy="28%">
          <stop offset="0" stopColor="#fff" stopOpacity=".36" />
          <stop offset=".34" stopColor={mood.color.hex} />
          <stop offset="1" stopColor={mood.color.hex} stopOpacity=".72" />
        </radialGradient>
        <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.25" />
        </filter>
      </defs>

      <path d={mood.shape.path} fill={`url(#${gradientId})`} filter="url(#soft)" />
      <path d={mood.shape.path} fill="none" stroke="#fff" strokeOpacity=".18" strokeWidth="1.5" />

      <g
        fill="none"
        stroke={mood.color.ink}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        dangerouslySetInnerHTML={{ __html: mood.eyes.svg + mood.mouth.svg }}
      />
    </svg>
  );
}
