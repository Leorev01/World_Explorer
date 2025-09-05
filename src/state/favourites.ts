import { makeVar } from '@apollo/client';

export const favoriteCodesVar = makeVar<string[]>([]);

export const toggleFavorite = (code: string) => {
  const curr = favoriteCodesVar();
  favoriteCodesVar(curr.includes(code) ? curr.filter(c => c !== code) : [...curr, code]);
};
