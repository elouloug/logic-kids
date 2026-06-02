let audioCtx = null;

function ctx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function tone(freq, start, dur, vol = 0.22, type = 'sine') {
  const c = ctx();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(vol, start);
  gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(start);
  osc.stop(start + dur + 0.02);
}

// Single correct tap — bright ascending arpeggio
export function playCorrect() {
  const t = ctx().currentTime;
  tone(523, t,        0.14);  // C5
  tone(659, t + 0.10, 0.14);  // E5
  tone(784, t + 0.20, 0.22);  // G5
}

// All done / full puzzle complete — jubilant fanfare
export function playComplete() {
  const t = ctx().currentTime;
  tone(523, t,        0.35);  // C5
  tone(659, t,        0.35);  // E5
  tone(784, t,        0.35);  // G5
  tone(1047, t + 0.22, 0.55); // C6
  tone(1319, t + 0.38, 0.45); // E6
}

// Gentle wrong — low soft thud, not scary
export function playWrong() {
  const t = ctx().currentTime;
  tone(220, t, 0.18, 0.14, 'sine');
}
