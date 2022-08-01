const menu = document.getElementById("clicked");
const modal = document.getElementById("appear");
const botLine = document.getElementById("botLine");
const topLine = document.getElementById("topLine");

const URL = `https://pokeapi.co/api/v2/pokemon/`; // API Link
let newURL = "";

function myFunction(){
    if(modal.classList.contains("dontShow")){
        modal.classList.remove("dontShow");
    }else{
        modal.classList.add("dontShow");
    }
    if(botLine.classList.contains("clicked") && topLine.classList.contains("clicked")){
        botLine.classList.remove("clicked");
        topLine.classList.remove("clicked");
        console.log("did this work?")
    }else{
        botLine.classList.add("clicked");
        topLine.classList.add("clicked");
    }
}

async function getPokemon(url){
    // storing response
    const response = await fetch(url)
    // Storing data in the form on JSON
    let data = await response.json();
    // Get the results array from the request (results contains pokemon information)
    newURL = data.next;
    data = data.results;
    console.log(data);
    show(data)
}
getPokemon(URL);

function show(data){
    let content = ``;
    for (let x = 0; x<data.length; x++){
        let number = x + 1;
        let imgLink = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + number + ".png";
        let name = data[x].name;
        name = name.toUpperCase();
        content += `<div class="card">
        <img src="${imgLink}" alt="...">
            <div class="textCard">
                <p>${name}</p>
                <div class="typeOfPokemon">
                    <p>Grass</p>
                    <p>Poison</p>
                </div>
            </div>
        </div>`
    }
    document.querySelector(".dataPls").innerHTML = content;
}

function loadMore(){
    getPokemon(newURL)
}
