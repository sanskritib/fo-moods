# Mood attributes

A face is five independent choices. Nothing inherits from anything; a mood is
just one token picked off each axis, so the parts all fit together and a new
feeling is a new arrangement rather than new code.

| Axis | Type | Token ids | What it carries |
| --- | --- | --- | --- |
| Colour | `ColorToken` | saffron, blush, slate, signal, violet, cyan, moss, fern, sand | Temperature and intensity, read before any shape registers. Also carries the family |
| Eyes | `EyeToken` | arched, downturned, slanted, wide, round, asymmetric, sleepy, wink | The specific emotion. Does most of the work |
| Mouth | `MouthToken` | grin, frown, flat, small, oh, wavy, smirk | Confirms or undercuts the eyes |
| Shape | `ShapeToken` | round, weighted, spiked, contracted, tall, lopsided | Body language: where the mass sits, how sharp the edges are |
| Motion | `MotionToken` | buoyant, drift, flare, tremble, pop, recoil | Energy over time, and the direction it wants to go |

## Families, from the feelings wheel

Colour carries the family, so a shade never drifts away from its core. Seven
cores: happy, sad, angry, fearful, disgusted, surprised, bad.

| Family | Colours | Core preset |
| --- | --- | --- |
| happy | saffron, blush | Happy |
| sad | slate | Sad |
| angry | signal | Angry |
| fearful | violet | Fear |
| surprised | cyan | Surprise |
| disgusted | moss | Disgust |
| bad | fern, sand | Bad |

`bad` is the one the original six missed, and it is the most common register of
an ordinary day: tired, stressed, bored, busy. Not an event, a condition.

## The presets, decomposed

| Mood | Colour | Eyes | Mouth | Shape | Motion |
| --- | --- | --- | --- | --- | --- |
| Happy | saffron | arched | grin | round | buoyant |
| Sad | slate | downturned | frown | weighted | drift |
| Angry | signal | slanted | flat | spiked | flare |
| Fear | violet | wide | small | contracted | tremble |
| Surprise | cyan | round | oh | tall | pop |
| Disgust | moss | asymmetric | wavy | lopsided | recoil |
| Bad | fern | sleepy | flat | weighted | drift |

Ring two lives in `shades` in `src/mood.ts`: proud, playful, content, hopeful,
lonely, vulnerable, despair, rejected, frustrated, jealous, critical, anxious,
insecure, disapproving, hesitant, amazed, startled, confused, tired, stressed,
bored, busy. Each is the same five tokens rearranged.

## Using it

```ts
import { Mood, presets, shades, shadesInFamily } from './src/mood';

// Start from a preset and change one thing
const smugHappy = presets.happy.with({ mouth: 'smirk', eyes: 'wink' });

// Work inside one core
const options = shadesInFamily('sad'); // lonely, vulnerable, despair, rejected

// A stable random face for today, same result all day
const todays = Mood.today();
console.log(JSON.stringify(todays.toJSON()));
```

`Mood.with()` returns a new Mood rather than mutating, so a component can keep
the previous face around for a transition.

## Adding a token

Add one entry to the relevant array in `src/tokens/`. Nothing else changes:
`TokenSet` picks it up for `get`, `all` and `random`, and `MoodBlob` renders it
without knowing what it is. A new blob silhouette from Figma is an outer-ring
SVG export, pasted into the `path` field of a new `ShapeToken`.

The `reads` line on every token is the definition being used when a face is
chosen at random. Rewriting those lines is how the aesthetic gets steered
without touching any logic.
