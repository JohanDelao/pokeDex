const menu = document.getElementById("clicked");
const modal = document.getElementById("appear");
const botLine = document.getElementById("botLine");
const topLine = document.getElementById("topLine");

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
