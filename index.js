const { pikachu, totodile } = require("./pokemons");

const levelAttributesMultipliers = {
  health: 10,
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

console.log(`Valid ${pikachu.name}:`, isValidPokemon(pikachu));
console.log(`Valid ${totodile.name}:`, isValidPokemon(totodile));
