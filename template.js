function templatePokemonCards(i, allPokemons) {
    return /*html*/ `
    <div class="pokemonCard" id="pokemonCard${i}" onclick="openDetailCard(${i})">
       <span>#ID ${allPokemons['id']}</span>
       <div class="bg-highlight">${allPokemons['types'][0]['type']['name']}</div>

       <div class="flex-column">
           <img id="photo" class="mainsite-image" src ="${allPokemons['sprites']['other']['official-artwork']['front_default']}">
           <span id="name">${allPokemons['name']}</span>
       </div>
   </div>`;
}


function templateAddSecondType(allPokemons) {
    return /*html*/ `
           <div class="bg-highlight">${allPokemons['types'][1]['type']['name']}</div>
    `;
}


function templateDetailCard(i, opendPokemon) {
    return /*html*/ `
          <div class="detail-card">
            <div id="topCard${i}" class="top-card padding-20">
                <div>
                    <img class="close-icon" src="./img/close.png" onclick="closeDetailCard()">
                </div>
                <span class="font-24"><b>#ID ${opendPokemon['id']}</b></span>
                <span class="card-heading">${opendPokemon['name']}</span>
                <span>Base experience: <b>${opendPokemon['base_experience']}</b></span>
                <div id="pokemonType${i}" class="flex">
                    <div class="bg-highlight">${opendPokemon['types'][0]['type']['name']}</div>
                </div>
                <div class="flex-space-btw">
                    <img class="icon" src="./img/arrow-left.png" onclick="previousDetailCard(${i})">
                    <img class="card-image"
                        src="${opendPokemon['sprites']['other']['official-artwork']['front_default']}">
                    <img class="icon" src="./img/arrow-right.png" onclick="nextDetailCard(${i})">
                </div>
                <div class="flex-space-btw">
                    <span>Weight: <b>${opendPokemon['weight']}</b></span>    
                    <span>Height: <b>${opendPokemon['height']}</b></span>
                </div>
            </div>
            <div class="bottom-card padding-20">
                <div>
                    <span class="font-20">Base states</span>
                    <div class="states-container">
                        <div class="states-titles">
                            <span>HP</span>
                            <span>Attack</span>
                            <span>Defense</span>
                            <span>Special-attack</span>
                            <span>Special-defense</span>
                            <span>Speed</span>
                        </div>
                        <div class="states-values">
                            <span>${opendPokemon['stats'][0]['base_stat']}</span>
                            <span>${opendPokemon['stats'][1]['base_stat']}</span>
                            <span>${opendPokemon['stats'][2]['base_stat']}</span>
                            <span>${opendPokemon['stats'][3]['base_stat']}</span>
                            <span>${opendPokemon['stats'][4]['base_stat']}</span>
                            <span>${opendPokemon['stats'][5]['base_stat']}</span>
                        </div>

                        <div class="states-charts">
                        <progress id="file" value="${opendPokemon['stats'][0]['base_stat']}" max="100"></progress>
                        <progress id="file" value="${opendPokemon['stats'][1]['base_stat']}" max="100"></progress>
                        <progress id="file" value="${opendPokemon['stats'][2]['base_stat']}" max="100"></progress>
                        <progress id="file" value="${opendPokemon['stats'][3]['base_stat']}" max="100"></progress>
                        <progress id="file" value="${opendPokemon['stats'][4]['base_stat']}" max="100"></progress>
                        <progress id="file" value="${opendPokemon['stats'][5]['base_stat']}" max="100"></progress>                         
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function templateAddSecondTypetoDetailCard(opendPokemon) {
    return /*html*/ `
           <div class="bg-highlight">${opendPokemon['types'][1]['type']['name']}</div>
    `;
}