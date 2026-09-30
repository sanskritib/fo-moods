import { seedFromDate, seededRandom } from './registry';
import { ColorToken, colors } from './tokens/colors';
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

/** The six the live app ships with, now expressed as compositions. */
export const presets: Record<string, Mood> = {
  happy: Mood.from({ name: 'Happy', color: 'saffron', eyes: 'arched', mouth: 'grin', shape: 'round', motion: 'buoyant', note: 'Warm, open, uncomplicated joy. The base positive state.' }),
  sad: Mood.from({ name: 'Sad', color: 'slate', eyes: 'downturned', mouth: 'frown', shape: 'weighted', motion: 'drift', note: 'Quiet and low energy, weight settling toward the bottom.' }),
  angry: Mood.from({ name: 'Angry', color: 'signal', eyes: 'slanted', mouth: 'flat', shape: 'spiked', motion: 'flare', note: 'High energy held under pressure, edges gone sharp.' }),
  fear: Mood.from({ name: 'Fear', color: 'violet', eyes: 'wide', mouth: 'small', shape: 'contracted', motion: 'tremble', note: 'Alert and uncertain, the eyes doing the reading.' }),
  surprise: Mood.from({ name: 'Surprise', color: 'cyan', eyes: 'round', mouth: 'oh', shape: 'tall', motion: 'pop', note: 'One instant of expansion before it resolves.' }),
  disgust: Mood.from({ name: 'Disgust', color: 'moss', eyes: 'asymmetric', mouth: 'wavy', shape: 'lopsided', motion: 'recoil', note: 'A move-away signal, asymmetric rather than angry.' })
};

export const presetOrder = ['happy', 'sad', 'angry', 'fear', 'surprise', 'disgust'] as const;
