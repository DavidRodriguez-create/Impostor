import { gameState } from '../game.js';
import { showScreen } from '../main.js';
import { t } from '../data/translations.js';

// Reveal Screen Logic
let touchStartY = 0;
let touchCurrentY = 0;
let isDragging = false;
let isRevealed = false;
let currentTranslateY = 0; // Track current position

document.addEventListener('DOMContentLoaded', () => {
  const currentPlayerAvatar = document.getElementById('current-player-avatar');
  const currentPlayerName = document.getElementById('current-player-name');
  const revealCard = document.getElementById('reveal-card');
  const revealCover = document.getElementById('reveal-cover');
  const revealContent = document.getElementById('reveal-content');
  const roleText = document.getElementById('role-text');
  const nextPlayerBtn = document.getElementById('next-player-btn');

  function showCurrentPlayer() {
    const player = gameState.getCurrentPlayer();
    if (!player) return;

    currentPlayerAvatar.src = player.avatar;
    currentPlayerName.textContent = player.name;

    // Set role text
    if (player.isImpostor) {
      roleText.innerHTML = `
        <div class="impostor-role">
          <span class="role-icon">🎭</span>
          <h3>${t('impostor')}</h3>
          <p>${t('impostorSubtitle')}</p>
        </div>
      `;
    } else {
      roleText.innerHTML = `
        <div class="word-role">
          <span class="role-icon">📝</span>
          <h3>${t('yourWordIs')}</h3>
          <p class="secret-word">${gameState.getCurrentWord()}</p>
        </div>
      `;
    }

    // Reset reveal state
    isRevealed = false;
    currentTranslateY = 0;
    revealCover.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    revealCover.style.transform = 'translateY(0)';
    revealCover.style.opacity = '1';

    // Update button text
    if (gameState.isLastPlayer()) {
      nextPlayerBtn.textContent = t('startGameNow');
    } else {
      nextPlayerBtn.textContent = t('nextPlayer');
    }
  }

  // Touch/Mouse handlers for swipe-up reveal
  function handleStart(e) {
    isDragging = true;
    touchStartY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    revealCard.style.cursor = 'grabbing';
    // Remove transition during drag for smooth movement
    revealCover.style.transition = 'none';
  }

  function handleMove(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    touchCurrentY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    
    // Calculate distance moved from original start position
    const deltaY = touchStartY - touchCurrentY;
    
    // Calculate new position based on initial position plus delta
    let newTranslateY = currentTranslateY + deltaY;
    
    // Clamp between 0 and 300
    newTranslateY = Math.max(0, Math.min(300, newTranslateY));
    
    const opacity = Math.max(0, 1 - (newTranslateY / 300));
    
    revealCover.style.transform = `translateY(-${newTranslateY}px)`;
    revealCover.style.opacity = opacity;

    // Update revealed state based on position
    if (newTranslateY >= 150) {
      isRevealed = true;
    } else if (newTranslateY <= 50) {
      isRevealed = false;
    }
  }

  function handleEnd() {
    if (!isDragging) return;
    
    isDragging = false;
    revealCard.style.cursor = 'grab';
    
    // Calculate final position based on current drag
    const deltaY = touchStartY - touchCurrentY;
    let finalTranslateY = currentTranslateY + deltaY;
    finalTranslateY = Math.max(0, Math.min(300, finalTranslateY));
    
    // Re-enable transition for snap animation
    revealCover.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

    // Determine snap position based on final drag position
    if (finalTranslateY >= 150) {
      // Snap to revealed (fully up)
      isRevealed = true;
      currentTranslateY = 300;
      revealCover.style.transform = 'translateY(-300px)';
      revealCover.style.opacity = '0';
    } else {
      // Snap to covered (fully down)
      isRevealed = false;
      currentTranslateY = 0;
      revealCover.style.transform = 'translateY(0)';
      revealCover.style.opacity = '1';
    }
  }

  // Add event listeners
  revealCard.addEventListener('touchstart', handleStart, { passive: false });
  revealCard.addEventListener('touchmove', handleMove, { passive: false });
  revealCard.addEventListener('touchend', handleEnd);
  
  revealCard.addEventListener('mousedown', handleStart);
  document.addEventListener('mousemove', handleMove);
  document.addEventListener('mouseup', handleEnd);

  // Next player button
  nextPlayerBtn.addEventListener('click', () => {
    if (gameState.nextPlayer()) {
      showCurrentPlayer();
    } else {
      // All players have seen their roles, start game
      showScreen('game-screen');
      
      // Trigger game screen initialization
      const event = new CustomEvent('reveal-complete');
      document.dispatchEvent(event);
    }
  });

  // Initialize when game starts
  document.addEventListener('game-start', () => {
    showCurrentPlayer();
  });

  // Update content when language changes
  document.addEventListener('language-changed', () => {
    // Only update if reveal screen is active
    const revealScreen = document.getElementById('reveal-screen');
    if (!revealScreen || !revealScreen.classList.contains('active')) {
      return;
    }
    
    console.log('Language changed on reveal screen, updating word...');
    
    // Re-render current player to update translations
    const player = gameState.getCurrentPlayer();
    if (player) {
      console.log('Player:', player.name, 'Is impostor:', player.isImpostor);
      
      // Update role text with new language
      if (player.isImpostor) {
        roleText.innerHTML = `
          <div class="impostor-role">
            <span class="role-icon">🎭</span>
            <h3>${t('impostor')}</h3>
            <p>${t('impostorSubtitle')}</p>
          </div>
        `;
      } else {
        const translatedWord = gameState.getCurrentWord();
        console.log('Translated word:', translatedWord);
        console.log('Your word is label:', t('yourWordIs'));
        roleText.innerHTML = `
          <div class="word-role">
            <span class="role-icon">📝</span>
            <h3>${t('yourWordIs')}</h3>
            <p class="secret-word">${translatedWord}</p>
          </div>
        `;
      }
      
      // Force a repaint to ensure changes are visible
      roleText.style.display = 'none';
      roleText.offsetHeight; // Trigger reflow
      roleText.style.display = '';

      // Update button text
      if (gameState.isLastPlayer()) {
        nextPlayerBtn.textContent = t('startGameNow');
      } else {
        nextPlayerBtn.textContent = t('nextPlayer');
      }
    }
  });
});
