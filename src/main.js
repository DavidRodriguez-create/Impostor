import { gameState } from './game.js';
import { initLanguageSelector } from './utils/languageManager.js';
import './screens/startScreen.js';
import './screens/themeScreen.js';
import './screens/setupScreen.js';
import './screens/revealScreen.js';
import './screens/gameScreen.js';
import packageJson from '../package.json';

// Screen navigation
export function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  console.log('Impostor Game Loaded');
  initLanguageSelector();
  
  // Set version dynamically
  const versionElement = document.getElementById('app-version');
  if (versionElement) {
    versionElement.textContent = packageJson.version;
  }
  
  showScreen('start-screen');
});
