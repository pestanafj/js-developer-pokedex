const pokemonList = document.getElementById('pokemonList')
let loadMoreButton = document.getElementById('loadMoreButton')

// const poke_api = require("./poke-api");
// const poke_details = require('./poke-details');
const maxRecords = 151
const limit = 12
let offset = 0;

let selectedPokemon = new Pokemon();

let indexPokemon = 1;

let returnPage = "";

function loadPokeDetailsPage() {

    document.title = "POKEMON DETAILS"

    returnPage = document.body.innerHTML;

    POKE_API.getPokemon(indexPokemon).then((pokemon) => {
        document.body.innerHTML = `
            <section id="pokemonContent" class="type ${pokemon.type}">
            
                <header class="pokemonHeader">
                    <button id="returnButton" type="button" onclick="clickReturnButton()">
                        <<
                    </button>
                    <div></div>
                    <div class="pokemonHeaderNameType">
                        <h1 id="pokemonHeaderName">${pokemon.name}</h1>
                        <ol class="pokemonHeaderTypes">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                    </div>
                    <div class="pokemonHeaderNumber">
                        <span class="index">#${pokemon.number.toString().padStart(4, "0")}</span>
                    </div>
                </header>

                <div class="pokemonPhotoBox">

                    <img class="pokemonPhoto"
                        src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>

                <div class="detailsBox">

                    <ol class="detailTabs">
                        <li class="detailTabsItems">About</li>
                        <li class="detailTabsItems">Base Stats</li>
                        <li class="detailTabsItems">Evolution</li>
                        <li class="detailTabsItems">Moves</li>
                    </ol>

                    <div id="detailTabDisplay">
                        
                    </div>
                </div>



            </section>`



        loadPokeDetailsPageAbout(pokemon);
    }

    )


}

function loadPokeDetailsPageAbout(pokemon) {
    document.getElementById("detailTabDisplay").innerHTML = `
        <div class="aboutPokemon">
            <ol>
                <li class="aboutTitle">Species</li>
                <li class="aboutLable">Species</li>
                <li class="aboutTitle">Height</li>
                <li class="aboutLable">${pokemon.height}</li>
                <li class="aboutTitle">Weight</li>
                <li class="aboutLable">${pokemon.weight}</li>
                <li class="aboutTitle">Abilities</li>
                <li class="aboutLable">${pokemon.abilities.join(', ')}</li>
            </ol>

            <span class="subTitleAbout">Breeding</h2>

            <ol>
                <li class="aboutTitle">Gender</li>
                <li class="aboutLable">Gender</li>
                <li class="aboutTitle">Egg Group</li>
                <li class="aboutLable">Egg Group</li>
                <li class="aboutTitle">Egg Cycle</li>
                <li class="aboutLable">Egg Cycle</li>
            </ol>
        </div>  `
}

function convertPokemonToLi(pokemon) {

    return `
    <li id="pokemon ${pokemon.number}" class="pokemon ${pokemon.type}" >
        <span id="pokemonID" class="number">#${pokemon.number.toString().padStart(4, "0")}</span>
        <span class="name">${pokemon.name}</span>

        <div class="details">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>

    </li>
    `;
}

function loadPokemonItens(offset, limit) {

    POKE_API.getPokemons(offset, limit).then((pokeList) => {

        for (pokemon of pokeList) {
            const listItem = document.createElement('li');
            listItem.id = `pokemon ${pokemon.number}`
            listItem.className = `pokemon ${pokemon.type}`
            listItem.innerHTML = `
                <span id="pokemonID" class="number">#${pokemon.number.toString().padStart(4, "0")}</span>
                <span class="name">${pokemon.name}</span>
    
                <div class="details">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
    
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>`;

            listItem.addEventListener("click", () => { clickListItem(listItem.id) })
            pokemonList.appendChild(listItem);
        }

    })

    loadMoreButton = document.getElementById('loadMoreButton')

    loadMoreButton.addEventListener('click', () => {
        offset += limit
        const qtdRecordsWithNexPage = offset + limit

        if (qtdRecordsWithNexPage >= maxRecords) {
            const newLimit = maxRecords - offset
            loadPokemonItens(offset, newLimit)

            loadMoreButton.parentElement.removeChild(loadMoreButton)
        } else {
            loadPokemonItens(offset, limit)
        }
    })

}

function clickListItem(id) {

    const index = id.toString().replace("pokemon ", "");

    indexPokemon = index;
    loadPokeDetailsPage()
    //window.open('./pokemonDetails.html', "_self")

    // POKE_API.getPokemon(index).then((pokemon) => {
    //     console.log(pokemon)
    //     selectedPokemon = pokemon;
    //     window.open('./pokemonDetails.html', "_self")
    // });


}

function clickReturnButton() {
    document.title = "Pokedex";
    document.body.innerHTML = returnPage;
    loadPokemonItens(offset, limit)
}

// INICIO DA EXECUCAO


if (document.title == "Pokedex") { loadPokemonItens(offset, limit) }
else {
    console.log("POKEMON DETALHES")
    loadPokeDetailsPage()

}
