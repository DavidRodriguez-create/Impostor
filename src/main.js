import { gameState } from './game.js';
import { initLanguageSelector } from './utils/languageManager.js';
import './screens/startScreen.js';
import './screens/themeScreen.js';
import './screens/setupScreen.js';
import './screens/revealScreen.js';
import './screens/gameScreen.js';

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
  
  // Set version dynamically in all screens
  const versionElements = [
    'app-version',
    'app-version-theme',
    'app-version-setup',
    'app-version-reveal',
    'app-version-game'
  ];
  
  versionElements.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = __APP_VERSION__;
    }
  });
  
  showScreen('start-screen');
});
