// fo moods lab - temp page. Every tile reads the same seven states from moods.js,
// so switching mood up top re-skins every library at once.
import { emotions, order, motionKnobs, peepFace, palette, facePaths, buildLottie } from './moods.js';

const PAPER = 'https://cdn.jsdelivr.net/npm/@paper-design/shaders@0.0.81/+esm';
const DOTLOTTIE = 'https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web@0.80.0/+esm';
const MOTION = 'https://cdn.jsdelivr.net/npm/motion@13.5.0/+esm';
const GSAP = 'https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js';
const MORPH = 'https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/MorphSVGPlugin.min.js';
const LOTTIEWEB = 'https://cdn.jsdelivr.net/npm/lottie-web@5.13.0/build/player/lottie.min.js';

let mood = 'happy';
const tiles = [];
const E = () => emotions[mood];
const K = () => motionKnobs[E().animation];

const scripts = {};
function loadScript(src) {
  return scripts[src] ||= new Promise((res, rej) => {
    const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = () => rej(new Error('could not load ' + src));
    document.head.appendChild(s);
  });
}
let gsapReady;
const getGsap = () => gsapReady ||= loadScript(GSAP).then(() => loadScript(MORPH)).then(() => { gsap.registerPlugin(MorphSVGPlugin); return gsap; });

// ---------- small builders ----------
const sizing = { u_fit: 2, u_scale: 1, u_rotation: 0, u_originX: .5, u_originY: .5, u_offsetX: 0, u_offsetY: 0, u_worldWidth: 0, u_worldHeight: 0 };
function blobSvg(id) {
  return `<svg viewBox="0 0 220 220" class="blob-svg" id="${id}" aria-hidden="true">
    <g class="idle"><g class="hit">
      <path class="body" d="${E().path}" fill="${E().color}"/>
      <ellipse cx="86" cy="74" rx="23" ry="15" fill="#fff" opacity=".22"/>
      <g class="face" fill="none" stroke="${E().ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
        ${facePaths(E().face).map(d => `<path d="${d}"/>`).join('')}
      </g>
    </g></g></svg>`;
}
function control(tile, c) {
  const wrap = document.createElement('label'); wrap.className = 'ctl';
  if (c.options) {
    wrap.innerHTML = `<span>${c.label}</span><select>${c.options.map(o => `<option${o === c.value ? ' selected' : ''}>${o}</option>`).join('')}</select>`;
    wrap.querySelector('select').addEventListener('change', ev => { tile.v[c.id] = ev.target.value; tile.update(); });
  } else if (c.button) {
    wrap.innerHTML = `<button type="button" class="mini">${c.label}</button>`;
    wrap.querySelector('button').addEventListener('click', () => c.button(tile));
  } else {
    wrap.innerHTML = `<span>${c.label} <b>${c.value}</b></span><input type="range" min="${c.min}" max="${c.max}" step="${c.step}" value="${c.value}">`;
    wrap.querySelector('input').addEventListener('input', ev => { tile.v[c.id] = +ev.target.value; wrap.querySelector('b').textContent = ev.target.value; tile.update(); });
  }
  tile.v[c.id] = c.value;
  return wrap;
}
function addTile(def) {
  const el = document.createElement('article'); el.className = 'tile' + (def.hero ? ' hero' : '');
  el.innerHTML = `<div class="stage-box"><div class="art"></div><div class="err" hidden></div></div>
    <div class="meta"><p class="num">${def.num}</p><h3>${def.title}</h3>
    <p class="lib">${def.lib}</p>
    <p class="how"><span>Across moods</span>${def.scales}</p>
    <p class="how"><span>Try</span>${def.tryIt}</p>
    <div class="ctls"></div></div>`;
  document.getElementById(def.hero ? 'hero' : 'grid').appendChild(el);
  const tile = { ...def, el, art: el.querySelector('.art'), v: {} };
  (def.controls || []).forEach(c => el.querySelector('.ctls').appendChild(control(tile, c)));
  tile.update = () => { try { tile.ready && def.update(tile, E(), K()); } catch (err) { fail(tile, err); } };
  tiles.push(tile);
  Promise.resolve().then(() => def.init(tile, E(), K())).then(() => { tile.ready = true; tile.update(); }).catch(err => fail(tile, err));
}
function fail(tile, err) {
  console.error(tile.title, err);
  const box = tile.el.querySelector('.err'); box.hidden = false; box.textContent = 'This one did not load: ' + (err && err.message || err);
}

