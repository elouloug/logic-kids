import { SHAPES, COLORS, pickN, shuffle, itemsEqual } from '../../utils/items.js';

export function generatePuzzle(level) {
  if (level === 1) {
    // 2x2 grid, 1 shape, 2 colors — each row contains one of each color
    const shape = pickN(SHAPES, 1)[0];
    const [c1, c2] = pickN(COLORS, 2);
    const grid = [
      [{ shape, color: c1 }, { shape, color: c2 }],
      [{ shape, color: c2 }, null],
    ];
    const answer = { shape, color: c1 };
    const wrongs = pickN(COLORS.filter((c) => c !== c1 && c !== c2), 2).map((c) => ({ shape, color: c }));
    return { grid, answer, choices: shuffle([answer, ...wrongs]) };
  }

  if (level === 2) {
    // 3x3 grid, 1 shape, 3 colors — each row uses each color exactly once
    const shape = pickN(SHAPES, 1)[0];
    const colors = pickN(COLORS, 3);
    const rows = [
      shuffle([...colors]),
      shuffle([...colors]),
      shuffle([...colors]),
    ];
    // Remove one cell at a random position
    const row = 1 + Math.floor(Math.random() * 2);
    const col = Math.floor(Math.random() * 3);
    const answer = { shape, color: rows[row][col] };
    const grid = rows.map((r, ri) =>
      r.map((c, ci) => (ri === row && ci === col ? null : { shape, color: c }))
    );
    const wrongs = pickN(COLORS.filter((c) => !colors.includes(c)), 3).map((c) => ({ shape, color: c }));
    return { grid, answer, choices: shuffle([answer, ...wrongs]) };
  }

  // Level 3: 3x3 Latin square — each row and column uses each shape & each color once
  const colors = pickN(COLORS, 3);
  const shapes = pickN(SHAPES, 3);
  // Arrange as: row i, col j → shape = shapes[(i+j)%3], color = colors[(i+2*j)%3]
  const gridFull = Array.from({ length: 3 }, (_, i) =>
    Array.from({ length: 3 }, (_, j) => ({
      shape: shapes[(i + j) % 3],
      color: colors[(i + 2 * j) % 3],
    }))
  );
  const row = 1 + Math.floor(Math.random() * 2);
  const col = Math.floor(Math.random() * 3);
  const answer = gridFull[row][col];
  const grid = gridFull.map((r, ri) =>
    r.map((cell, ci) => (ri === row && ci === col ? null : cell))
  );
  const nearMiss = [
    { shape: answer.shape, color: pickN(COLORS.filter((c) => c !== answer.color), 1)[0] },
    { shape: pickN(SHAPES.filter((s) => s !== answer.shape), 1)[0], color: answer.color },
    { shape: pickN(SHAPES.filter((s) => s !== answer.shape), 1)[0], color: pickN(COLORS.filter((c) => c !== answer.color), 1)[0] },
    { shape: pickN(SHAPES.filter((s) => s !== answer.shape), 1)[0], color: pickN(COLORS.filter((c) => c !== answer.color), 1)[0] },
    { shape: pickN(SHAPES.filter((s) => s !== answer.shape), 1)[0], color: pickN(COLORS.filter((c) => c !== answer.color), 1)[0] },
  ];
  const unique = nearMiss.filter(
    (d, idx, arr) =>
      !itemsEqual(d, answer) && arr.findIndex((x) => itemsEqual(x, d)) === idx
  );
  return { grid, answer, choices: shuffle([answer, ...unique.slice(0, 5)]) };
}
