import { gameState } from '../game.js';
import { showScreen } from '../main.js';
import { t } from '../data/translations.js';

// Game Screen Logic
document.addEventListener('DOMContentLoaded', () => {
  const timerText = document.getElementById('timer-text');
  const impostorsRemainingSpan = document.getElementById('impostors-remaining');
  const revealImpostorBtn = document.getElementById('reveal-impostor-btn');
  const revealedImpostorsDiv = document.getElementById('revealed-impostors');
  const gameOverActions = document.getElementById('game-over-actions');
  const playAgainBtn = document.getElementById('play-again-btn');
  const backToSetupBtn = document.getElementById('back-to-setup-btn');

  function initializeGameScreen() {
    // Set initial impostor count
    impostorsRemainingSpan.textContent = gameState.impostorCount;
    revealedImpostorsDiv.innerHTML = '';
    gameOverActions.style.display = 'none';

    // Set timer display
    if (gameState.timerMode === 'infinite') {
      timerText.textContent = '∞';
      revealImpostorBtn.disabled = false;
    } else {
      timerText.textContent = `${gameState.timerMinutes}:00`;
      revealImpostorBtn.disabled = true;
      gameState.startGameTimer();
    }
  }

  // Reveal impostor button
  revealImpostorBtn.addEventListener('click', () => {
    const impostor = gameState.revealNextImpostor();
    if (!impostor) return;

    // Add revealed impostor to list
    const impostorCard = document.createElement('div');
    impostorCard.className = 'revealed-impostor-card';
    impostorCard.innerHTML = `
      <img src="${impostor.avatar}" alt="${impostor.name}" class="impostor-avatar">
      <div class="impostor-info">
        <h3>${impostor.name}</h3>
        <span class="impostor-badge">🎭 ${t('impostor')}</span>
      </div>
    `;
    revealedImpostorsDiv.appendChild(impostorCard);

    // Update remaining count
    const remaining = gameState.impostorCount - gameState.revealedImpostors.length;
    impostorsRemainingSpan.textContent = remaining;

    // Check if all impostors revealed
    if (!gameState.hasMoreImpostors()) {
      revealImpostorBtn.disabled = true;
      revealImpostorBtn.textContent = t('allRevealed');
      gameState.stopTimer();
      gameOverActions.style.display = 'flex';
    } else {
      // After first reveal, button is always enabled
      revealImpostorBtn.disabled = false;
    }
  });

  // Play again button
  playAgainBtn.addEventListener('click', () => {
    gameState.reset();
    gameState.assignRoles();
    showScreen('reveal-screen');
    
    // Trigger reveal screen initialization
    const event = new CustomEvent('game-start');
    document.dispatchEvent(event);
  });

  // Back to setup button
  backToSetupBtn.addEventListener('click', () => {
    gameState.reset();
    showScreen('setup-screen');
  });

  // Initialize when reveal is complete
  document.addEventListener('reveal-complete', () => {
    initializeGameScreen();
  });
});
