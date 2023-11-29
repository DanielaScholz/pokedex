/**
 * Returns the color code associated with a given Pokemon type.
 * @param {string} type - The type of the Pokemon.
 * @returns {string | undefined} The color code corresponding to the Pokemon type.
 */
function paintCardOfType(type) {

  return {
    fire: "#F07F2F",
    grass: "#78C84F",
    water: "#6890F0",
    poison: "#A040A1",
    flying: "#A890F0",
    normal: "#A9A878",
    bug: "#A8B821",
    dark: "#6f5848",
    dragon: "#7038F9",
    electric: "#F8D030",
    fairy: "#FFA3B1",
    fighting: "#C03028",
    ghost: "#705798",
    ground: "#E0C069",
    ice: "#98D8D8",
    psychic: "#F85888",
    rock: "#B7A038",
    steel: "#B8B8D0"
  }[type];
}

