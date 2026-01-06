import { gameState } from '../game.js';
import { showScreen } from '../main.js';
import { t } from '../data/translations.js';

// Game Screen Logic
document.addEventListener('DOMContentLoaded', () => {
  const timerText = document.getElementById('timer-text');
  const impostorsRemainingSpan = document.getElementById('impostors-remaining');
  const revealImpostorBtn = document.getElementById('reveal-impostor-btn');
  const voteBtn = document.getElementById('vote-btn');
  const votingSection = document.getElementById('voting-section');
  const votingPlayersList = document.getElementById('voting-players-list');
  const votesRemainingSpan = document.getElementById('votes-remaining');
  const confirmVotesBtn = document.getElementById('confirm-votes-btn');
  const revealedImpostorsDiv = document.getElementById('revealed-impostors');
  const gameOverActions = document.getElementById('game-over-actions');
  const playAgainBtn = document.getElementById('play-again-btn');
  const backToSetupBtn = document.getElementById('back-to-setup-btn');

  function initializeGameScreen() {
    // Set initial impostor count
    impostorsRemainingSpan.textContent = gameState.impostorCount;
    revealedImpostorsDiv.innerHTML = '';
    gameOverActions.style.display = 'none';
    votingSection.style.display = 'none';
    voteBtn.style.display = 'inline-block';
    revealImpostorBtn.style.display = 'inline-block';

    // Set timer display
    if (gameState.timerMode === 'infinite') {
      timerText.textContent = '∞';
      revealImpostorBtn.disabled = false;
      voteBtn.disabled = false;
    } else {
      timerText.textContent = `${gameState.timerMinutes}:00`;
      revealImpostorBtn.disabled = true;
      voteBtn.disabled = true;
      gameState.startGameTimer();
    }
    
    gameState.resetVoting();
  }

  // Reveal impostor button
  revealImpostorBtn.addEventListener('click', () => {
    const impostor = gameState.revealNextImpostor();
    if (!impostor) return;

    // Add revealed impostor to list with mocking message
    const impostorCard = document.createElement('div');
    impostorCard.className = 'revealed-impostor-card revealed-by-button';
    impostorCard.innerHTML = `
      <img src="${impostor.avatar}" alt="${impostor.name}" class="impostor-avatar">
      <div class="impostor-info">
        <h3>${impostor.name}</h3>
        <div class="impostor-badges">
          <span class="impostor-badge">🎭 ${t('impostor')}</span>
          <span class="reveal-message">${t('revealedByButton')}</span>
        </div>
      </div>
    `;
    revealedImpostorsDiv.appendChild(impostorCard);

    // Update remaining count
    const remaining = gameState.impostorCount - gameState.revealedImpostors.length;
    impostorsRemainingSpan.textContent = remaining;

    // Check if all impostors revealed
    if (!gameState.hasMoreImpostors()) {
      // Game over - all impostors revealed
      revealImpostorBtn.disabled = true;
      revealImpostorBtn.textContent = t('allRevealed');
      voteBtn.style.display = 'none';
      document.querySelector('#game-screen h2').textContent = t('gameOver');
      gameState.stopTimer();
      gameOverActions.style.display = 'flex';
    } else {
      // Game continues - more impostors to reveal
      document.querySelector('#game-screen h2').textContent = t('gameContinues');
      revealImpostorBtn.textContent = t('revealNextImpostor');
      revealImpostorBtn.disabled = false;
    }
  });

  // Vote button - show voting UI
  voteBtn.addEventListener('click', () => {
    votingSection.style.display = 'block';
    voteBtn.style.display = 'none';
    revealImpostorBtn.style.display = 'none';
    renderVotingPlayers();
  });

  function renderVotingPlayers() {
    votingPlayersList.innerHTML = '';
    votesRemainingSpan.textContent = gameState.getRemainingVotes();
    
    gameState.players.forEach(player => {
      // Check if player was already voted in ANY previous round
      if (gameState.hasBeenVotedBefore(player.id)) {
        return; // Skip this player
      }
      
      // Check if player is already revealed as impostor
      if (gameState.revealedImpostors.some(imp => imp.id === player.id)) {
        return; // Skip revealed impostors
      }
      
      const playerCard = document.createElement('div');
      playerCard.className = 'voting-player-card';
      
      if (gameState.isPlayerVoted(player.id)) {
        playerCard.classList.add('voted');
      }
      
      playerCard.innerHTML = `
        <img src="${player.avatar}" alt="${player.name}" class="voting-avatar">
        <span class="voting-player-name">${player.name}</span>
        <span class="vote-check">${gameState.isPlayerVoted(player.id) ? '✓' : ''}</span>
      `;
      
      playerCard.addEventListener('click', () => {
        gameState.voteForPlayer(player.id);
        renderVotingPlayers();
        updateConfirmButton();
      });
      
      votingPlayersList.appendChild(playerCard);
    });
  }

  function updateConfirmButton() {
    const votesCount = gameState.votedPlayers.length;
    confirmVotesBtn.disabled = votesCount === 0;
    votesRemainingSpan.textContent = gameState.getRemainingVotes();
  }

  // Confirm votes button
  confirmVotesBtn.addEventListener('click', () => {
    const results = gameState.processVotes();
    displayVotingResults(results);
    votingSection.style.display = 'none';
    
    // Update remaining count
    const remaining = gameState.impostorCount - gameState.revealedImpostors.length;
    impostorsRemainingSpan.textContent = remaining;
    
    // Check if all impostors found
    if (!gameState.hasMoreImpostors()) {
      voteBtn.style.display = 'none';
      revealImpostorBtn.style.display = 'none';
      document.querySelector('#game-screen h2').textContent = t('gameOver');
      gameState.stopTimer();
      gameOverActions.style.display = 'flex';
    } else {
      document.querySelector('#game-screen h2').textContent = t('gameContinues');
      voteBtn.style.display = 'inline-block';
      voteBtn.disabled = false;
      revealImpostorBtn.style.display = 'inline-block';
      revealImpostorBtn.disabled = false;
      revealImpostorBtn.textContent = t('revealNextImpostor');
    }
    
    gameState.resetVoting();
  });

  function displayVotingResults(results) {
    // Don't clear existing cards - just add new ones
    // This way previous voting rounds and button-revealed impostors stay visible
    
    // Add voting results
    results.forEach(result => {
      const resultCard = document.createElement('div');
      resultCard.className = `revealed-impostor-card ${result.correct ? 'correct-vote' : 'wrong-vote'}`;
      resultCard.innerHTML = `
        <img src="${result.player.avatar}" alt="${result.player.name}" class="impostor-avatar">
        <div class="impostor-info">
          <h3>${result.player.name}</h3>
          <span class="vote-result ${result.correct ? 'correct' : 'wrong'}">
            ${result.correct ? '✓ ' + t('correctGuess') : '✗ ' + t('wrongGuess')}
          </span>
        </div>
      `;
      revealedImpostorsDiv.appendChild(resultCard);
    });
  }

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

  // Update texts when language changes
  document.addEventListener('language-changed', () => {
    // Update button text based on current game state
    if (gameState.revealedImpostors.length === gameState.impostorCount) {
      // All revealed - game over
      revealImpostorBtn.textContent = t('allRevealed');
      document.querySelector('#game-screen h2').textContent = t('gameOver');
    } else if (gameState.revealedImpostors.length > 0) {
      // Game continues - more impostors to find
      revealImpostorBtn.textContent = t('revealNextImpostor');
      document.querySelector('#game-screen h2').textContent = t('gameContinues');
    } else {
      // Game started
      revealImpostorBtn.textContent = t('revealImpostor');
      document.querySelector('#game-screen h2').textContent = t('gameStarted');
    }

    // Update impostor badges in revealed list
    const impostorBadges = document.querySelectorAll('.impostor-badge');
    impostorBadges.forEach(badge => {
      badge.textContent = `🎭 ${t('impostor')}`;
    });

    // Update voting result texts (correct/wrong)
    const correctResults = document.querySelectorAll('.vote-result.correct');
    correctResults.forEach(result => {
      result.textContent = '✓ ' + t('correctGuess');
    });
    
    const wrongResults = document.querySelectorAll('.vote-result.wrong');
    wrongResults.forEach(result => {
      result.textContent = '✗ ' + t('wrongGuess');
    });

    // Update reveal messages for button-revealed impostors
    const revealMessages = document.querySelectorAll('.reveal-message');
    revealMessages.forEach(msg => {
      msg.textContent = t('revealedByButton');
    });

    // Update voting button text if visible
    if (voteBtn.style.display !== 'none') {
      voteBtn.textContent = t('voteForImpostors');
    }
  });
});