// ---------- 0. the combo ----------
addTile({
  hero: true, num: 'Combo', title: 'Mesh aura + morphing blob',
  lib: 'Paper Shaders + GSAP MorphSVG',
  scales: 'The colour token becomes a five-stop aura and the motion token sets how fast it flows and how the body morphs. Nothing here is drawn per mood.',
  tryIt: 'Hit Tour up top and watch it walk the seven states. This is roughly what the live page could become.',
  controls: [{ id: 'flow', label: 'Aura flow', min: 0, max: 2, step: .1, value: 1 }],
  async init(t) {
    t.art.innerHTML = `<div class="shader fill"></div>${blobSvg('combo-blob')}`;
    const P = await import(PAPER); t.P = P;
    t.mount = new P.ShaderMount(t.art.querySelector('.shader'), P.meshGradientFragmentShader, this.uni(P, E(), K()), undefined, K().speed);
    await getGsap();
  },
  uni(P, e, k) {
    const pal = palette(e.color);
    return { ...sizing, u_colors: ['#0a0a0f', pal[2], pal[1], pal[3], pal[0]].map(P.getShaderColorFromString), u_colorsCount: 5,
      u_distortion: .5 + .5 * k.energy, u_swirl: .15 + .6 * k.energy, u_grainMixer: 0, u_grainOverlay: .06 };
  },
  update(t, e, k) {
    t.mount.setUniforms(this.uni(t.P, e, k)); t.mount.setSpeed(k.speed * t.v.flow);
    morphTo(t.art.querySelector('svg'), e, k, 1);
  }
});

function morphTo(svg, e, k, durMul, easeOverride) {
  const ease = easeOverride && easeOverride !== 'auto' ? easeOverride : k.ease;
  const dur = k.dur * durMul;
  gsap.to(svg.querySelector('.body'), { morphSVG: e.path, fill: e.color, duration: dur, ease });
  const fp = facePaths(e.face);
  svg.querySelectorAll('.face path').forEach((p, i) => gsap.to(p, { morphSVG: fp[i], stroke: e.ink, duration: dur * .8, ease, delay: .05 * i }));
}

// ---------- 1. mesh gradient ----------
addTile({
  num: '01', title: 'Mesh gradient', lib: 'Paper Shaders · Apache-2.0 · zero dependency',
  scales: 'Colour token → four-stop palette. Motion token → speed, distortion and swirl. A new shade only needs a colour.',
  tryIt: 'Push distortion up on Sad and it stops reading as sad. That tells us where the limits are per mood.',
  controls: [{ id: 'speed', label: 'Speed', min: 0, max: 3, step: .1, value: 1 }, { id: 'dist', label: 'Distortion', min: 0, max: 1, step: .05, value: .6 }, { id: 'grain', label: 'Grain', min: 0, max: 1, step: .05, value: .1 }],
  async init(t, e, k) {
    t.art.innerHTML = '<div class="shader fill"></div>';
    t.P = await import(PAPER);
    t.mount = new t.P.ShaderMount(t.art.firstChild, t.P.meshGradientFragmentShader, { ...sizing, u_colors: [[0, 0, 0, 1]], u_colorsCount: 1, u_distortion: .5, u_swirl: .2, u_grainMixer: 0, u_grainOverlay: 0 }, undefined, k.speed);
  },
  update(t, e, k) {
    const P = t.P, pal = palette(e.color);
    t.mount.setUniforms({ ...sizing, u_colors: pal.slice(0, 4).map(P.getShaderColorFromString), u_colorsCount: 4, u_distortion: t.v.dist * (.6 + .6 * k.energy), u_swirl: .1 + .5 * k.energy, u_grainMixer: 0, u_grainOverlay: t.v.grain });
    t.mount.setSpeed(k.speed * t.v.speed);
  }
});

