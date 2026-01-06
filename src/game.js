import { selectRandomWord, getTranslatedWord } from './data/themes.js';
import { createPlayer, canAddPlayer, removePlayerById, resetAvatarPool } from './utils/playerUtils.js';
import { selectImpostors, resetPlayerRoles, markImpostors } from './utils/roleUtils.js';
import { formatTime, calculateEndTime, getRemainingTime } from './utils/timerUtils.js';

/**
 * Game State Management
 * Central state manager for the Impostor game
 */
class GameState {
  constructor() {
    // Player management
    this.players = [];
    this.maxPlayers = 100;
    
    // Game configuration
    this.impostorCount = 1;
    this.selectedThemes = [];
    this.gameWord = '';
    this.gameWordTheme = null;  // Store theme key
    this.gameWordKey = null;    // Store word key for translation
    
    // Timer configuration
    this.timerMode = 'infinite';
    this.timerMinutes = 5;
    this.timerInterval = null;
    this.gameStartTime = null;
    
    // Game flow
    this.currentPlayerIndex = 0;
    this.revealOrder = []; // Shuffled indices for reveal order
    this.impostors = [];
    this.revealedImpostors = [];
    this.votedPlayers = [];
    this.votingResults = [];
    this.allVotedPlayerIds = []; // Track all players ever voted for
  }

  // Shuffle array using Fisher-Yates algorithm
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Player Management Methods
  
  addPlayer(name) {
    if (!canAddPlayer(this.players.length, this.maxPlayers)) {
      return false;
    }
    this.players.push(createPlayer(name));
    return true;
  }

  removePlayer(playerId) {
    this.players = removePlayerById(this.players, playerId);
  }

  // Role Assignment Methods
  
  assignRoles() {
    // Reset avatar pool for new game
    resetAvatarPool();
    
    // Select random word for this round
    const wordData = selectRandomWord(this.selectedThemes);
    this.gameWord = wordData.word;
    this.gameWordTheme = wordData.themeKey;
    this.gameWordKey = wordData.wordKey;
    
    // Reset and assign new roles
    resetPlayerRoles(this.players);
    this.impostors = selectImpostors(this.players, this.impostorCount);
    markImpostors(this.players, this.impostors);
    
    // Create shuffled reveal order
    const indices = this.players.map((_, index) => index);
    this.revealOrder = this.shuffleArray(indices);
    
    // Reset game flow
    this.revealedImpostors = [];
    this.currentPlayerIndex = 0;
  }

  // Get current translated word
  getCurrentWord() {
    if (this.gameWordTheme && this.gameWordKey) {
      return getTranslatedWord(this.gameWordTheme, this.gameWordKey);
    }
    return this.gameWord;
  }

  // Player Navigation Methods
  
  getCurrentPlayer() {
    const revealIndex = this.revealOrder[this.currentPlayerIndex];
    return this.players[revealIndex];
  }

  nextPlayer() {
    this.currentPlayerIndex++;
    return this.currentPlayerIndex < this.players.length;
  }

  isLastPlayer() {
    return this.currentPlayerIndex === this.players.length - 1;
  }

  // Timer Methods
  
  startGameTimer() {
    if (this.timerMode !== 'timed') return;
    
    this.gameStartTime = Date.now();
    const endTime = calculateEndTime(this.timerMinutes);
    
    this.timerInterval = setInterval(() => {
      const remaining = getRemainingTime(endTime);
      
      if (remaining <= 0) {
        this.stopTimer();
        return;
      }
      
      this.updateTimerDisplay(formatTime(remaining));
      
      // Enable reveal button when time is up
      if (remaining <= 0) {
        this.enableRevealButton();
      }
    }, 100);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.updateTimerDisplay('0:00');
    this.enableRevealButton();
  }

  updateTimerDisplay(timeString) {
    const timerText = document.getElementById('timer-text');
    if (timerText) {
      timerText.textContent = timeString;
    }
  }

  enableRevealButton() {
    const revealBtn = document.getElementById('reveal-impostor-btn');
    const voteBtn = document.getElementById('vote-btn');
    if (revealBtn) {
      revealBtn.disabled = false;
    }
    if (voteBtn) {
      voteBtn.disabled = false;
    }
  }

  // Impostor Reveal Methods
  
  revealNextImpostor() {
    const unrevealed = this.impostors.filter(
      imp => !this.revealedImpostors.find(r => r.id === imp.id)
    );
    
    if (unrevealed.length > 0) {
      this.revealedImpostors.push(unrevealed[0]);
      return unrevealed[0];
    }
    return null;
  }

  hasMoreImpostors() {
    return this.revealedImpostors.length < this.impostors.length;
  }

  // Voting Methods
  
  voteForPlayer(playerId) {
    const index = this.votedPlayers.indexOf(playerId);
    if (index > -1) {
      // Unvote
      this.votedPlayers.splice(index, 1);
      return false;
    } else if (this.votedPlayers.length < this.impostorCount) {
      // Vote
      this.votedPlayers.push(playerId);
      return true;
    }
    return false;
  }

  isPlayerVoted(playerId) {
    return this.votedPlayers.includes(playerId);
  }

  getRemainingVotes() {
    return this.impostorCount - this.votedPlayers.length;
  }

  processVotes() {
    this.votingResults = this.votedPlayers.map(votedId => {
      const player = this.players.find(p => p.id === votedId);
      const isImpostor = this.impostors.find(imp => imp.id === votedId);
      
      // Add ALL voted players to tracking list (correct or wrong)
      if (!this.allVotedPlayerIds.includes(votedId)) {
        this.allVotedPlayerIds.push(votedId);
      }
      
      if (isImpostor && !this.revealedImpostors.find(r => r.id === votedId)) {
        this.revealedImpostors.push(player);
      }
      
      return {
        player,
        isImpostor: !!isImpostor,
        correct: !!isImpostor
      };
    });
    
    return this.votingResults;
  }

  hasBeenVotedBefore(playerId) {
    return this.allVotedPlayerIds.includes(playerId);
  }

  resetVoting() {
    this.votedPlayers = [];
    // Don't reset votingResults or allVotedPlayerIds - keep history
  }

  // Reset Methods
  
  reset() {
    this.stopTimer();
    this.currentPlayerIndex = 0;
    this.impostors = [];
    this.revealedImpostors = [];
    this.gameStartTime = null;
    this.votedPlayers = [];
    this.votingResults = [];
    this.allVotedPlayerIds = [];
  }

  resetAll() {
    this.reset();
    this.players = [];
  }
}

export const gameState = new GameState();
