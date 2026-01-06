import { gameState } from '../game.js';
import { showScreen } from '../main.js';

// Start Screen Logic
document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-btn');

  startBtn.addEventListener('click', () => {
    showScreen('theme-screen');
  });
});
