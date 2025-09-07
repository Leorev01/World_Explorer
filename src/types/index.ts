export type Language = { code: string; name: string; native?: string | null };
export type Continent = { code: string; name: string; countries: Country[] };
export type Country = {
  code: string;
  name: string;
  emoji: string;
  capital?: string | null;
  currency?: string | null;
  phone?: string | null;
  continent?: { code: string; name: string } | null;
  languages: Language[];
};
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  favourites?: string;
};
