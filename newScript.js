const menu = document.getElementById("clicked");
const modal = document.getElementById("appear");
const botLine = document.getElementById("botLine");
const topLine = document.getElementById("topLine");
const searchInput = document.querySelector("[pokemon-search]")

const URL = `https://pokeapi.co/api/v2/pokemon/`; // API Link
let newURL = "";

const pokeSection = document.querySelector(".dataPls");

function myFunction() {
    if (modal.classList.contains("dontShow")) {
        modal.classList.remove("dontShow");
    } else {
        modal.classList.add("dontShow");
    }
    if (botLine.classList.contains("clicked") && topLine.classList.contains("clicked")) {
        botLine.classList.remove("clicked");
        topLine.classList.remove("clicked");
        console.log("did this work?")
    } else {
        botLine.classList.add("clicked");
        topLine.classList.add("clicked");
    }
}

const promises = [];
let pokemonArray;
const fetchPokemon = () => { // arrow function since this function is not repeatable
    for (let i = 1; i <= 150; i++) {
        const URL = `https://pokeapi.co/api/v2/pokemon/${i}`; // template literal strings, can create strings by doing substitution of placeholders
        promises.push(fetch(URL).then((res) => res.json())); // Each fetch returns a promise so we create an array of Promises
    }
    Promise.all(promises).then((results) => { // Use Promise.all to go through array of promises and then for each one do the following things:
        const pokemon = results.map(data => ({ // create an object named pokemon and populate with info needed
            name: data.name,
            id: data.id,
            image: data.sprites.front_default,
            // Need to get the type of Pokemon it is (Can have multiple types)
            type: data.types.map((type) => type.type.name) // use map function to go through array and populate object.type as an array
        }))
        displayPokemon(pokemon);
        pokemonArray = pokemon;
    })
}
const displayPokemon = (pokemon) => { // function that takes pokemon variable
    console.log(pokemon)
    const content = pokemon.map(pokemon =>
    `<div class="card">
    <img src="${pokemon.image}" alt="...">
        <div class="textCard">
            <p>${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</p>
            <div class="typeOfPokemon">
                <p style = "background: ${whichColor(pokemon.type[0])};">${pokemon.type[0]}</p>
                ${pokemon.type[1] ? '<p style="background:' + whichColor(pokemon.type[1]) + ';">'+ pokemon.type[1]+'</p>' : ''}
            </div>
        </div>
    </div>`).join('')
    pokeSection.innerHTML = content;
}

const whichColor = (type) => {
    if(type == 'fire'){
        return 'red';
    }else if(type == 'grass'){
        return 'green';
    }else if(type == 'water'){
        return 'blue';
    }else if(type == 'normal'){
        return 'grey'
    }else if(type == 'poison'){
        return 'purple'
    }else if(type == 'fairy'){
        return 'pink'
    }else if(type == 'bug'){
        return '#b8a038'
    }else if(type == 'flying'){
        return 'lightskyblue'
    }else if(type == 'electric'){
        return 'gold'
    }else if(type == 'psychic'){
        return 'pink'
    }else if(type == 'ground'){
        return 'brown'
    }else if(type == 'rock'){
        return 'darkgrey'
    }else if(type == 'fighting'){
        return 'darkred'
    }else if(type == 'steel'){
        return 'silver'
    }else if(type == 'ice'){
        return 'lightblue'
    }else if(type == 'dark' || type == 'ghost'){
        return 'darkblue'
    }else if(type == 'dragon'){
        return 'blue'
    }
}
// Since functions are so similar, prob can find a way to simplify the process and not write a function for each type
function displayType(type){
    let typePokemon = [];
    let content = ``;
    pokemonArray.forEach(function(pokemon){
        if(pokemon.type[0] == type || pokemon.type[1] == type){
            typePokemon.push(pokemon)
        }
    })
    content = typePokemon.map(pokemon =>
        `<div class="card">
        <img src="${pokemon.image}" alt="...">
            <div class="textCard">
                <p>${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</p>
                <div class="typeOfPokemon">
                    <p style = "background: ${whichColor(pokemon.type[0])};">${pokemon.type[0]}</p>
                    ${pokemon.type[1] ? '<p style="background:' + whichColor(pokemon.type[1]) + ';">'+ pokemon.type[1]+'</p>' : ''}
                </div>
            </div>
        </div>`).join('');
    pokeSection.innerHTML = content;
}

function displayAllTypes(){
    content = pokemonArray.sort().map(pokemon =>
        `<div class="card">
        <img src="${pokemon.image}" alt="...">
            <div class="textCard">
                <p>${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</p>
                <div class="typeOfPokemon">
                    <p style = "background: ${whichColor(pokemon.type[0])};">${pokemon.type[0]}</p>
                    ${pokemon.type[1] ? '<p style="background:' + whichColor(pokemon.type[1]) + ';">'+ pokemon.type[1]+'</p>' : ''}
                </div>
            </div>
        </div>`).join('');
    pokeSection.innerHTML = content;
}
/*
Search function
    create an empty array
    .forEach on Pokemon array
        if whatever is searched is in the pokemon's name -> put it into empty array
    Display the now not empty array
*/
function search(){
    // get input value
    let value = searchInput.value;
    let displayPokemon = [];
    value = value.toLowerCase()
    pokemonArray.forEach(function(pokemon){
        let pokeName = pokemon.name;
        if(pokeName.includes(value)){
            displayPokemon.push(pokemon)
        }
    })
    content = displayPokemon.sort().map(pokemon =>
        `<div class="card">
        <img src="${pokemon.image}" alt="...">
            <div class="textCard">
                <p>${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</p>
                <div class="typeOfPokemon">
                    <p style = "background: ${whichColor(pokemon.type[0])};">${pokemon.type[0]}</p>
                    ${pokemon.type[1] ? '<p style="background:' + whichColor(pokemon.type[1]) + ';">'+ pokemon.type[1]+'</p>' : ''}
                </div>
            </div>
        </div>`).join('');
    pokeSection.innerHTML = content;

}
fetchPokemon() // calling the function
console.log(pokemonArray)