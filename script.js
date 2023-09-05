let currentPokemon;
let loadedPokemons;
let allPokemonsArray = [];
let pokemonNamesArray = [];
let offset = 0;
let limit = 20;
let lightMode = true;


function addClass(elem, className) {
    document.getElementById(elem).classList.add(className);
}


function removeClass(elem, className) {
    document.getElementById(elem).classList.remove(className);
}


async function init() {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    let response = await fetch(url);
    loadedPokemons = await response.json();
    loadPokemon(offset);
    offset = limit;
    limit = (offset + 20);
}


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


function preloader() {
    addClass('mainContainer', 'd-none');
    addClass('loadingBtn', 'd-none');
    document.getElementById('body2').style.overflow = "hidden";
    removeClass('loadingContainer', 'd-none');
}


function renderPokemonCards() {
    document.getElementById('mainContainer').innerHTML = '';

    for (let i = 0; i < allPokemonsArray.length; i++) {
        let allPokemons = allPokemonsArray[i];
        mainContainer.innerHTML += templatePokemonCards(i, allPokemons);

        checkForSecondType(i, allPokemons);
        paintPokemonCard(i)
    }
}


function paintPokemonCard(i) {
    let type = allPokemonsArray[i]['types'][0]['type']['name'];
    let colorCode = paintCardOfType(type);
    document.getElementById(`pokemonCard${i}`).style.backgroundColor = `${colorCode}`;
}


function checkForSecondType(i, allPokemons) {
    let types = allPokemonsArray[i]['types'];
    if (types.length == 2) {
        document.getElementById(`pokemonCard${i}`).innerHTML += templateAddSecondType(allPokemons);
    }
}


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


function paintPokemonDetailCard(i) {
    let type = allPokemonsArray[i]['types'][0]['type']['name'];
    let colorCode = paintCardOfType(type);
    document.getElementById(`topCard${i}`).style.backgroundColor = `${colorCode}`;
}


function checkForSecondTypeinDetailCard(i, opendPokemon) {
    let types = allPokemonsArray[i]['types'];
    if (types.length == 2) {
        document.getElementById(`pokemonType${i}`).innerHTML += templateAddSecondTypetoDetailCard(opendPokemon);
    }
}


function closeDetailCard() {
    document.getElementById('body2').style.overflow = "unset";
    removeClass('navbar', 'd-none');
    addClass('popUpContainer', 'd-none');
    removeClass('loadingBtn', 'd-none');
}


function nextDetailCard(i) {
    if (i >= allPokemonsArray.length - 1) {
        openDetailCard(0);
    } else {
        i++;
        openDetailCard(i);
    }
}


function previousDetailCard(i) {
    if (i > 0) {
        i--;
        openDetailCard(i);
    } else {
        openDetailCard(allPokemonsArray.length - 1);
    }
}

// EVENTLISTENERS
document.addEventListener('keydown', (event) => {
    if (event.key == 'Escape') {
        closeDetailCard();
    }
})

document.addEventListener('click', (event) => {
    let popUpContainer = document.getElementById('popUpContainer');
    if (event.target == popUpContainer) {
        closeDetailCard();
    }
})

//SEARCHBAR
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
            // document.getElementById('loadingBtn').classList.add('d-none');
        }
    }
}

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

