export const SHAPES = ['circle', 'square', 'triangle', 'diamond', 'star'];

export const COLORS = [
  '#FF6B6B', // red
  '#4ECDC4', // teal
  '#FFE66D', // yellow
  '#95E1D3', // mint
  '#C3A6FF', // purple
  '#FFA07A', // salmon
  '#FFB3C6', // pink
  '#56CCF2', // sky
];

export const EMOJI_ANIMALS = ['🐶', '🐱', '🐻', '🦊', '🐸', '🐧', '🦁', '🐨'];
export const EMOJI_VEHICLES = ['🚗', '✈️', '🚂', '🚢', '🚁', '🛸'];
export const EMOJI_FOOD = ['🍎', '🍊', '🍋', '🍇', '🍓', '🍒'];

export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function pickN(arr, n) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

export function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function itemKey(item) {
  return `${item.shape}|${item.color}|${item.size || 'md'}`;
}

export function itemsEqual(a, b) {
  return a.shape === b.shape && a.color === b.color && (a.size || 'md') === (b.size || 'md');
}
