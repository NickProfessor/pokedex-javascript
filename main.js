const URL = "https://pokeapi.co/api/v2/pokemon/";

//Pega o pokemon
const getPokemon = async (id) => {
  let pokemon;
  try {
    const res = await fetch(URL + id);
    pokemon = await res.json();
  } catch (error) {
    console.log("Erro! " + error);
  }

  return pokemon;
};

//Pega o nome do pokemon
const pokemonName = async (id) => {
  const pokemon = await getPokemon(id);
  return pokemon.name;
};

//Pega os ataques
const listPokemonAtaccks = async (id) => {
  const pokemon = await getPokemon(id);
  const listaDeAtaques = await pokemon.moves;
  return listaDeAtaques;
};

//Pega ataques específicos
const pokemonAtaccks = async (id, numeroDeAtaques) => {
  const ataquesDisponiveis = await listPokemonAtaccks(id);
  let ataquesDesejados = [];
  for (let i = 0; i < numeroDeAtaques; i++) {
    const ataque = ataquesDisponiveis[i];
    ataquesDesejados.push(ataque);
  }
  return ataquesDesejados;
};

//
console.log(await pokemonAtaccks(1, 20));

// nome = data.name
// habilidades = data.abilities
// nome da habilidade = data.abilities[i].ability.name
// detalhe da habilidade = data.abilities[i].ability.url
// sons de choro = data.cries
// som de choro = data.cries.latest / legacy
// id = data.id
// ataques = data.moves
// nome do ataque = data.moves[i].move.name
// altura = data.height
// rota para forma = pokemon-form/{i}
// rota para ataque = move/{i}
// nome da espécie = data.species.name
// detalhes da espécie = data.species.url
// detalhes das áreas de encontro = data.location_area_encounters
// fotos = data.sprites
// foto costas = data.sprites.back_default
// foto costas shiny = data.sprites.back_shiny
// foto frente = data.sprites.front_default
// foto frente shiny = data.sprites.front_shiny
// estatísticas = data.stats
// estatística básica de tal coisa = data.stats[i].base_stat
// nome da estatística = data.stats[i].stat.name
// detalhes da estátistica = data.stats[i].stat.url
// tipos = data.types
// ordem do tipo = data.types[i].slot
// nome do tipo = data.types[i].type.name
// detalhes do tipo = data.types[i].type.url
// peso = data.weight
// experiência base = data.base_experience
// rota para habilidade = ability/{i}
// rota para area de encontro = /pokemon/{i}/encounters
// rota para espécies = /pokemon-species/{i}
// rota para estátistica = /stat/{i} - 1 HP, 2 attack, 3 defense, 4 special-attack, 5 special-defense, 6 speed

// rota para o tipo = type/{i}
// 1-Normal, 2-Fighting, 3-Flying, 4-Poison, 5-Ground
// 6-Rock, 7-Bug, 8-Ghost, 9-Steel, 10-Fire
// 11-Water, 12-Grass, 13-Eletric, 14-Psychic, 15-Ice
// 16-Dragon, 17-Dark, 18-Fairy, 10001-Unknown, 10002-Shadow
