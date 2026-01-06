/**
 * Role Assignment Module
 */

/**
 * Shuffle array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} New shuffled array
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Select random impostors from players
 * @param {Array} players - Array of all players
 * @param {number} count - Number of impostors to select
 * @returns {Array} Array of selected impostor objects
 */
export function selectImpostors(players, count) {
  const shuffled = shuffleArray(players);
  return shuffled.slice(0, count);
}

/**
 * Reset all players to non-impostor status
 * @param {Array} players - Array of players
 */
export function resetPlayerRoles(players) {
  players.forEach(p => p.isImpostor = false);
}

/**
 * Mark players as impostors
 * @param {Array} players - Array of all players
 * @param {Array} impostors - Array of players to mark as impostors
 */
export function markImpostors(players, impostors) {
  impostors.forEach(impostor => {
    const player = players.find(p => p.id === impostor.id);
    if (player) {
      player.isImpostor = true;
    }
  });
}

/**
 * Validate impostor count
 * @param {number} impostorCount - Desired impostor count
 * @param {number} playerCount - Total player count
 * @returns {boolean} Whether the impostor count is valid
 */
export function validateImpostorCount(impostorCount, playerCount) {
  return impostorCount >= 1 && impostorCount < playerCount / 2;
}
