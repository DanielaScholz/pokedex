
/**
 * Initializes the application by fetching Pokemon data.
 */
async function init() {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    let response = await fetch(url);
    loadedPokemons = await response.json();
    loadPokemon(offset);
    offset = limit;
    limit = (offset + 20);
}


/**
 * Loads Pokemon data based on the provided offset.
 * @param {number} offset - The offset for loading Pokemon.
 */
async function loadPokemon(offset) {
    document.getElementById('mainContainer').innerHTML = '';
    preloader();
    for (let id = 0 + offset; id < loadedPokemons['results'].length; id++) {
        let i = id + 1;
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemonsArray.push(currentPokemon);
        pokemonNamesArray.push(currentPokemon['name']);
        renderPokemonCards();
    }
    removeClass('mainContainer', 'd-none');
    addClass('loadingContainer', 'd-none');
    removeClass('loadingBtn', 'd-none');
    document.getElementById('body2').style.overflow = "unset";
}


/**
 * Renders Pokemon cards based on loaded Pokemon data.
 */
function renderPokemonCards() {
    document.getElementById('mainContainer').innerHTML = '';

    for (let i = 0; i < allPokemonsArray.length; i++) {
        let allPokemons = allPokemonsArray[i];
        mainContainer.innerHTML += templatePokemonCards(i, allPokemons);

        checkForSecondType(i, allPokemons);
        paintPokemonCard(i)
    }
}


/**
 * Paints the background color of a Pokemon card based on its type.
 * @param {number} i - The index of the Pokemon card.
 */
function paintPokemonCard(i) {
    let type = allPokemonsArray[i]['types'][0]['type']['name'];
    let colorCode = paintCardOfType(type);
    document.getElementById(`pokemonCard${i}`).style.backgroundColor = `${colorCode}`;
}


/**
 * Checks if a Pokemon has a second type and adds it to the card if present.
 * @param {number} i - The index of the Pokemon card.
 * @param {Object} allPokemons - The Pokemon data object.
 */
function checkForSecondType(i, allPokemons) {
    let types = allPokemonsArray[i]['types'];
    if (types.length == 2) {
        document.getElementById(`pokemonCard${i}`).innerHTML += templateAddSecondType(allPokemons);
    }
}


/**
 * Opens a detailed card view for a specific Pokemon.
 * @param {number} i - The index of the Pokemon.
 */
function openDetailCard(i) {
    let opendPokemon = allPokemonsArray[i];
    document.getElementById('body2').style.overflow = "hidden";
    addClass('navbar', 'd-none');
    removeClass('popUpContainer', 'd-none');
    addClass('loadingBtn', 'd-none');
    document.getElementById('popUpContainer').innerHTML = templateDetailCard(i, opendPokemon);

    checkForSecondTypeinDetailCard(i, opendPokemon);
    paintPokemonDetailCard(i);
}


/**
 * Paints the background color of a detailed Pokemon card based on its type.
 * @param {number} i - The index of the detailed Pokemon card.
 */
function paintPokemonDetailCard(i) {
    let type = allPokemonsArray[i]['types'][0]['type']['name'];
    let colorCode = paintCardOfType(type);
    document.getElementById(`topCard${i}`).style.backgroundColor = `${colorCode}`;
}


/**
 * Checks if a detailed Pokemon has a second type and adds it to the card if present.
 * @param {number} i - The index of the detailed Pokemon card.
 * @param {Object} opendPokemon - The detailed Pokemon data object.
 */
function checkForSecondTypeinDetailCard(i, opendPokemon) {
    let types = allPokemonsArray[i]['types'];
    if (types.length == 2) {
        document.getElementById(`pokemonType${i}`).innerHTML += templateAddSecondTypetoDetailCard(opendPokemon);
    }
}


/**
 * Closes the detailed card view.
 */
function closeDetailCard() {
    document.getElementById('body2').style.overflow = "unset";
    removeClass('navbar', 'd-none');
    addClass('popUpContainer', 'd-none');
    removeClass('loadingBtn', 'd-none');
}


/**
 * Opens the next detailed card view.
 * @param {number} i - The index of the current detailed Pokemon card.
 */
function nextDetailCard(i) {
    if (i >= allPokemonsArray.length - 1) {
        openDetailCard(0);
    } else {
        i++;
        openDetailCard(i);
    }
}


/**
 * Opens the previous detailed card view.
 * @param {number} i - The index of the current detailed Pokemon card.
 */
function previousDetailCard(i) {
    if (i > 0) {
        i--;
        openDetailCard(i);
    } else {
        openDetailCard(allPokemonsArray.length - 1);
    }
}

// EVENTLISTENERS

/**
 * Listens for the 'keydown' event and handles the 'Escape' key press to close the detail card.
 */
document.addEventListener('keydown', (event) => {
    if (event.key == 'Escape') {
        closeDetailCard();
    }
})


/**
 * Listens for the 'click' event and closes the detail card when clicking outside the pop-up container.
 */
document.addEventListener('click', (event) => {
    let popUpContainer = document.getElementById('popUpContainer');
    if (event.target == popUpContainer) {
        closeDetailCard();
    }
})
