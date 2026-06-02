import {
  SHAPES, COLORS, EMOJI_ANIMALS, EMOJI_VEHICLES, EMOJI_FOOD,
  pickN, shuffle,
} from '../../utils/items.js';

export function generatePuzzle(level) {
  if (level === 1) {
    const shape = pickN(SHAPES, 1)[0];
    const [mainColor, oddColor] = pickN(COLORS, 2);
    const items = [
      { shape, color: mainColor, isOdd: false },
      { shape, color: mainColor, isOdd: false },
      { shape, color: mainColor, isOdd: false },
      { shape, color: oddColor, isOdd: true },
    ];
    return { items: shuffle(items), type: 'shapes' };
  }

  if (level === 2) {
    const mainShape = pickN(SHAPES, 1)[0];
    const oddShape = pickN(SHAPES.filter((s) => s !== mainShape), 1)[0];
    const [c1, c2] = pickN(COLORS, 2);
    const items = [
      { shape: mainShape, color: c1, isOdd: false },
      { shape: mainShape, color: c2, isOdd: false },
      { shape: mainShape, color: c1, isOdd: false },
      { shape: mainShape, color: c2, isOdd: false },
      { shape: oddShape, color: c1, isOdd: true },
      { shape: mainShape, color: c2, isOdd: false },
    ];
    return { items: shuffle(items), type: 'shapes' };
  }

  // Level 3: semantic — 4 from one category, 1 from another
  const cats = [
    { pool: EMOJI_ANIMALS, label: 'animals' },
    { pool: EMOJI_VEHICLES, label: 'vehicles' },
    { pool: EMOJI_FOOD, label: 'food' },
  ];
  const [mainCat, oddCat] = pickN(cats, 2);
  const mainEmojis = pickN(mainCat.pool, 4).map((e) => ({ emoji: e, isOdd: false }));
  const oddEmoji = { emoji: pickN(oddCat.pool, 1)[0], isOdd: true };
  return { items: shuffle([...mainEmojis, oddEmoji]), type: 'emoji' };
}
