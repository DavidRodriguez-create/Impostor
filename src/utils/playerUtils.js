/**
 * Player Management Module
 */

// Dynamically count avatars using Vite's glob import
// Using absolute path from project root (/public is served as /)
const avatarFiles = import.meta.glob('/avatars/avatar-*.png', { eager: false });
const AVATAR_COUNT = Object.keys(avatarFiles).length || 11; // Fallback to 11 if glob fails

// Track used avatars to avoid repetition
let usedAvatars = [];

/**
 * Get a non-repeating avatar ID
 * Tries to avoid repetition until all avatars are used
 */
function getAvailableAvatarId() {
  // If all avatars have been used, reset the pool
  if (usedAvatars.length >= AVATAR_COUNT) {
    usedAvatars = [];
  }
  
  // Get available avatar IDs
  const availableIds = [];
  for (let i = 1; i <= AVATAR_COUNT; i++) {
    if (!usedAvatars.includes(i)) {
      availableIds.push(i);
    }
  }
  
  // Pick random from available
  const avatarId = availableIds[Math.floor(Math.random() * availableIds.length)];
  usedAvatars.push(avatarId);
  
  return avatarId;
}

/**
 * Reset avatar selection pool
 * Call this when starting a new game
 */
export function resetAvatarPool() {
  usedAvatars = [];
}

/**
 * Create a new player object
 * @param {string} name - Player name
 * @returns {object} Player object
 */
export function createPlayer(name) {
  const avatarId = getAvailableAvatarId();
  return {
    id: Date.now() + Math.random(),
    name,
    avatar: `./avatars/avatar-${avatarId}.png`,
    isImpostor: false
  };
}

/**
 * Validate player count
 * @param {number} currentCount - Current number of players
 * @param {number} maxPlayers - Maximum allowed players
 * @returns {boolean} Whether more players can be added
 */
export function canAddPlayer(currentCount, maxPlayers) {
  return currentCount < maxPlayers;
}

/**
 * Remove player from array by ID
 * @param {Array} players - Array of players
 * @param {number} playerId - ID of player to remove
 * @returns {Array} Filtered array without the player
 */
export function removePlayerById(players, playerId) {
  return players.filter(p => p.id !== playerId);
}

/**
 * Find player by ID
 * @param {Array} players - Array of players
 * @param {number} playerId - ID of player to find
 * @returns {object|undefined} Player object or undefined
 */
export function findPlayerById(players, playerId) {
  return players.find(p => p.id === playerId);
}
