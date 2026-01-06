/**
 * Timer Management Module
 */

/**
 * Format time remaining in MM:SS format
 * @param {number} milliseconds - Time remaining in milliseconds
 * @returns {string} Formatted time string
 */
export function formatTime(milliseconds) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Calculate end time
 * @param {number} minutes - Duration in minutes
 * @returns {number} End timestamp
 */
export function calculateEndTime(minutes) {
  return Date.now() + (minutes * 60 * 1000);
}

/**
 * Check if time has expired
 * @param {number} endTime - End timestamp
 * @returns {boolean} Whether time has expired
 */
export function hasTimeExpired(endTime) {
  return Date.now() >= endTime;
}

/**
 * Get remaining time
 * @param {number} endTime - End timestamp
 * @returns {number} Remaining time in milliseconds
 */
export function getRemainingTime(endTime) {
  return Math.max(0, endTime - Date.now());
}
