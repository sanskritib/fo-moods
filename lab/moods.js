// Temp lab copy of the seven states from ../app.js, plus the knobs each library reads.
// Delete the whole /lab folder when we're done experimenting.
export const emotions = {
  happy: {
    label: 'Happy', color: '#F9C74F', ink: '#2C2407', glow: '#F9C74F',
    eyes: 'Curved U-shapes', shape: 'Soft round ring, gently wider at the top', motion: 'Buoyant bounce', animation: 'buoyant',
    description: 'Warm, open, uncomplicated joy. This is the base positive state.',
    path: 'M110 31 C151 28 183 54 184 98 C187 144 157 183 111 188 C65 191 31 159 33 111 C30 66 67 34 110 31 Z',
    face: '<path d="M68 102 Q79 86 90 102"/><path d="M130 102 Q141 86 152 102"/><path d="M79 127 Q110 155 141 127"/>'
  },
  sad: {
    label: 'Sad', color: '#577590', ink: '#E8F0F5', glow: '#577590',
    eyes: 'Downturned lids', shape: 'Low, weighted ring with a soft droop', motion: 'Slow downward drift', animation: 'drift',
    description: 'Quiet and low-energy, with weight settling toward the bottom rather than breaking the silhouette.',
    path: 'M110 42 C151 41 181 65 177 109 C173 158 145 187 105 180 C63 174 36 147 43 103 C49 61 72 41 110 42 Z',
    face: '<path d="M67 99 Q79 111 91 99"/><path d="M129 99 Q141 111 153 99"/><path d="M82 139 Q110 120 138 139"/>'
  },
  angry: {
    label: 'Angry', color: '#F94144', ink: '#300B0D', glow: '#F94144',
    eyes: 'Narrow, slanted eyes', shape: 'Taut ring with deliberate points', motion: 'Tense flare', animation: 'flare',
    description: 'High energy held under pressure. The silhouette stays controlled, but its edges are sharper and more forceful.',
    path: 'M110 27 L145 43 C170 42 190 69 179 97 L190 127 C178 153 156 181 125 178 L97 191 L65 172 C37 165 29 132 40 105 L32 76 L58 50 L83 42 Z',
    face: '<path d="M65 93 L92 104"/><path d="M128 104 L155 93"/><path d="M82 142 L138 142"/>'
  },
  fear: {
    label: 'Fear', color: '#E8952F', ink: '#2A1604', glow: '#E8952F',
    eyes: 'Wide, lifted ovals', shape: 'Contracted, irregular ring', motion: 'Small tremble', animation: 'tremble',
    description: 'Alert and uncertain. The shape pulls inward in a few places, while the large eyes do the immediate reading.',
    path: 'M109 34 C143 25 176 49 177 80 C194 104 176 126 179 151 C159 174 137 184 110 179 C84 190 55 171 45 146 C31 122 45 101 40 77 C55 47 79 28 109 34 Z',
    face: '<ellipse cx="79" cy="101" rx="10" ry="15"/><ellipse cx="141" cy="101" rx="10" ry="15"/><path d="M95 142 Q110 132 125 142"/>'
  },
  surprise: {
    label: 'Surprise', color: '#9B5DE5', ink: '#1E0E35', glow: '#9B5DE5',
    eyes: 'Open round eyes', shape: 'Tall expanded ring', motion: 'Quick pop', animation: 'pop',
    description: 'An instant of expansion. The blob goes tall and open before the feeling resolves into something else.',
    path: 'M110 20 C147 23 172 57 169 91 C187 124 162 185 110 198 C58 185 33 124 51 91 C48 57 73 23 110 20 Z',
    face: '<circle cx="79" cy="96" r="10"/><circle cx="141" cy="96" r="10"/><circle cx="110" cy="139" r="13" fill="none"/>'
  },
  disgust: {
    label: 'Disgust', color: '#7CB518', ink: '#172604', glow: '#7CB518',
    eyes: 'Asymmetric narrowed lids', shape: 'Lopsided ring, recoiling left', motion: 'Recoil', animation: 'recoil',
    description: 'A clear move-away signal. The ring shifts off balance and the expression stays asymmetrical rather than merely angry.',
    path: 'M109 34 C152 30 180 52 183 93 C191 132 162 175 123 183 C91 197 48 175 38 138 C29 108 49 79 52 56 C71 36 88 32 109 34 Z',
    face: '<path d="M66 101 Q78 109 91 96"/><path d="M129 96 Q142 90 154 98"/><path d="M84 142 Q106 132 137 143"/>'
  },
  bad: {
    label: 'Bad', color: '#6FB07F', ink: '#10231A', glow: '#6FB07F',
    eyes: 'Flat lids', shape: 'Low, weighted ring', motion: 'Slow downward drift', animation: 'drift',
    description: 'Not an event, a condition: tired, stressed, bored, busy. The everyday register the original six missed.',
    path: 'M110 42 C151 41 181 65 177 109 C173 158 145 187 105 180 C63 174 36 147 43 103 C49 61 72 41 110 42 Z',
    face: '<path d="M68 100 L92 100"/><path d="M128 100 L152 100"/><path d="M82 142 L138 142"/>'
  }
};

