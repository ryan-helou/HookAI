/**
 * Maps hook scores to color values for visual feedback
 */

export const getScoreColor = (score: number): string => {
  if (score <= 40) return 'bg-red-500';        // Low
  if (score <= 70) return 'bg-yellow-500';    // Medium
  return 'bg-green-500';                       // High
};

export const getScoreColorText = (score: number): string => {
  if (score <= 40) return 'text-red-600';
  if (score <= 70) return 'text-yellow-600';
  return 'text-green-600';
};

export const getScoreLabel = (score: number): string => {
  if (score <= 40) return 'Low';
  if (score <= 70) return 'Medium';
  return 'High';
};

export const getScoreBorder = (score: number): string => {
  if (score <= 40) return 'border-red-200';
  if (score <= 70) return 'border-yellow-200';
  return 'border-green-200';
};
