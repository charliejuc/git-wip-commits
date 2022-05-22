const { pikachu, totodile } = require("./pokemons");

const levelAttributesMultipliers = {
  health: 20,
  attack: 5,
  defense: 5,
};

const isValidPokemon = (pokemon) => {
  const maxHealth = pokemon.level * levelAttributesMultipliers.health;
  const maxAttack = pokemon.level * levelAttributesMultipliers.attack;
  const maxDefense = pokemon.level * levelAttributesMultipliers.defense;

  const isValidHealth = pokemon.health <= maxHealth;
  if (!isValidHealth) {
    return false;
  }

  const isValidAttack = pokemon.attack <= maxAttack;
  if (!isValidAttack) {
    return false;
  }

  const isValidDefense = pokemon.defense <= maxDefense;
  if (!isValidDefense) {
    return false;
  }

  return true;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const levelUpTraining = (pokemon) => {
  const _levelUpTraining = async (
    levels,
    _pokemonLeveledUp,
    _remainingLevels
  ) => {
    const remainingLevels = Number.isInteger(_remainingLevels)
      ? _remainingLevels
      : levels;
    const pokemonToLevelUp = _pokemonLeveledUp || pokemon;

    if (remainingLevels <= 0) {
      return pokemonToLevelUp;
    }

    const msToLevelUp = 300 * pokemon.level;
    await sleep(msToLevelUp);

    const newLevel = pokemonToLevelUp.level + 1;
    const pokemonLeveledUp = {
      ...pokemonToLevelUp,
      level: newLevel,
      health: pokemonToLevelUp.health + newLevel,
      attack: pokemonToLevelUp.attack + newLevel,
      defense: pokemonToLevelUp.defense + newLevel,
    };

    return _levelUpTraining(levels, pokemonLeveledUp, remainingLevels - 1);
  };

  return _levelUpTraining;
};

console.log(`Valid ${pikachu.name}:`, isValidPokemon(pikachu));
console.log(`Valid ${totodile.name}:`, isValidPokemon(totodile));

(async () => {
  const levels = 3;
  const pikachuLeveledUp = await levelUpTraining(pikachu)(levels);

  console.log({ pikachu });
  console.log({ pikachuLeveledUp });

  console.log(
    `Valid ${pikachuLeveledUp.name} leveled up:`,
    isValidPokemon(pikachuLeveledUp)
  );
})();
