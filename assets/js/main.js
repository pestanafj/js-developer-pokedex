const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 12
let offset = 0;

const clickListItem = () => {
    console.log("CLICOU");

    window.open('./pokemonDetails.html', "_self");

}

const convertPokemonToLi = (pokemon) => {

    return `
    <li class="pokemon ${pokemon.type}" onclick="clickListItem()">
        <span class="number">#${pokemon.number.toString().padStart(4, "0")}</span>
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

const loadPokemonItens = (offset, limit) => {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml

        // const itensLista = pokemonList.getElementsByTagName("li")

        // for (let item of itensLista) {
        //     item.addEventListener("click", () => console.log("CLICOU"));
        // }

        // console.log(itensLista);
    })
}


loadPokemonItens(offset, limit)

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

// pokeApi.getPokemons().then((pokemons = []) => {

//     pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('');

// })