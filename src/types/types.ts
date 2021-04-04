export type Character = {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: Array<string>;
  species: Array<string>;
  starships: Array<string>;
  vehicles: Array<string>;
  url: string;
  created: string;
  edited: string;
};

export type CharacterResponse = {
  results: Array<Character>;
};

export type Film = {
  title: string;
  url: string;
};

export type FilmResponse = {
  results: Array<Film>;
};
