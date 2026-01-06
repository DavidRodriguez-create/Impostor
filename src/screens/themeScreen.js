import { gameState } from '../game.js';
import { getAllThemes } from '../data/themes.js';
import { showScreen } from '../main.js';
import { t } from '../data/translations.js';

// Theme Selection Screen Logic
document.addEventListener('DOMContentLoaded', () => {
  const themesGrid = document.getElementById('themes-grid');
  const selectedCount = document.getElementById('selected-count');
  const confirmThemesBtn = document.getElementById('confirm-themes-btn');

  // Render theme cards
  function renderThemes() {
    themesGrid.innerHTML = '';
    const themes = getAllThemes();
    
    Object.keys(themes).forEach(themeKey => {
      const theme = themes[themeKey];
      const isSelected = gameState.selectedThemes.includes(themeKey);
      
      const themeCard = document.createElement('div');
      themeCard.className = `theme-card ${isSelected ? 'selected' : ''}`;
      themeCard.dataset.theme = themeKey;
      
      themeCard.innerHTML = `
        <div class="theme-check">${isSelected ? '✓' : ''}</div>
        <div class="theme-name">${theme.name}</div>
        <div class="theme-count">${Object.keys(theme.words).length} ${t('words')}</div>
      `;
      
      themeCard.addEventListener('click', () => toggleTheme(themeKey));
      themesGrid.appendChild(themeCard);
    });
    
    updateSelectedCount();
  }

  // Toggle theme selection
  function toggleTheme(themeKey) {
    const index = gameState.selectedThemes.indexOf(themeKey);
    
    if (index > -1) {
      // Deselect
      gameState.selectedThemes.splice(index, 1);
    } else {
      // Select
      gameState.selectedThemes.push(themeKey);
    }
    
    renderThemes();
  }

  // Update selected count and button state
  function updateSelectedCount() {
    const count = gameState.selectedThemes.length;
    selectedCount.textContent = count;
    confirmThemesBtn.disabled = count === 0;
  }

  // Confirm themes and go to setup
  confirmThemesBtn.addEventListener('click', () => {
    if (gameState.selectedThemes.length > 0) {
      showScreen('setup-screen');
    }
  });

  // Re-render when language changes
  document.addEventListener('language-changed', () => {
    renderThemes();
  });

  // Initialize themes display
  renderThemes();
});
