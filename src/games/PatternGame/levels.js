import { SHAPES, COLORS, pickN, shuffle, itemsEqual } from '../../utils/items.js';

function distractor(answer, usedColors, usedShapes) {
  const color = pickN(COLORS.filter((c) => !usedColors.includes(c) && c !== answer.color), 1)[0]
    || pickN(COLORS.filter((c) => c !== answer.color), 1)[0];
  const shape = answer.shape;
  return { shape, color };
}

export function generatePuzzle(level) {
  if (level === 1) {
    const shape = pickN(SHAPES, 1)[0];
    const [c1, c2] = pickN(COLORS, 2);
    const seqLen = 4;
    const pattern = [c1, c2];
    const sequence = Array.from({ length: seqLen }, (_, i) => ({ shape, color: pattern[i % 2] }));
    const answer = { shape, color: pattern[seqLen % 2] };
    const wrongs = pickN(COLORS.filter((c) => c !== answer.color), 2).map((c) => ({ shape, color: c }));
    return { sequence, answer, choices: shuffle([answer, ...wrongs]) };
  }

  if (level === 2) {
    const shape = pickN(SHAPES, 1)[0];
    const colors = pickN(COLORS, 3);
    const seqLen = 5;
    const sequence = Array.from({ length: seqLen }, (_, i) => ({ shape, color: colors[i % 3] }));
    const answer = { shape, color: colors[seqLen % 3] };
    const wrongs = pickN(COLORS.filter((c) => !colors.includes(c)), 3).map((c) => ({ shape, color: c }));
    return { sequence, answer, choices: shuffle([answer, ...wrongs]) };
  }

  // Level 3: both color AND shape cycle
  const colors = pickN(COLORS, 3);
  const shapes = pickN(SHAPES, 3);
  const seqLen = 6;
  const sequence = Array.from({ length: seqLen }, (_, i) => ({
    shape: shapes[i % 3],
    color: colors[i % 3],
  }));
  const answer = { shape: shapes[seqLen % 3], color: colors[seqLen % 3] };
  const nearMiss = [
    { shape: answer.shape, color: pickN(COLORS.filter((c) => c !== answer.color), 1)[0] },
    { shape: pickN(SHAPES.filter((s) => s !== answer.shape), 1)[0], color: answer.color },
    { shape: pickN(SHAPES.filter((s) => s !== answer.shape), 1)[0], color: pickN(COLORS.filter((c) => c !== answer.color), 1)[0] },
    { shape: pickN(SHAPES.filter((s) => s !== answer.shape), 1)[0], color: pickN(COLORS.filter((c) => c !== answer.color), 1)[0] },
  ];
  const uniqueNearMiss = nearMiss.filter(
    (d, idx, arr) =>
      !itemsEqual(d, answer) &&
      arr.findIndex((x) => itemsEqual(x, d)) === idx
  );
  return { sequence, answer, choices: shuffle([answer, ...uniqueNearMiss.slice(0, 4)]) };
}
