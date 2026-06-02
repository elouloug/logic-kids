import { EMOJI_ANIMALS, EMOJI_VEHICLES, EMOJI_FOOD, pickN, shuffle } from '../../utils/items.js';

const ALL_EMOJI = [...EMOJI_ANIMALS, ...EMOJI_VEHICLES, ...EMOJI_FOOD];

const CONFIGS = {
  1: { pairs: 3, cols: 3 },
  2: { pairs: 6, cols: 4 },
  3: { pairs: 8, cols: 4 },
};

export function generatePuzzle(level) {
  const { pairs, cols } = CONFIGS[level];
  const emojis = pickN(ALL_EMOJI, pairs);
  const cards = emojis.flatMap((em, i) => [
    { id: `${i}a`, value: em, flipped: false, matched: false },
    { id: `${i}b`, value: em, flipped: false, matched: false },
  ]);
  return { cards: shuffle(cards), cols };
}
