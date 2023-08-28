// function produto(nome, tipo, preco, descricao) {
//     this.nome = nome;
//     this.tipo = tipo;
//     this.preco = preco;
//     this.desc = descricao;
// }

pokeApi.getPokemons().then((pokeLista) => {

    const listaHTML = document.getElementById('lista');

    for (pokemon of pokeLista) {
        const itemLista = document.createElement('li');
        itemLista.id = `pokemon ${pokemon.number}`
        itemLista.className = `pokemon ${pokemon.type}`
        itemLista.innerHTML = `
            <span id="pokemonID" class="number">#${pokemon.number.toString().padStart(4, "0")}</span>
            <span class="name">${pokemon.name}</span>

            <div class="details">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>`;

        itemLista.addEventListener("click", () => { clickItem(itemLista.id) })
        listaHTML.appendChild(itemLista);
    }

    console.log(listaHTML);
})


pokeApi.getPokemon(1).then((detalhesPokemon) => {
    console.log(detalhesPokemon);
});
//Chamar a funçãoc

function clickItem(id) {
    console.log(id)
}

async function listarPokemons() {
    return await pokeApi.getPokemons();

}


// const meuProduto = new produto("Biquini", "Rendinha", 140, "Ideal para praia");

// //Pegar id da lista
// const lista = document.getElementById('lista');

// //Criar elemento para cada campo
// const itemPro = document.createElement('li');
// const itemTip = document.createElement('li');
// const itemPre = document.createElement('li');
// const itemDes = document.createElement('li');

// //Atribuir valores para cada elemento
// itemPro.innerHTML = "Produto: " + " " + meuProduto.nome;
// itemTip.innerHTML = "Tipo: " + " " + meuProduto.tipo;
// itemPre.innerHTML = "Preço: " + " " + meuProduto.preco;
// itemDes.innerHTML = "Descrição: " + " " + meuProduto.desc;

// //Adicionar cada elemento na lista ul
// lista.appendChild(itemPro);
// lista.appendChild(itemTip);
// lista.appendChild(itemPre);
// lista.appendChild(itemDes);