export const order = ['happy','sad','angry','fear','surprise','disgust','bad'];

// One row per motion token. Every library tile reads from here, so changing a
// number here changes how that mood moves everywhere at once.
export const motionKnobs = {
  buoyant: { energy: .70, speed: .80, stiffness: 260, damping: 11, ease: 'elastic.out(1,0.45)', dur: 1.1, balls: 7 },
  drift:   { energy: .20, speed: .22, stiffness:  70, damping: 18, ease: 'sine.inOut',          dur: 1.8, balls: 3 },
  flare:   { energy: .95, speed: 1.5, stiffness: 520, damping:  9, ease: 'expo.out',            dur: .60, balls: 12 },
  tremble: { energy: .80, speed: 1.1, stiffness: 700, damping:  7, ease: 'back.out(4)',         dur: .50, balls: 10 },
  pop:     { energy: .85, speed: 1.2, stiffness: 600, damping: 12, ease: 'back.out(2.2)',       dur: .70, balls: 9 },
  recoil:  { energy: .50, speed: .55, stiffness: 240, damping: 20, ease: 'power4.out',          dur: .90, balls: 5 }
};

// Open Peeps face per state (DiceBear's open-peeps face ids)
export const peepFace = {
  happy: 'smileBig', sad: 'solemn', angry: 'rage', fear: 'concernedFear',
  surprise: 'awe', disgust: 'contempt', bad: 'tired'
};

// ---------- colour helpers ----------
export function hexToHsl(hex) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16 & 255) / 255, g = (n >> 8 & 255) / 255, b = (n & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > .5 ? d / (2 - max - min) : d / (max + min);
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h *= 60;
  }
  return [h, s * 100, l * 100];
}
export function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360; s /= 100; l /= 100;
  const k = n => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return '#' + [f(0), f(8), f(4)].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
}
// Five colours from one token colour: light, base, deep, and two hue neighbours.
export function palette(hex) {
  const [h, s, l] = hexToHsl(hex);
  return [
    hslToHex(h, s, Math.min(l + 26, 90)),
    hex,
    hslToHex(h, s, Math.max(l - 28, 8)),
    hslToHex(h + 30, s * .9, l),
    hslToHex(h - 24, s, Math.min(l + 8, 80))
  ];
}
export function rgb01(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
}

// ---------- shape helpers ----------
const K = 0.5523;
function ellipsePath(cx, cy, rx, ry) {
  return `M${cx + rx} ${cy} C${cx + rx} ${cy + ry * K} ${cx + rx * K} ${cy + ry} ${cx} ${cy + ry} ` +
    `C${cx - rx * K} ${cy + ry} ${cx - rx} ${cy + ry * K} ${cx - rx} ${cy} ` +
    `C${cx - rx} ${cy - ry * K} ${cx - rx * K} ${cy - ry} ${cx} ${cy - ry} ` +
    `C${cx + rx * K} ${cy - ry} ${cx + rx} ${cy - ry * K} ${cx + rx} ${cy} Z`;
}
// Every face is three marks (two eyes, one mouth). Turn them all into path strings
// so GSAP can morph them and the Lottie generator can draw them.
export function facePaths(face) {
  const out = [];
  const re = /<(path|ellipse|circle)([^>]*)\/>/g; let m;
  while ((m = re.exec(face))) {
    const attr = k => { const a = m[2].match(new RegExp(k + '="([^"]*)"')); return a ? a[1] : null; };
    if (m[1] === 'path') out.push(attr('d'));
    else if (m[1] === 'ellipse') out.push(ellipsePath(+attr('cx'), +attr('cy'), +attr('rx'), +attr('ry')));
    else out.push(ellipsePath(+attr('cx'), +attr('cy'), +attr('r'), +attr('r')));
  }
  return out;
}

