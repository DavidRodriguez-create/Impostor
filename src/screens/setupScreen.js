import { gameState } from '../game.js';
import { showScreen } from '../main.js';
import { t } from '../data/translations.js';

// Setup Screen Logic
export function initSetupScreen() {
  const impostorPicker = document.getElementById('impostor-picker');
  const impostorCountValue = document.getElementById('impostor-count-value');
  const timerModeSelect = document.getElementById('timer-mode');
  const timerPicker = document.getElementById('timer-picker');
  const timerMinutesValue = document.getElementById('timer-minutes-value');
  const timerInputGroup = document.getElementById('timer-input-group');
  const playerNameInput = document.getElementById('player-name-input');
  const addPlayerBtn = document.getElementById('add-player-btn');
  const playersList = document.getElementById('players-list');
  const playerCount = document.getElementById('player-count');
  const startGameBtn = document.getElementById('start-game-btn');
  const backToThemesBtn = document.getElementById('back-to-themes-btn');

  // Check if elements exist
  if (!impostorPicker || !impostorCountValue) {
    console.error('Number picker elements not found');
    return;
  }

  // Number picker state
  let impostorCount = 1;
  let timerMinutes = 5;

  // Create vertical swipe handler
  function createSwipePicker(element, valueElement, getValue, setValue, min, getMax) {
    let startY = 0;
    let isDragging = false;

    const handleStart = (e) => {
      isDragging = true;
      startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
      element.style.cursor = 'grabbing';
      e.preventDefault();
    };

    const handleMove = (e) => {
      if (!isDragging) return;
      
      const currentY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
      const deltaY = startY - currentY;
      
      // Scale: every 20px = 1 value change (more sensitive)
      const sensitivity = 20;
      const change = Math.round(deltaY / sensitivity);
      
      if (Math.abs(change) > 0) {
        const currentValue = getValue();
        const maxValue = typeof getMax === 'function' ? getMax() : getMax;
        let newValue = currentValue + change;
        
        // Clamp value
        newValue = Math.max(min, Math.min(maxValue, newValue));
        
        if (newValue !== currentValue) {
          setValue(newValue);
          valueElement.textContent = newValue;
          startY = currentY; // Reset start point for continuous dragging
          
          // Visual feedback
          valueElement.style.transform = `scale(1.1)`;
          setTimeout(() => {
            valueElement.style.transform = 'scale(1)';
          }, 100);
        }
      }
    };

    const handleEnd = () => {
      isDragging = false;
      element.style.cursor = 'grab';
    };

    // Mouse events
    element.addEventListener('mousedown', handleStart);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);

    // Touch events
    element.addEventListener('touchstart', handleStart, { passive: false });
    element.addEventListener('touchmove', handleMove, { passive: false });
    element.addEventListener('touchend', handleEnd);
  }

  // Setup impostor count picker
  createSwipePicker(
    impostorPicker,
    impostorCountValue,
    () => impostorCount,
    (val) => {
      impostorCount = val;
      gameState.impostorCount = val;
      updateStartButton();
    },
    1,
    999
  );

  // Setup timer minutes picker
  createSwipePicker(
    timerPicker,
    timerMinutesValue,
    () => timerMinutes,
    (val) => {
      timerMinutes = val;
      gameState.timerMinutes = val;
    },
    1,
    30
  );

  // Update timer input visibility
  timerModeSelect.addEventListener('change', () => {
    gameState.timerMode = timerModeSelect.value;
    timerInputGroup.style.display = timerModeSelect.value === 'timed' ? 'block' : 'none';
  });

  // Back to themes button
  backToThemesBtn.addEventListener('click', () => {
    showScreen('theme-screen');
  });

  // Add player
  function addPlayer() {
    const name = playerNameInput.value.trim();
    if (!name) return;

    // Check if name already exists
    const nameExists = gameState.players.some(player => 
      player.name.toLowerCase() === name.toLowerCase()
    );
    
    if (nameExists) {
      alert(t('nameAlreadyUsed'));
      return;
    }

    if (gameState.addPlayer(name)) {
      playerNameInput.value = '';
      renderPlayers();
      updateStartButton();
    } else {
      alert(t('maxPlayersReached', { max: gameState.maxPlayers }));
    }
  }

  addPlayerBtn.addEventListener('click', addPlayer);
  playerNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addPlayer();
  });

  // Render players list
  function renderPlayers() {
    playersList.innerHTML = '';
    gameState.players.forEach(player => {
      const playerItem = document.createElement('div');
      playerItem.className = 'player-item';
      playerItem.innerHTML = `
        <img src="${player.avatar}" alt="${player.name}" class="player-avatar">
        <span class="player-name">${player.name}</span>
        <button class="btn-remove" data-id="${player.id}">✕</button>
      `;
      playersList.appendChild(playerItem);
    });

    playerCount.textContent = gameState.players.length;

    // Add remove listeners
    document.querySelectorAll('.btn-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const playerId = parseFloat(e.target.dataset.id);
        gameState.removePlayer(playerId);
        renderPlayers();
        updateStartButton();
        updateImpostorMax();
      });
    });
  }

  // Update impostor count max based on current players
  function updateImpostorMax() {
    // No longer limit the max, just validate when starting
  }

  // Update start button state
  function updateStartButton() {
    const canStart = gameState.players.length >= 3 && 
                     gameState.impostorCount < gameState.players.length &&
                     gameState.impostorCount >= 1 &&
                     gameState.selectedThemes.length > 0;
    startGameBtn.disabled = !canStart;
  }

  // Start game
  startGameBtn.addEventListener('click', () => {
    if (gameState.players.length < 3) {
      alert(t('needMinPlayers'));
      return;
    }

    if (gameState.impostorCount >= gameState.players.length) {
      alert(t('impostorsTooMany'));
      return;
    }

    // Assign roles and start
    gameState.assignRoles();
    showScreen('reveal-screen');
    
    // Trigger reveal screen initialization
    const event = new CustomEvent('game-start');
    document.dispatchEvent(event);
  });

  // Initialize
  updateImpostorMax();
  updateStartButton();
}

// Auto-initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initSetupScreen();
});
