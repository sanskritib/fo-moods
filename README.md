# fo moods

A small web app where Fo shows up as a blob instead of a sentence.

## Version one: six core emotions

The first public vocabulary uses six classic core emotions:

| emotion | colour | eyes | outer vector | motion |
| --- | --- | --- | --- | --- |
| happy | warm yellow `#F9C74F` | curved U-shapes | soft, round, gently top-heavy | buoyant bounce |
| sad | muted blue `#577590` | downturned lids | low and weighted | slow drift |
| angry | red `#F94144` | narrow, slanted eyes | taut with points | tense flare |
| fear | violet `#9B5DE5` | wide lifted ovals | contracted and irregular | small tremble |
| surprise | cyan `#00B4D8` | open round eyes | tall and expanded | quick pop |
| disgust | green `#7CB518` | asymmetric narrowed lids | lopsided and recoiling | recoil |

The outer ring is not random. Each emotion has an explicit SVG path in `app.js`, so it redraws consistently. Motion is an independent CSS animation mapped to the same state.

## Next design handoff

Sanskriti can export the final outer-ring SVGs from Figma. Replace each `path` in `app.js` while preserving its `label`, `colour`, `eyes`, and `motion` attributes. This keeps the visual system intact while changing only the art direction.

## Hosting

This repository is static HTML, CSS, and JavaScript. It can deploy on GitHub Pages or any static host without a backend.
