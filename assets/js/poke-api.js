
const POKE_API = {}

POKE_API.convertPokeApiDetailToPokemon = (pokeDetail) => {

    const pokemon = new Pokemon();

    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);

    pokemon.types = types;
    pokemon.type = types[0];

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;


    pokemon.abilities = pokeDetail.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name);

    pokemon.moves = pokeDetail.moves.map((movesSlot) => movesSlot.move.name);

    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;


    const stats = pokeDetail.stats.map((statsSlot) => statsSlot.base_stat);

    pokemon.stats.hp = stats[0];
    pokemon.stats.attack = stats[1];
    pokemon.stats.deffense = stats[2];
    pokemon.stats.specialAttack = stats[3];
    pokemon.stats.specialDeffense = stats[4];
    pokemon.stats.speed = stats[5];

    pokemon.speciesURL = pokeDetail.species.url;

    //pokemon.species = pokeApi.getPokemonSpecies(pokemon);



    // console.log(pokemon);

    return pokemon;

}

POKE_API.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(POKE_API.convertPokeApiDetailToPokemon);
}

POKE_API.getPokemons = (offset = 0, limit = 12) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map((pokemon) => POKE_API.getPokemonDetail(pokemon)))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
    // .catch((error) => console.log(error))


}


POKE_API.getPokemon = (index) => {

    const url = `https://pokeapi.co/api/v2/pokemon/${index}`
    return fetch(url)
        .then((response) => response.json())
        .then((pokeDetails) => POKE_API.convertPokeApiDetailToPokemon(pokeDetails));

}
// pokeApi.getPokemonSpecies = (pokemon) => {

//     // const jsonBody = fetch(pokemon.speciesURL)
//     //     .then((response) => response.json());

//     // const pokeSpecies = (pokeDetail) => {
//     //     pokemon.species.habitat = pokeDetail.habitat.name;
//     //     pokemon.species.shape = pokeDetail.shape.name;
//     //     pokemon.species.eggGroups = pokeDetail.egg_groups.map((eggGroupsSlot) => eggGroupsSlot.name);
//     //     pokemon.species.evolutionURL = pokeDetail.evolution_chain.url;
//     //     pokemon.species.evolveTo = pokeApi.getPokemonEvolution(pokemon.species);
//     //     return pokemon.species;
//     // }

//     // return pokeSpecies(jsonBody);

//     // return fetch(pokemon.speciesURL)
//     //     .then((response) => response.json())
//     //     .then((jsonBody) => jsonBody)
//     //     .then((pokeDetail) => {
//     //         pokemon.species.habitat = pokeDetail.habitat.name;
//     //         pokemon.species.shape = pokeDetail.shape.name;
//     //         pokemon.species.eggGroups = pokeDetail.egg_groups.map((eggGroupsSlot) => eggGroupsSlot.name);
//     //         pokemon.species.evolutionURL = pokeDetail.evolution_chain.url;
//     //         pokemon.evolveTo = pokeApi.getPokemonEvolution(pokemon.species)
//     //         return pokemon.species;
//     //     });

//     // return fetch(pokemon.speciesURL)
//     //     .then((response) => response.json())
//     //     .then((pokeSpecies) => {
//     //         console.log(pokeSpecies);
//     //     });

//     const pokeSpecies = fetch(pokemon.speciesURL)
//         .then((response) => response.json())
//         .then((pokeSpeciesPromisses) => Promise.(pokeSpeciesPromisses))
//         .then((pokemonDetails) => pokemonDetails);

//     console.log(pokeSpecies);
//     return pokeSpecies;

// }

// pokeApi.getPokemonEvolution = (pokemonSpecies) => {

//     return fetch(pokemonSpecies.evolutionURL)
//         .then((response) => response.json())
//         .then((jsonBody) => Promise.all(jsonBody.chain.evolves_to[0].species.name));
// }
