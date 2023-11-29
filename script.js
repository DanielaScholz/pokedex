/**
 * Represents the currently selected Pokemon.
 * @type {Object}
 */
let currentPokemon;

/**
 * Array containing loaded Pokemon data.
 * @type {Array<Object>}
 */
let loadedPokemons;

/**
 * Array containing all Pokemon objects.
 * @type {Array<Object>}
 */
let allPokemonsArray = [];

/**
 * Array containing names of Pokemon.
 * @type {Array<string>}
 */
let pokemonNamesArray = [];

/**
 * Represents the offset for API requests.
 * @type {number}
 */
let offset = 0;

/**
 * Represents the limit for API requests.
 * @type {number}
 */
let limit = 20;

/**
 * Represents the current mode (light/dark).
 * @type {boolean}
 */
let lightMode = true;



/**
 * Adds a class to a specified element.
 * @param {string} elem - The ID of the HTML element.
 * @param {string} className - The class name to add.
 */
function addClass(elem, className) {
    document.getElementById(elem).classList.add(className);
}


/**
 * Removes a class from a specified element.
 * @param {string} elem - The ID of the HTML element.
 * @param {string} className - The class name to remove.
 */
function removeClass(elem, className) {
    document.getElementById(elem).classList.remove(className);
}


/**
 * Includes HTML content into specified elements.
 * Uses 'w3-include-html' attribute in HTML elements.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
            checkURL();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


/**
 * Checks the URL pathname and performs actions based on it.
 */
function checkURL() {
    let pathname = window.location.pathname.slice(1, -5);
    if (pathname == 'privacy-policy' || pathname == 'imprint') {
        addClass('searchbar', 'd-none');
    } 
}


/**
 * Displays a preloader while content is being loaded.
 */
function preloader() {
    addClass('mainContainer', 'd-none');
    addClass('loadingBtn', 'd-none');
    document.getElementById('body2').style.overflow = "hidden";
    removeClass('loadingContainer', 'd-none');
}


//SEARCHBAR

/**
 * Searches for a specific Pokemon based on user input in the search bar.
 */
function searchPokemon() {
    let searchbar = document.getElementById('searchbar').value;
    searchbar = searchbar.toLowerCase();

    let mainContainer = document.getElementById('mainContainer');
    mainContainer.innerHTML = '';

    for (let i = 0; i < pokemonNamesArray.length; i++) {
        let pokemonNames = pokemonNamesArray[i];
        let allPokemons = allPokemonsArray[i];

        if (pokemonNames.toLowerCase().includes(searchbar)) {
            mainContainer.innerHTML += templatePokemonCards(i, allPokemons);
            paintPokemonCard(i);
        }
    }
}

/**
 * Toggles between light and dark mode.
 */
function changeMode() {
    if (lightMode == false) {
        lightMode = true;
        removeClass('mode', 'night');
        addClass('mode', 'light')
        document.getElementById('body2').style.backgroundColor = '#FBFBFB';
    }

    else if (lightMode == true) {
        lightMode = false
        removeClass('mode', 'light');
        addClass('mode', 'night')
        document.getElementById('body2').style.backgroundColor = 'black';
    }
}