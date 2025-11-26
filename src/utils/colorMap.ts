export const getScoreColor = (score: number): string => {
  if (score >= 80) return 'text-emerald-600 font-bold';
  if (score >= 60) return 'text-amber-600 font-bold';
  if (score >= 40) return 'text-orange-600 font-bold';
  return 'text-rose-600 font-bold';
};

export const getScoreBgColor = (score: number): string => {
  if (score >= 80) return 'bg-emerald-50';
  if (score >= 60) return 'bg-amber-50';
  if (score >= 40) return 'bg-orange-50';
  return 'bg-rose-50';
};

export const getScoreBorderColor = (score: number): string => {
  if (score >= 80) return 'border-emerald-200';
  if (score >= 60) return 'border-amber-200';
  if (score >= 40) return 'border-orange-200';
  return 'border-rose-200';
};