// ---------- 2. metaballs ----------
addTile({
  num: '02', title: 'Metaballs', lib: 'Paper Shaders · Apache-2.0',
  scales: 'Motion token sets how many blobs and how fast. Drift is three slow ones, flare is twelve fast ones, so energy is readable before colour.',
  tryIt: 'Drop the count to 1 and it becomes a single living blob. Could be the avatar itself.',
  controls: [{ id: 'count', label: 'Count (0 = auto)', min: 0, max: 20, step: 1, value: 0 }, { id: 'size', label: 'Size', min: .2, max: 1, step: .05, value: .75 }],
  async init(t, e, k) {
    t.art.innerHTML = '<div class="shader fill"></div>';
    t.P = await import(PAPER);
    t.mount = new t.P.ShaderMount(t.art.firstChild, t.P.metaballsFragmentShader, this.uni(t, e, k), undefined, k.speed);
  },
  uni(t, e, k) {
    const P = t.P, pal = palette(e.color);
    return { ...sizing, u_fit: 1, u_colorBack: P.getShaderColorFromString('#0d0c14'), u_colors: [pal[0], pal[1], pal[3]].map(P.getShaderColorFromString), u_colorsCount: 3,
      u_count: t.v.count || k.balls, u_size: t.v.size ?? .75, u_noiseTexture: P.getShaderNoiseTexture() };
  },
  update(t, e, k) { t.mount.setUniforms(this.uni(t, e, k)); t.mount.setSpeed(k.speed); }
});

// ---------- 3. grain gradient ----------
addTile({
  num: '03', title: 'Grain gradient', lib: 'Paper Shaders · Apache-2.0',
  scales: 'Same palette, but softness rises as energy drops, so low moods read hazier and high moods read sharper.',
  tryIt: 'Switch the form to sphere or ripple. Sphere on Bad looks like a tired little planet.',
  controls: [{ id: 'shape', label: 'Form', options: ['blob', 'sphere', 'ripple', 'wave', 'corners', 'dots', 'truchet'], value: 'blob' }, { id: 'noise', label: 'Noise', min: 0, max: 1, step: .05, value: .3 }],
  async init(t, e, k) {
    t.art.innerHTML = '<div class="shader fill"></div>';
    t.P = await import(PAPER);
    t.mount = new t.P.ShaderMount(t.art.firstChild, t.P.grainGradientFragmentShader, this.uni(t, e, k), undefined, k.speed);
  },
  uni(t, e, k) {
    const P = t.P, pal = palette(e.color);
    return { ...sizing, u_fit: 1, u_colorBack: P.getShaderColorFromString('#0d0c14'), u_colors: [pal[2], pal[1], pal[0]].map(P.getShaderColorFromString), u_colorsCount: 3,
      u_softness: .45 + (1 - k.energy) * .5, u_intensity: .2 + k.energy * .55, u_noise: t.v.noise ?? .3,
      u_shape: P.GrainGradientShapes[t.v.shape || 'blob'], u_noiseTexture: P.getShaderNoiseTexture() };
  },
  update(t, e, k) { t.mount.setUniforms(this.uni(t, e, k)); t.mount.setSpeed(k.speed); }
});

// ---------- 4. dotLottie, generated from tokens ----------
addTile({
  num: '04', title: 'Lottie, generated from tokens', lib: 'dotLottie web player · MIT · ~500kb engine on first load',
  scales: 'One generator writes a Lottie file from the tokens: silhouette, face, colour and motion keyframes. All 22 shades become 22 files from code, no After Effects.',
  tryIt: 'Download the file and open it in LottieFiles to hand-tune one, then drop it back in.',
  controls: [{ id: 'amp', label: 'Amplitude', min: 0, max: 2.5, step: .1, value: 1 }, { id: 'speed', label: 'Speed', min: .25, max: 3, step: .25, value: 1 },
    { label: 'Download .json', button: t => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(buildLottie(E(), t.v.amp))], { type: 'application/json' })); a.download = `fo-${mood}.json`; a.click(); } }],
  async init(t, e, k) {
    t.art.innerHTML = '<canvas class="fill" width="520" height="520"></canvas><p class="badge"></p>';
    const { DotLottie } = await import(DOTLOTTIE);
    t.player = new DotLottie({ canvas: t.art.querySelector('canvas'), data: buildLottie(e, 1), loop: true, autoplay: true });
  },
  update(t, e) {
    const data = buildLottie(e, t.v.amp);
    t.player.load({ data, loop: true, autoplay: true, speed: t.v.speed });
    t.art.querySelector('.badge').textContent = `${(JSON.stringify(data).length / 1024).toFixed(1)} kb file`;
  }
});

