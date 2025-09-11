/**
 * Formats a duration in seconds into a human-readable string (e.g., "10h", "45m", "30s").
 * @param totalSeconds - The total duration in seconds.
 * @returns A formatted string representing the duration.
 */
export const formatStudyTime = (totalSeconds: number): string => {
  if (totalSeconds < 60) {
    // Less than a minute, show in seconds
    return `${totalSeconds}s`;
  }

  const totalMinutes = Math.floor(totalSeconds / 60);
  if (totalMinutes < 60) {
    // Less than an hour, show in minutes
    return `${totalMinutes}m`;
  }

  const hours = totalSeconds / 3600;
  // Show hours with one decimal place for precision (e.g., 1.5h)
  return `${hours.toFixed(1)}h`;
};
