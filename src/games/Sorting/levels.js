import { SHAPES, COLORS, EMOJI_ANIMALS, EMOJI_VEHICLES, EMOJI_FOOD, pickN, shuffle } from '../../utils/items.js';

// L1 — Sort by COLOR (2 bins, 6 items, same shape per bin, obvious color difference)
function generateL1() {
  const [c1, c2] = pickN(COLORS, 2);
  const bins = [
    { id: 'b0', type: 'color', color: c1, label: null },
    { id: 'b1', type: 'color', color: c2, label: null },
  ];
  const shape = pickN(SHAPES, 1)[0];
  const items = Array.from({ length: 6 }, (_, i) => {
    const binIdx = i % 2;
    return { id: `i${i}`, shape, color: binIdx === 0 ? c1 : c2, size: 52, correctBin: `b${binIdx}` };
  });
  return { bins, items: shuffle(items), criterion: 'צבע', type: 'shapes' };
}

// L2 — Sort by SIZE: small/medium/large (3 bins, 9 items, ALL same color+shape per item
//      so the ONLY cue is size — forces careful visual comparison)
function generateL2() {
  const SIZES = [32, 52, 74];
  const LABELS = ['קטן', 'בינוני', 'גדול'];
  const binColor = '#A0B4C8';
  const binShape = pickN(SHAPES, 1)[0];
  const bins = SIZES.map((sz, i) => ({
    id: `b${i}`, type: 'size', size: sz, shape: binShape, color: binColor, label: LABELS[i],
  }));
  const items = SIZES.flatMap((sz, bi) =>
    Array.from({ length: 3 }, (_, j) => ({
      id: `i${bi}_${j}`,
      shape: pickN(SHAPES, 1)[0],
      color: pickN(COLORS, 1)[0],
      size: sz,
      correctBin: `b${bi}`,
    }))
  );
  return { bins, items: shuffle(items), criterion: 'גודל', type: 'shapes' };
}

// L3 — Sort by SHAPE-CATEGORY: round / 3-sided / 4-or-more-sided
//      12 items with varied colors AND sizes → can't use color or size as a cue,
//      must reason about shape geometry. Genuine reasoning demand.
function generateL3() {
  const ROUND  = ['circle'];
  const THREE  = ['triangle'];
  const FOUR_PLUS = ['square', 'diamond', 'star'];

  const bins = [
    { id: 'b0', type: 'sides', shapes: ROUND,    label: 'עגול',     icon: '○' },
    { id: 'b1', type: 'sides', shapes: THREE,    label: '3 צלעות',  icon: '△' },
    { id: 'b2', type: 'sides', shapes: FOUR_PLUS, label: '4+ צלעות', icon: '⬡' },
  ];

  const items = bins.flatMap((bin, bi) =>
    Array.from({ length: 4 }, (_, j) => ({
      id: `i${bi}_${j}`,
      shape: pickN(bin.shapes, 1)[0],
      color: pickN(COLORS, 1)[0],
      size: 36 + Math.floor(Math.random() * 24), // random size 36–60 to distract
      correctBin: `b${bi}`,
    }))
  );
  return { bins, items: shuffle(items), criterion: 'צורה', type: 'shapes' };
}

export function generatePuzzle(level) {
  if (level === 1) return generateL1();
  if (level === 2) return generateL2();
  return generateL3();
}
