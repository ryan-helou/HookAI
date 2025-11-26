export const getScoreColor = (score: number): string => {
  if (score >= 71) return 'text-green-400';
  if (score >= 41) return 'text-yellow-400';
  return 'text-red-400';
};

export const getScoreBgColor = (score: number): string => {
  if (score >= 71) return 'bg-green-500/20';
  if (score >= 41) return 'bg-yellow-500/20';
  return 'bg-red-500/20';
};
