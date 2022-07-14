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

export const fetchPokemonData = async (id: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const json = await response.json();
  return json;
};
