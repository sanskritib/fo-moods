import { seedFromDate, seededRandom } from './registry';
import { ColorToken, Family, colors } from './tokens/colors';
import { EyeToken, MouthToken, eyes, mouths } from './tokens/face';
import { MotionToken, motions } from './tokens/motion';
import { ShapeToken, shapes } from './tokens/shapes';

/** The plain-data form: safe to store in JSON, a commit message or a URL. */
export interface MoodSpec {
  name: string;
  color: string;
  eyes: string;
  mouth: string;
  shape: string;
  motion: string;
  note?: string;
}

/**
 * A Mood is composed, not inherited: five independent tokens plus a name.
 * Nothing is mutated, so `with` always hands back a new Mood.
 */
export class Mood {
  constructor(
    readonly name: string,
    readonly color: ColorToken,
    readonly eyes: EyeToken,
    readonly mouth: MouthToken,
    readonly shape: ShapeToken,
    readonly motion: MotionToken,
    readonly note: string = ''
  ) {}

  static from(spec: MoodSpec): Mood {
    return new Mood(
      spec.name,
      colors.get(spec.color),
      eyes.get(spec.eyes),
      mouths.get(spec.mouth),
      shapes.get(spec.shape),
      motions.get(spec.motion),
      spec.note ?? ''
    );
  }

  /** Mix and match: keep what you like, swap the rest. */
  with(overrides: Partial<MoodSpec>): Mood {
    return Mood.from({ ...this.toJSON(), ...overrides });
  }

  /** Random face. Pass seededRandom(seedFromDate()) for one stable mood per day. */
  static random(rng: () => number = Math.random, overrides: Partial<MoodSpec> = {}): Mood {
    return Mood.from({
      name: 'Unnamed',
      color: colors.random(rng).id,
      eyes: eyes.random(rng).id,
      mouth: mouths.random(rng).id,
      shape: shapes.random(rng).id,
      motion: motions.random(rng).id,
      ...overrides
    });
  }

  static today(date: Date = new Date()): Mood {
    return Mood.random(seededRandom(seedFromDate(date)));
  }

  /** Which core of the feelings wheel this sits under, taken from its colour. */
  get family(): Family {
    return this.color.family;
  }

  /** Stable identity of the combination, independent of the name. */
  get id(): string {
    return [this.color.id, this.eyes.id, this.mouth.id, this.shape.id, this.motion.id].join('-');
  }

  /** Everything the CSS needs, so the component stays free of colour logic. */
  toCSSVars(): Record<string, string> {
    return {
      '--state': this.color.hex,
      '--glow': this.color.hex,
      '--ink': this.color.ink
    };
  }

  toJSON(): MoodSpec {
    return {
      name: this.name,
      color: this.color.id,
      eyes: this.eyes.id,
      mouth: this.mouth.id,
      shape: this.shape.id,
      motion: this.motion.id,
      note: this.note
    };
  }
}

/** Ring one of the wheel: the cores, as compositions. */
export const presets: Record<string, Mood> = {
  happy: Mood.from({ name: 'Happy', color: 'saffron', eyes: 'arched', mouth: 'grin', shape: 'round', motion: 'buoyant', note: 'Warm, open, uncomplicated joy. The base positive state.' }),
  sad: Mood.from({ name: 'Sad', color: 'slate', eyes: 'downturned', mouth: 'frown', shape: 'weighted', motion: 'drift', note: 'Quiet and low energy, weight settling toward the bottom.' }),
  angry: Mood.from({ name: 'Angry', color: 'signal', eyes: 'slanted', mouth: 'flat', shape: 'spiked', motion: 'flare', note: 'High energy held under pressure, edges gone sharp.' }),
  fear: Mood.from({ name: 'Fear', color: 'amber', eyes: 'wide', mouth: 'small', shape: 'contracted', motion: 'tremble', note: 'Alert and uncertain, the eyes doing the reading.' }),
  surprise: Mood.from({ name: 'Surprise', color: 'violet', eyes: 'round', mouth: 'oh', shape: 'tall', motion: 'pop', note: 'One instant of expansion before it resolves.' }),
  disgust: Mood.from({ name: 'Disgust', color: 'moss', eyes: 'asymmetric', mouth: 'wavy', shape: 'lopsided', motion: 'recoil', note: 'A move-away signal, asymmetric rather than angry.' }),
  bad: Mood.from({ name: 'Bad', color: 'fern', eyes: 'sleepy', mouth: 'flat', shape: 'weighted', motion: 'drift', note: 'Not an event, a condition: depleted, stretched, running low.' })
};

