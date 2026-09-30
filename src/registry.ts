// A TokenSet is a tiny read-only library of interchangeable parts.
// Every axis of the face (colour, eyes, mouth, shape, motion) is one of these,
// so they all get the same get / all / random behaviour for free.

export interface Token {
  /** stable key used in JSON, URLs and commit messages */
  id: string;
  /** human label for UI */
  label: string;
}

export class TokenSet<T extends Token> {
  private readonly byId: Map<string, T>;

  constructor(public readonly kind: string, tokens: readonly T[]) {
    this.byId = new Map(tokens.map((token) => [token.id, token]));
  }

  all(): T[] {
    return [...this.byId.values()];
  }

  get ids(): string[] {
    return [...this.byId.keys()];
  }

  has(id: string): boolean {
    return this.byId.has(id);
  }

  get(id: string): T {
    const token = this.byId.get(id);
    if (!token) {
      throw new Error(`Unknown ${this.kind} token "${id}". Known: ${this.ids.join(', ')}`);
    }
    return token;
  }

  /** Pick one at random. Pass a seeded rng for a mood that is stable per day. */
  random(rng: () => number = Math.random): T {
    const items = this.all();
    return items[Math.floor(rng() * items.length)];
  }

  /** Pick at random but never the one you already have, so a change is visible. */
  randomOther(currentId: string, rng: () => number = Math.random): T {
    const items = this.all().filter((token) => token.id !== currentId);
    if (items.length === 0) return this.get(currentId);
    return items[Math.floor(rng() * items.length)];
  }
}

/** Deterministic rng. seededRandom(20260930) gives the same face all day. */
export function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Turn a date into a seed, so "today's mood" is reproducible. */
export function seedFromDate(date: Date = new Date()): number {
  return Number(
    `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`
  );
}
