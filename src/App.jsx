import { useState } from 'react';
import PatternGame from './games/PatternGame/index.jsx';
import OddOneOut from './games/OddOneOut/index.jsx';
import WhatsMissing from './games/WhatsMissing/index.jsx';
import Sorting from './games/Sorting/index.jsx';
import Memory from './games/Memory/index.jsx';

const GAMES = [
  { id: 'pattern',  title: 'המשך הרצף',  emoji: '🔢', bg: '#FFCAD4', component: PatternGame },
  { id: 'oddone',   title: 'מי לא שייך', emoji: '🔍', bg: '#B5EAD7', component: OddOneOut },
  { id: 'missing',  title: 'מה חסר',     emoji: '❓', bg: '#FFDAC1', component: WhatsMissing },
  { id: 'sorting',  title: 'מיון',       emoji: '📦', bg: '#C7CEEA', component: Sorting },
  { id: 'memory',   title: 'זיכרון',     emoji: '🃏', bg: '#A8D8EA', component: Memory },
];

export default function App() {
  const [activeId, setActiveId] = useState(null);

  if (activeId) {
    const game = GAMES.find((g) => g.id === activeId);
    const GameComponent = game.component;
    return <GameComponent onBack={() => setActiveId(null)} />;
  }

  return (
    <div className="home">
      <h1 className="home-title">🧠 לוגיקה לילדים</h1>
      <p className="home-subtitle">בחר משחק</p>
      <div className="home-grid">
        {GAMES.map((g) => (
          <button
            key={g.id}
            className="game-tile"
            style={{ '--tile-bg': g.bg }}
            onClick={() => setActiveId(g.id)}
          >
            <span className="tile-emoji">{g.emoji}</span>
            <span className="tile-title">{g.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
