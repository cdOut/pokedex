import {IPokemon} from '../screens/ListScreen';

export const getPokemonId = (url: string): string => {
  const urlArray = url.split('/');
  return urlArray[urlArray.length - 2];
};

export const getPokemonImage = (id: string): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export const stringifyPokemonId = (id: string): string => {
  let idNum = parseInt(id, 10) * 10;
  while (idNum < 1000) {
    id = '0' + id;
    idNum *= 10;
  }
  return id;
};

export const createPokemonObject = (result: {
  id: any;
  name: any;
  types: {type: {name: string}}[];
  weight: any;
  height: any;
  abilities: {ability: {name: string}}[];
  stats: {base_stat: number}[];
}): IPokemon => {
  let pokemon: IPokemon = {
    id: result.id,
    name: result.name,
    types: result.types.map((type: {type: {name: string}}) =>
      type.type.name.toUpperCase(),
    ),
    weight: result.weight,
    height: result.height,
    moves: result.abilities.map(
      (ability: {ability: {name: string}}) => ability.ability.name,
    ),
    stats: result.stats.map((stat: {base_stat: number}) => stat.base_stat),
  };
  return pokemon;
};

export const fetchPokemonData = async (id: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const json = await response.json();
  return json;
};

export const fetchPokemonDescription = async (id: string, amount: number) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`,
  );
  const json = await response.json();
  let filtered = json.flavor_text_entries.filter(
    (flavorText: {language: {name: string}}) => {
      return flavorText.language.name === 'en';
    },
  );
  filtered = filtered
    .slice(0, (amount - 1) * 2 + 1)
    .map((element: {flavor_text: string}) => element.flavor_text);
  filtered.forEach((element: string, index: number, array: string[]) => {
    array[index] = element.replace(/\s+/g, ' ').trim();
  });
  return [filtered[0], filtered[2]];
};

export const convertHexToOpacityRGBA = (hex: string, alpha: number) => {
  let r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
};
