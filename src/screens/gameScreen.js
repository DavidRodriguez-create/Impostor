import { gameState } from '../game.js';
import { showScreen } from '../main.js';
import { t } from '../data/translations.js';

// Game Screen Logic
document.addEventListener('DOMContentLoaded', () => {
  const timerText = document.getElementById('timer-text');
  const timerDisplay = document.querySelector('.timer-display');
  const gameHeader = document.querySelector('#game-screen h2');
  const gameInfo = document.querySelector('.game-info');
  const impostorsRemainingSpan = document.getElementById('impostors-remaining');
  const revealImpostorBtn = document.getElementById('reveal-impostor-btn');
  const voteBtn = document.getElementById('vote-btn');
  const votingSection = document.getElementById('voting-section');
  const votingPlayersList = document.getElementById('voting-players-list');
  const votesRemainingSpan = document.getElementById('votes-remaining');
  const confirmVotesBtn = document.getElementById('confirm-votes-btn');
  const revealedImpostorsDiv = document.getElementById('revealed-impostors');
  const winnersSection = document.getElementById('winners-section');
  const winnersContent = document.getElementById('winners-content');
  const gameOverActions = document.getElementById('game-over-actions');
  const playAgainBtn = document.getElementById('play-again-btn');
  const backToSetupBtn = document.getElementById('back-to-setup-btn');

  function displayWinners() {
    winnersContent.innerHTML = '';
    winnersSection.style.display = 'block';
    
    // Check which impostors were revealed by button (not discovered through voting)
    const buttonRevealedCards = document.querySelectorAll('.revealed-impostor-card.revealed-by-button');
    const buttonRevealedImpostors = [];
    
    buttonRevealedCards.forEach(card => {
      const playerName = card.querySelector('h3').textContent;
      const impostor = gameState.players.find(p => p.name === playerName && p.isImpostor);
      if (impostor) {
        buttonRevealedImpostors.push(impostor);
      }
    });
    
    // Players win only if ALL impostors were discovered through voting (no button reveals)
    const playersWin = buttonRevealedImpostors.length === 0 && 
                       gameState.revealedImpostors.length === gameState.impostorCount;
    
    if (playersWin) {
      // All impostors found through voting - regular players win
      winnersContent.innerHTML = `
        <div class="winners-announcement">
          <h2>${t('winnersPlayers')}</h2>
        </div>
      `;
    } else {
      // Impostors win - show those who weren't discovered (button revealed or escaped)
      const winningImpostors = gameState.players.filter(p => {
        if (!p.isImpostor) return false;
        
        // Check if this impostor was revealed by button
        const revealedByButton = buttonRevealedImpostors.find(imp => imp.id === p.id);
        if (revealedByButton) return true;
        
        // Check if this impostor escaped (never revealed)
        const wasRevealed = gameState.revealedImpostors.find(r => r.id === p.id);
        if (!wasRevealed) return true;
        
        return false;
      });
      
      winnersContent.innerHTML = `
        <div class="winners-announcement">
          <h2>${t('winnersImpostors')}</h2>
          <div class="winners-list">
            ${winningImpostors.map(impostor => `
              <div class="winner-card">
                <img src="${impostor.avatar}" alt="${impostor.name}" class="winner-avatar">
                <div class="winner-name">${impostor.name}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  }

  function hideWinnersFromList() {
    // Get all winner player names from winners section
    const winnerCards = winnersContent.querySelectorAll('.winner-card');
    const winnerNames = Array.from(winnerCards).map(card => 
      card.querySelector('.winner-name').textContent
    );
    
    // If players won (no winner cards), hide all impostors from the list
    if (winnerNames.length === 0) {
      // Players won - hide all impostors
      const allCards = revealedImpostorsDiv.querySelectorAll('.revealed-impostor-card');
      allCards.forEach(card => {
        const badges = card.querySelector('.impostor-badges');
        if (badges) {
          // This is an impostor card - hide it
          card.style.display = 'none';
        }
      });
    } else {
      // Impostors won - hide only the winning impostors
      const allCards = revealedImpostorsDiv.querySelectorAll('.revealed-impostor-card');
      allCards.forEach(card => {
        const playerName = card.querySelector('h3').textContent;
        if (winnerNames.includes(playerName)) {
          card.style.display = 'none';
        }
      });
    }
  }

  function checkOnlyImpostorsRemainUnvoted() {
    // Get all players who have NOT been voted for yet
    const unvotedPlayers = gameState.players.filter(player => 
      !gameState.allVotedPlayerIds.includes(player.id)
    );
    
    // If no unvoted players remain, return false (all voted)
    if (unvotedPlayers.length === 0) {
      return false;
    }
    
    // Check if ALL unvoted players are impostors
    const allUnvotedAreImpostors = unvotedPlayers.every(player => player.isImpostor);
    
    return allUnvotedAreImpostors;
  }

  function initializeGameScreen() {
    // Reset header text
    document.querySelector('#game-screen h2').textContent = t('gameStarted');
    
    // Ensure timer and info sections are visible
    timerDisplay.style.display = 'flex';
    gameHeader.style.display = 'block';
    gameInfo.style.display = 'block';
    
    // Set initial impostor count
    impostorsRemainingSpan.textContent = gameState.impostorCount;
    revealedImpostorsDiv.innerHTML = '';
    winnersSection.style.display = 'none';
    winnersContent.innerHTML = '';
    gameOverActions.style.display = 'none';
    votingSection.style.display = 'none';
    voteBtn.style.display = 'inline-block';
    revealImpostorBtn.style.display = 'inline-block';
    revealImpostorBtn.textContent = t('revealImpostor');

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
      revealImpostorBtn.style.display = 'none';
      voteBtn.style.display = 'none';
      timerDisplay.style.display = 'none';
      gameInfo.style.display = 'none';
      document.querySelector('#game-screen h2').textContent = t('gameOver');
      gameState.stopTimer();
      displayWinners();
      hideWinnersFromList();
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
    timerDisplay.style.display = 'none';
    gameHeader.style.display = 'none';
    gameInfo.style.display = 'none';
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
    timerDisplay.style.display = 'flex';
    gameInfo.style.display = 'block';
    
    // Update remaining count
    const remaining = gameState.impostorCount - gameState.revealedImpostors.length;
    impostorsRemainingSpan.textContent = remaining;
    
    // Check if only impostors remain unvoted (automatic impostor victory)
    const onlyImpostorsRemain = checkOnlyImpostorsRemainUnvoted();
    
    if (onlyImpostorsRemain) {
      // Impostors win automatically - only impostors left to vote for
      voteBtn.style.display = 'none';
      revealImpostorBtn.style.display = 'none';
      timerDisplay.style.display = 'none';
      gameInfo.style.display = 'none';
      gameHeader.style.display = 'block';
      document.querySelector('#game-screen h2').textContent = t('gameOver');
      gameState.stopTimer();
      displayWinners();
      hideWinnersFromList();
      gameOverActions.style.display = 'flex';
    }
    // Check if all impostors found
    else if (!gameState.hasMoreImpostors()) {
      voteBtn.style.display = 'none';
      revealImpostorBtn.style.display = 'none';
      timerDisplay.style.display = 'none';
      gameInfo.style.display = 'none';
      gameHeader.style.display = 'block';
      document.querySelector('#game-screen h2').textContent = t('gameOver');
      gameState.stopTimer();
      displayWinners();
      hideWinnersFromList();
      gameOverActions.style.display = 'flex';
    } else {
      gameHeader.style.display = 'block';
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

    // Update winners section if visible
    if (winnersSection.style.display !== 'none') {
      const winnersTitle = winnersSection.querySelector('.winners-announcement h2');
      if (winnersTitle) {
        // Check if it's players win or impostors win based on current text
        const isPlayersWin = winnersTitle.textContent.includes('Jugadores') || 
                             winnersTitle.textContent.includes('Players') ||
                             winnersTitle.textContent.includes('Joueurs') ||
                             winnersTitle.textContent.includes('玩家');
        winnersTitle.textContent = isPlayersWin ? t('winnersPlayers') : t('winnersImpostors');
      }
    }
  });
});
