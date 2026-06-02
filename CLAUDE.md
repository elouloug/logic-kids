# logic-kids

A logic & pattern game for kids aged 6-10 who are early readers.

## Project rules

**LANGUAGE** — All UI in Hebrew, RTL layout (`dir="rtl"`, `lang="he"`). Use Rubik or Varela Round (Google Fonts — good Hebrew support).

**TEXT** — Short Hebrew text is allowed: a one-line instruction at the top of each game, level labels, and game titles. Vocabulary simple enough for a 6-year-old reader. Rely mainly on icons/color/shape; text supports, doesn't replace.

**NO AUDIO** — No speech, no Web Speech API, no audio of any kind.

**INTERACTION** — Big touch targets (min 64 px). Works on tablet and desktop. Tap or simple drag only — no typing, no tiny buttons.

**FEEDBACK** — Immediate, gentle visual feedback: happy animation for correct; encouraging "נסה שוב" for wrong with no scary red X. Never punish; always allow retry.

**OFFLINE** — No accounts, no ads, no network calls. Fully offline-capable.

**STYLE** — Bright, friendly, rounded shapes, generous spacing, large pastel/primary palette.

## Structure

- `src/App.jsx` — home screen + routing between games
- `src/components/GameShell.jsx` — shared wrapper: back button, star display, instruction line, level picker
- `src/components/FeedbackOverlay.jsx` — correct celebration overlay (auto-dismisses); wrong = gentle wobble + "נסה שוב" text, no overlay
- `src/components/LevelPicker.jsx` — 3-button level selector
- `src/components/Shape.jsx` — SVG shape renderer (circle, square, triangle, diamond, star)
- `src/utils/items.js` — shared constants (SHAPES, COLORS, EMOJI_SETS) + pick/shuffle helpers
- `src/games/<GameName>/index.jsx` — game UI
- `src/games/<GameName>/levels.js` — difficulty config and puzzle generator (single source of truth)

## Difficulty ladder

All three levels are freely selectable — no unlock gating. Difficulty comes from **reasoning demand**, never from smaller buttons or time pressure.

### המשך הרצף (Pattern)
| Level | Pattern | Attributes | Shown | Choices |
|---|---|---|---|---|
| 1 — גיל 6 | AB repeat | color only, fixed shape | 4 | 3 |
| 2 — גיל 6-8 | ABC cycle | color + optional size | 5 | 4 |
| 3 — גיל 8-10 | Two attrs cycle (color AND shape) | color × shape | 6 | 5 near-miss |

### מי לא שייך (Odd One Out)
| Level | Items | Odd-one criterion |
|---|---|---|
| 1 — גיל 6 | 4 | same shape, 1 different color |
| 2 — גיל 6-8 | 6 | same color, 1 different shape — plus a distractor |
| 3 — גיל 8-10 | 5 | semantic/categorical (emoji — animals vs vehicle vs food) |

### מה חסר (What's Missing)
| Level | Grid | Rule | Choices |
|---|---|---|---|
| 1 — גיל 6 | 2×2 | each row: one of each color | 3 |
| 2 — גיל 6-8 | 3×3 | each row: one of each color | 4 |
| 3 — גיל 8-10 | 3×3 | each row: one of each color AND shape (visual Latin square) | 6 near-miss |

### מיון (Sorting)
| Level | Bins | Sort by | Items |
|---|---|---|---|
| 1 — גיל 6 | 2 | color | 6 |
| 2 — גיל 6-8 | 3 | shape | 9 |
| 3 — גיל 8-10 | 3 | semantic category (emoji) | 9 |

### זיכרון (Memory)
| Level | Cards | Grid |
|---|---|---|
| 1 — גיל 6 | 6 (3 pairs) | 2×3 |
| 2 — גיל 6-8 | 12 (6 pairs) | 3×4 |
| 3 — גיל 8-10 | 16 (8 pairs) | 4×4 |

## Deployment

GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`).
Vite base path: `/logic-kids/`.
Push to `main` → auto-deploy.

## How to edit

```bash
npm install
npm run dev        # localhost:5173
npm run build      # dist/
```

Each game's puzzle generation lives entirely in `levels.js` — tune difficulty there, not scattered in the UI component.