// SVG path (absolute M/L/C/Q/Z) -> Lottie bezier shapes
export function pathToLottie(d) {
  const t = d.match(/[MLCQZ]|-?\d*\.?\d+/g); let i = 0, cmd = null, p = [0, 0], cur = null; const subs = [];
  const n = () => parseFloat(t[i++]);
  const curveTo = (c1, c2, e) => {
    const k = cur.v.length - 1;
    cur.o[k] = [c1[0] - p[0], c1[1] - p[1]];
    cur.v.push(e); cur.i.push([c2[0] - e[0], c2[1] - e[1]]); cur.o.push([0, 0]); p = e;
  };
  while (i < t.length) {
    if (/[MLCQZ]/.test(t[i])) cmd = t[i++];
    if (cmd === 'M') { p = [n(), n()]; cur = { v: [p.slice()], i: [[0, 0]], o: [[0, 0]], c: false }; subs.push(cur); cmd = 'L'; }
    else if (cmd === 'L') { p = [n(), n()]; cur.v.push(p.slice()); cur.i.push([0, 0]); cur.o.push([0, 0]); }
    else if (cmd === 'C') { const c1 = [n(), n()], c2 = [n(), n()], e = [n(), n()]; curveTo(c1, c2, e); }
    else if (cmd === 'Q') {
      const q = [n(), n()], e = [n(), n()];
      curveTo([p[0] + 2 / 3 * (q[0] - p[0]), p[1] + 2 / 3 * (q[1] - p[1])], [e[0] + 2 / 3 * (q[0] - e[0]), e[1] + 2 / 3 * (q[1] - e[1])], e);
    } else if (cmd === 'Z') {
      cur.c = true; const L = cur.v.length - 1;
      if (L > 0 && Math.hypot(cur.v[L][0] - cur.v[0][0], cur.v[L][1] - cur.v[0][1]) < .5) {
        cur.i[0] = cur.i[L]; cur.v.pop(); cur.i.pop(); cur.o.pop();
      }
      cmd = null;
    } else i++;
  }
  return subs;
}

// ---------- Lottie generator: tokens in, animation out ----------
const ez = { i: { x: [.45], y: [1] }, o: { x: [.55], y: [0] } };
const kf = (frames, values) => ({ a: 1, k: frames.map((t, j) => j === frames.length - 1 ? { t, s: values[j] } : { t, s: values[j], ...ez }) });
const still = v => ({ a: 0, k: v });
function motionKeys(anim, amp = 1) {
  const C = 110, P = (x, y) => [C + x * amp, C + y * amp, 0], S = (x, y) => [100 + (x - 100) * amp, 100 + (y - 100) * amp, 100];
  switch (anim) {
    case 'buoyant': return { op: 120, p: kf([0, 60, 120], [P(0, 0), P(0, -12), P(0, 0)]), s: kf([0, 60, 120], [S(100, 100), S(97, 104), S(100, 100)]), r: still(0) };
    case 'drift':   return { op: 200, p: kf([0, 100, 200], [P(0, 0), P(0, 9), P(0, 0)]), s: kf([0, 100, 200], [S(100, 100), S(103, 97), S(100, 100)]), r: still(0) };
    case 'flare':   return { op: 60,  p: still(P(0, 0)), s: kf([0, 12, 60], [S(100, 100), S(109, 109), S(100, 100)]), r: still(0) };
    case 'tremble': return { op: 24,  p: kf([0, 6, 12, 18, 24], [P(0, 0), P(-2, 0), P(2, 0), P(-1, 0), P(0, 0)]), s: still([100, 100, 100]), r: kf([0, 6, 12, 18, 24], [[0], [-2.5 * amp], [2.5 * amp], [-2 * amp], [0]]) };
    case 'pop':     return { op: 90,  p: still(P(0, 0)), s: kf([0, 12, 30, 90], [S(100, 100), S(114, 114), S(100, 100), S(100, 100)]), r: still(0) };
    case 'recoil':  return { op: 100, p: kf([0, 25, 100], [P(0, 0), P(-10, 0), P(0, 0)]), s: still([100, 100, 100]), r: kf([0, 25, 100], [[0], [-7 * amp], [0]]) };
  }
}
export function buildLottie(e, amp = 1) {
  const m = motionKeys(e.animation, amp);
  const tr = { ty: 'tr', p: still([0, 0]), a: still([0, 0]), s: still([100, 100]), r: still(0), o: still(100) };
  const sh = s => ({ ty: 'sh', ks: still(s) });
  const face = { ty: 'gr', nm: 'face', it: [...facePaths(e.face).flatMap(pathToLottie).map(sh),
    { ty: 'st', c: still([...rgb01(e.ink), 1]), o: still(100), w: still(5), lc: 2, lj: 2 }, tr] };
  const shine = { ty: 'gr', nm: 'shine', it: [{ ty: 'el', p: still([86, 74]), s: still([46, 30]) },
    { ty: 'fl', c: still([1, 1, 1, 1]), o: still(22), r: 1 }, tr] };
  const body = { ty: 'gr', nm: 'body', it: [...pathToLottie(e.path).map(sh),
    { ty: 'fl', c: still([...rgb01(e.color), 1]), o: still(100), r: 1 }, tr] };
  return {
    v: '5.7.4', fr: 60, ip: 0, op: m.op, w: 220, h: 220, nm: e.label, ddd: 0, assets: [],
    layers: [{ ddd: 0, ind: 1, ty: 4, nm: 'blob', sr: 1, ao: 0, bm: 0, ip: 0, op: m.op, st: 0,
      ks: { o: still(100), r: m.r, p: m.p, a: still([110, 110, 0]), s: m.s },
      shapes: [face, shine, body] }]
  };
}
