# Mood attributes

A face is five independent choices. Nothing inherits from anything; a mood is
just one token picked off each axis, so 8 colours x 8 eye sets x 7 mouths x 6
shapes x 6 motions is 16,128 faces from parts that all fit together.

| Axis | Type | Token ids | What it carries |
| --- | --- | --- | --- |
| Colour | `ColorToken` | saffron, slate, signal, violet, cyan, moss, blush, sand | Temperature and intensity, read before any shape registers |
| Eyes | `EyeToken` | arched, downturned, slanted, wide, round, asymmetric, sleepy, wink | The specific emotion. Does most of the work |
| Mouth | `MouthToken` | grin, frown, flat, small, oh, wavy, smirk | Confirms or undercuts the eyes |
| Shape | `ShapeToken` | round, weighted, spiked, contracted, tall, lopsided | Body language: where the mass sits, how sharp the edges are |
| Motion | `MotionToken` | buoyant, drift, flare, tremble, pop, recoil | Energy over time, and the direction it wants to go |

## The six presets, decomposed

| Mood | Colour | Eyes | Mouth | Shape | Motion |
| --- | --- | --- | --- | --- | --- |
| Happy | saffron | arched | grin | round | buoyant |
| Sad | slate | downturned | frown | weighted | drift |
| Angry | signal | slanted | flat | spiked | flare |
| Fear | violet | wide | small | contracted | tremble |
| Surprise | cyan | round | oh | tall | pop |
| Disgust | moss | asymmetric | wavy | lopsided | recoil |

## Using it

```ts
import { Mood, presets } from './src/mood';

// Start from a preset and change one thing
const smugHappy = presets.happy.with({ mouth: 'smirk', eyes: 'wink' });

// A stable random face for today, same result all day
const todays = Mood.today();

// Store or commit it
console.log(JSON.stringify(todays.toJSON()));
```

`Mood.with()` returns a new Mood rather than mutating, so a component can keep
the previous face around for a transition.

## Adding a token

Add one entry to the relevant array in `src/tokens/`. Nothing else changes:
`TokenSet` picks it up for `get`, `all` and `random`, and `MoodBlob` renders it
without knowing what it is. A new blob silhouette from Figma is an outer-ring
SVG export, pasted into the `path` field of a new `ShapeToken`.
