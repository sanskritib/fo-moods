// 2026-10-08 - happy - we redesigned the bubble viz together over a voice call and she pushed Stackline through even though the pay fell short, so today moved
const emotions = {
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

const order = ['happy','sad','angry','fear','surprise','disgust','bad'];
const blob = document.getElementById('blob');
const controls = document.getElementById('controls');
let selected = 'happy';

function renderFace(emotion) {
  return `<g fill="none" stroke="${emotion.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${emotion.face}</g>`;
}

function render(key) {
  selected = key;
  const emotion = emotions[key];
  document.documentElement.style.setProperty('--state', emotion.color);
  document.documentElement.style.setProperty('--glow', emotion.glow);
  blob.dataset.motion = emotion.animation;
  blob.setAttribute('aria-label', `${emotion.label} blob`);
  blob.innerHTML = `<defs><radialGradient id="fill" cx="34%" cy="28%"><stop offset="0" stop-color="#fff" stop-opacity=".36"/><stop offset=".34" stop-color="${emotion.color}"/><stop offset="1" stop-color="${emotion.color}" stop-opacity=".72"/></radialGradient><filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.25"/></filter></defs><path d="${emotion.path}" fill="url(#fill)" filter="url(#soft)"/><path d="${emotion.path}" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="1.5"/>${renderFace(emotion)}`;
  document.getElementById('emotion-name').textContent = emotion.label;
  document.getElementById('emotion-description').textContent = emotion.description;
  document.getElementById('colour').textContent = `${emotion.color} (${emotion.label.toLowerCase()} temperature)`;
  document.getElementById('eyes').textContent = emotion.eyes;
  document.getElementById('shape').textContent = emotion.shape;
  document.getElementById('motion').textContent = emotion.motion;
  controls.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.key === key)));
}

order.forEach(key => {
  const emotion = emotions[key];
  const button = document.createElement('button');
  button.type = 'button';
  button.dataset.key = key;
  button.textContent = emotion.label;
  button.style.setProperty('--state', emotion.color);
  button.addEventListener('click', () => render(key));
  controls.appendChild(button);
});

render(selected);