// ---------- 5. lottie-web, same file ----------
addTile({
  num: '05', title: 'Same Lottie, lighter player', lib: 'lottie-web · MIT · ~70kb gzipped, renders SVG',
  scales: 'Plays the exact file tile 04 generates. Output is real SVG, so CSS can still style it.',
  tryIt: 'Compare it side by side with 04. If they look the same, the lighter player wins.',
  controls: [{ id: 'amp', label: 'Amplitude', min: 0, max: 2.5, step: .1, value: 1 }],
  async init(t) { t.art.innerHTML = '<div class="lw fill"></div>'; await loadScript(LOTTIEWEB); },
  update(t, e) {
    t.anim && t.anim.destroy();
    t.anim = lottie.loadAnimation({ container: t.art.firstChild, renderer: 'svg', loop: true, autoplay: true, animationData: buildLottie(e, t.v.amp) });
  }
});

// ---------- 6. Motion springs ----------
const idleKeys = {
  buoyant: [{ y: [0, -10, 0] }, { duration: 1.2 }],
  drift: [{ y: [0, 8, 0] }, { duration: 3.2 }],
  flare: [{ scale: [1, 1.06, 1] }, { duration: .5 }],
  tremble: [{ x: [0, -2, 2, -1, 0], rotate: [0, -2, 2, -1, 0] }, { duration: .35 }],
  pop: [{ scale: [1, 1.1, 1] }, { duration: .9, repeatDelay: .6 }],
  recoil: [{ x: [0, -9, 0], rotate: [0, -6, 0] }, { duration: 1.6 }]
};
addTile({
  num: '06', title: 'Spring physics', lib: 'Motion (motion.dev) · MIT',
  scales: 'Motion token → spring stiffness and damping plus an idle loop. Angry snaps in hard, Sad settles slowly, same code.',
  tryIt: 'Tap the blob. Then slide damping to the floor and every mood gets wobbly. That one slider is a whole personality axis.',
  controls: [{ id: 'stiff', label: 'Stiffness ×', min: .2, max: 3, step: .1, value: 1 }, { id: 'damp', label: 'Damping ×', min: .2, max: 3, step: .1, value: 1 }],
  async init(t) {
    t.art.innerHTML = blobSvg('motion-blob');
    t.M = await import(MOTION);
    t.art.querySelector('.hit').addEventListener('pointerdown', () => this.poke(t, .75));
  },
  poke(t, from) {
    const k = K();
    t.M.animate(t.art.querySelector('.hit'), { scale: [from, 1] }, { type: t.M.spring, stiffness: k.stiffness * t.v.stiff, damping: k.damping * t.v.damp });
  },
  update(t, e, k) {
    const svg = t.art.querySelector('svg'); const body = svg.querySelector('.body');
    body.setAttribute('d', e.path); body.setAttribute('fill', e.color);
    const fp = facePaths(e.face); svg.querySelectorAll('.face path').forEach((p, i) => p.setAttribute('d', fp[i]));
    svg.querySelector('.face').setAttribute('stroke', e.ink);
    t.idle && t.idle.stop();
    const idle = svg.querySelector('.idle'); idle.style.transform = '';
    const [kf, opts] = idleKeys[e.animation];
    t.idle = t.M.animate(idle, kf, { ...opts, repeat: Infinity, ease: 'easeInOut' });
    this.poke(t, .55);
  }
});

// ---------- 7. GSAP MorphSVG ----------
addTile({
  num: '07', title: 'Shape morphing', lib: 'GSAP + MorphSVG · free, incl. commercial',
  scales: 'Morphs the silhouette and all three face marks between any two states. The ease comes from the motion token, so arriving at Angry feels different from arriving at Sad.',
  tryIt: 'Force one ease on everything and see which moods break. Slow the duration right down to study the in-betweens.',
  controls: [{ id: 'dur', label: 'Duration ×', min: .3, max: 4, step: .1, value: 1 }, { id: 'ease', label: 'Ease', options: ['auto', 'elastic.out(1,0.3)', 'back.out(2)', 'expo.out', 'sine.inOut', 'steps(6)'], value: 'auto' }],
  async init(t) { t.art.innerHTML = blobSvg('gsap-blob'); await getGsap(); },
  update(t, e, k) { morphTo(t.art.querySelector('svg'), e, k, t.v.dur, t.v.ease); }
});

