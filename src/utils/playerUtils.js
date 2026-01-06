/**
 * Player Management Module
 */

const AVATAR_COUNT = 11;

/**
 * Create a new player object
 * @param {string} name - Player name
 * @returns {object} Player object
 */
export function createPlayer(name) {
  const avatarId = Math.floor(Math.random() * AVATAR_COUNT) + 1;
  return {
    id: Date.now() + Math.random(),
    name,
    avatar: `/avatars/avatar-${avatarId}.png`,
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
