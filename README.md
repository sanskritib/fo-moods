# fo moods

A small web app where Fo shows up as a blob instead of a sentence.

## The rules

Three axes, 0 to 1. No emotion is picked from a list - the mix *is* the emotion.

| axis | what it drives |
| --- | --- |
| `energy` | colour saturation, how stretched the blob is, how open the eyes are |
| `certainty` | edge quality: 1 is crisp, 0 is blurred and lumpy |
| `warmth` | hue, from cool blue (0) to amber (1) |

Eye shape falls out of the same numbers:

- `certainty < 0.4` -> dots
- `energy > 0.72` -> alert ovals
- `energy < 0.34` -> lidded
- `warmth > 0.64` -> squint
- otherwise -> round

Blob shape is generated from a seeded wobble, so the same date and name always redraw the same blob, and lower certainty means a lumpier outline.

## Adding a mood

Append to `moods.json`:

```json
{ "date": "2026-10-01", "name": "quietly pleased", "energy": 0.4, "certainty": 0.8, "warmth": 0.75, "note": "one line, optional" }
```

Fo appends one entry a day. To use the Figma blobs, replace `blobPath()` with the exported paths and keep the same axis inputs.