// ---------- 8. Open Peeps ----------
const heads = ['long', 'bun', 'afro', 'bangs', 'hijab', 'short2', 'twists', 'mohawk'];
addTile({
  num: '08', title: 'Illustrated character', lib: 'Open Peeps by Pablo Stanley · CC0, via DiceBear',
  scales: 'Each state maps to one peep face, the colour token is the backdrop, and the motion token still drives the movement. Head and seed are free axes, so the same mood can look like different people.',
  tryIt: 'Change the head and hit New person. Worth deciding if Fo should be a person at all, or stay a blob.',
  controls: [{ id: 'head', label: 'Head', options: heads, value: 'long' }, { label: 'New person', button: t => { t.seed = Math.random().toString(36).slice(2, 7); t.update(); } }],
  init(t) { t.seed = 'fo'; t.art.innerHTML = '<div class="peep-wrap fill"><img class="peep" alt=""></div>'; },
  update(t, e) {
    const img = t.art.querySelector('img');
    img.src = `https://api.dicebear.com/9.x/open-peeps/svg?seed=${t.seed}&face=${peepFace[mood]}&head=${t.v.head}&backgroundColor=${e.color.slice(1)}&radius=50`;
    img.alt = `${e.label} open peep`;
    t.art.firstChild.dataset.motion = e.animation;
  }
});

// ---------- 9. CSS only ----------
addTile({
  num: '09', title: 'No library at all', lib: 'Plain CSS · 0kb',
  scales: 'Colour token drives a spinning conic glow, motion token picks a keyframe. This is the cheapest baseline everything above has to beat.',
  tryIt: 'Crank speed. If this looks good enough at small sizes, it can be the fallback for low-power phones.',
  controls: [{ id: 'spin', label: 'Glow speed', min: 1, max: 20, step: 1, value: 8 }],
  init(t) { t.art.innerHTML = `<div class="css-glow fill"></div>${blobSvg('css-blob')}`; t.art.querySelector('svg').classList.add('css-motion'); },
  update(t, e) {
    const pal = palette(e.color);
    t.art.style.setProperty('--c1', pal[0]); t.art.style.setProperty('--c2', pal[1]); t.art.style.setProperty('--c3', pal[3]);
    t.art.style.setProperty('--spin', `${t.v.spin}s`);
    const svg = t.art.querySelector('svg'); svg.dataset.motion = e.animation;
    const body = svg.querySelector('.body'); body.setAttribute('d', e.path); body.setAttribute('fill', e.color);
    const fp = facePaths(e.face); svg.querySelectorAll('.face path').forEach((p, i) => p.setAttribute('d', fp[i]));
    svg.querySelector('.face').setAttribute('stroke', e.ink);
  }
});

// ---------- global mood picker ----------
const picker = document.getElementById('moods');
function setMood(key) {
  mood = key;
  document.documentElement.style.setProperty('--state', E().color);
  document.getElementById('mood-name').textContent = E().label;
  document.getElementById('mood-line').textContent = `${E().motion}. Colour ${E().color}.`;
  picker.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.key === key)));
  tiles.forEach(t => t.update());
}
order.forEach(key => {
  const b = document.createElement('button'); b.type = 'button'; b.dataset.key = key; b.textContent = emotions[key].label;
  b.style.setProperty('--state', emotions[key].color); b.addEventListener('click', () => { stopTour(); setMood(key); });
  picker.appendChild(b);
});
let tour = null;
const tourBtn = document.getElementById('tour');
function stopTour() { clearInterval(tour); tour = null; tourBtn.textContent = 'Tour'; }
tourBtn.addEventListener('click', () => {
  if (tour) return stopTour();
  tourBtn.textContent = 'Stop';
  tour = setInterval(() => setMood(order[(order.indexOf(mood) + 1) % order.length]), 2600);
});
setMood(mood);
