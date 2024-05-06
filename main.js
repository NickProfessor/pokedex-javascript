const container = document.querySelector(".container");

const URL = "https://pokeapi.co/api/v2/pokemon/";
const ENCOUNTERS_LOCATION = "/encounters";
// Fotos do pokemon
const SPRITES =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const BACK_DEFAULT_SPRITE = "/back/";
const BACK_SHINY = "/back/shiny/";
const FRONT_SHINY = "/shiny/";
// dream world usar .svg
const DREAM_WORLD = "/other/dream-world/";
const HOME_FRONT_DEFAULT = "/other/home/";
const HOME_FRONT_SHINY = "/other/home/shiny/";
const ARTWORK_FRONT_DEFAULT = "/other/official-artwork/";
const ARTWORK_FRONT_SHINY = "/other/official-artwork/shiny/";
// showdown usar .gif
const SHOWDOWN_BACK_DEFAULT = "/other/showdown/back/";
const SHOWDOWN_BACK_SHINY = "/other/showdown/back/shiny/";
const SHOWDOWN_FRONT_DEFAULT = "/other/showdown/";
const SHOWDOWN_FRONT_SHINY = "/other/showdown/shiny/";

// Fim
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
const getPokemonName = async (id) => {
  const pokemon = await getPokemon(id);
  return pokemon.name;
};

//Pega os ataques
const getListPokemonAtaccks = async (id) => {
  const pokemon = await getPokemon(id);
  const listaDeAtaques = await pokemon.moves;
  return listaDeAtaques;
};

//Pega ataques específicos
const pokemonAtaccks = async (id, numeroDeAtaques) => {
  const ataquesDisponiveis = await getListPokemonAtaccks(id);
  let ataquesDesejados = [];
  for (let i = 0; i < numeroDeAtaques; i++) {
    const ataque = ataquesDisponiveis[i];
    ataquesDesejados.push(ataque);
  }
  console.log(ataquesDesejados);
  return getPokemonAtaccksDetails(ataquesDesejados);
};

//Pega detalhes dos ataques específicos
const getPokemonAtaccksDetails = async (listaDosAtaques) => {
  const nomeDosAtaques = [];
  const urlDosAtaques = [];
  const detalhes = { nomeDosAtaques, urlDosAtaques };
  listaDosAtaques.forEach((ataque) => {
    nomeDosAtaques.push(ataque.move.name);
    urlDosAtaques.push(ataque.move.url);
  });

  return detalhes;
};
//Pega  o local de encontro
const getLocationEncounterPokemon = async (id) => {
  let location;
  try {
    const res = await fetch(URL + id + ENCOUNTERS_LOCATION);
    const data = await res.json();
    location = data.map((local) => {
      const nameLocal = local.location_area.name;
      return nameLocal;
    });
  } catch (error) {
    console.log("Erro! " + error);
  }

  return location;
};

const getImagesPokemon = (id) => {
  const padraoCostas = SPRITES + BACK_DEFAULT_SPRITE + id + ".png";
  const padrao = SPRITES + id + ".png";
  const shinyCostas = SPRITES + BACK_SHINY + id + ".png";
  const shiny = SPRITES + FRONT_SHINY + id + ".png";
  const dreamWorld = SPRITES + DREAM_WORLD + id + ".svg";
  const homePadraoFrente = SPRITES + HOME_FRONT_DEFAULT + id + ".png";
  const homeShinyFrente = SPRITES + HOME_FRONT_SHINY + id + ".png";
  const artWorkPadraoFrente = SPRITES + ARTWORK_FRONT_DEFAULT + id + ".png";
  const artWorkShinyFrente = SPRITES + ARTWORK_FRONT_SHINY + id + ".png";
  const todasAsFotos = {
    padraoCostas,
    padrao,
    shinyCostas,
    shiny,
    dreamWorld,
    homePadraoFrente,
    homeShinyFrente,
    artWorkPadraoFrente,
    artWorkShinyFrente,
  };
  return todasAsFotos;
};

const fotos = getImagesPokemon(300);
container.innerHTML += `<img src=${fotos.padraoCostas}>`;

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