export const presetOrder = ['happy', 'sad', 'angry', 'fear', 'surprise', 'disgust', 'bad'] as const;

/**
 * Ring two: named shades. Each one is the same five tokens in a different
 * arrangement, which is the whole argument for composition. Add a word here
 * rather than a new class.
 */
export const shades: Record<string, Mood> = {
  proud: Mood.from({ name: 'Proud', color: 'saffron', eyes: 'arched', mouth: 'smirk', shape: 'tall', motion: 'buoyant' }),
  playful: Mood.from({ name: 'Playful', color: 'blush', eyes: 'wink', mouth: 'smirk', shape: 'round', motion: 'buoyant' }),
  content: Mood.from({ name: 'Content', color: 'sand', eyes: 'arched', mouth: 'flat', shape: 'round', motion: 'drift' }),
  hopeful: Mood.from({ name: 'Hopeful', color: 'saffron', eyes: 'round', mouth: 'small', shape: 'tall', motion: 'buoyant' }),

  lonely: Mood.from({ name: 'Lonely', color: 'slate', eyes: 'downturned', mouth: 'flat', shape: 'contracted', motion: 'drift' }),
  vulnerable: Mood.from({ name: 'Vulnerable', color: 'blush', eyes: 'wide', mouth: 'small', shape: 'contracted', motion: 'tremble' }),
  despair: Mood.from({ name: 'Despair', color: 'slate', eyes: 'sleepy', mouth: 'frown', shape: 'weighted', motion: 'drift' }),
  rejected: Mood.from({ name: 'Rejected', color: 'slate', eyes: 'downturned', mouth: 'small', shape: 'lopsided', motion: 'drift' }),

  frustrated: Mood.from({ name: 'Frustrated', color: 'signal', eyes: 'slanted', mouth: 'wavy', shape: 'spiked', motion: 'tremble' }),
  jealous: Mood.from({ name: 'Jealous', color: 'moss', eyes: 'asymmetric', mouth: 'flat', shape: 'spiked', motion: 'flare' }),
  critical: Mood.from({ name: 'Critical', color: 'sand', eyes: 'slanted', mouth: 'flat', shape: 'lopsided', motion: 'recoil' }),

  anxious: Mood.from({ name: 'Anxious', color: 'amber', eyes: 'wide', mouth: 'small', shape: 'contracted', motion: 'tremble' }),
  insecure: Mood.from({ name: 'Insecure', color: 'amber', eyes: 'downturned', mouth: 'flat', shape: 'contracted', motion: 'tremble' }),

  disapproving: Mood.from({ name: 'Disapproving', color: 'moss', eyes: 'slanted', mouth: 'flat', shape: 'lopsided', motion: 'recoil' }),
  hesitant: Mood.from({ name: 'Hesitant', color: 'moss', eyes: 'wide', mouth: 'small', shape: 'contracted', motion: 'tremble' }),

  amazed: Mood.from({ name: 'Amazed', color: 'cyan', eyes: 'round', mouth: 'grin', shape: 'tall', motion: 'pop' }),
  startled: Mood.from({ name: 'Startled', color: 'cyan', eyes: 'wide', mouth: 'oh', shape: 'spiked', motion: 'pop' }),
  confused: Mood.from({ name: 'Confused', color: 'violet', eyes: 'asymmetric', mouth: 'wavy', shape: 'lopsided', motion: 'tremble' }),

  tired: Mood.from({ name: 'Tired', color: 'fern', eyes: 'sleepy', mouth: 'flat', shape: 'weighted', motion: 'drift' }),
  stressed: Mood.from({ name: 'Stressed', color: 'fern', eyes: 'slanted', mouth: 'small', shape: 'contracted', motion: 'tremble' }),
  bored: Mood.from({ name: 'Bored', color: 'fern', eyes: 'sleepy', mouth: 'flat', shape: 'round', motion: 'drift' }),
  busy: Mood.from({ name: 'Busy', color: 'fern', eyes: 'slanted', mouth: 'flat', shape: 'tall', motion: 'flare' })
};

/** Every shade sitting under one core, the way the wheel groups them. */
export function shadesInFamily(family: Family): Mood[] {
  return Object.values(shades).filter((mood) => mood.family === family);
}
