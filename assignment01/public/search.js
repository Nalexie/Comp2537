// resultList =[]
typeGlobal=""
function processPokemonResp(data){
    for (i = 0 ; i < data.types.length; i++)  // for (x in data.types)
        if(data.types[i].type.name == typeGlobal)
            $("main").append(`<div class="pokemon_information"> 
            <div class="image_container">
            <a href="/profile/${data.id}"> 
            <img src="${data.sprites.other["official-artwork"].front_default}"> 
            </a>
            </div>
            <div class="info>
            <span class="number"># ${data.id}</span>
            <h2> ${data.name}<h2>
            <div class="type">
            Type: 
            <span>
            ${data.type}
            </span>
            </div>
            </div>
            </div>`)
        
            
        }

function display(type_){
    $("main").empty()
    typeGlobal = type_
    for(i = 1 ; i < 100; i++){
        $.ajax({
            type: "get",
            url: `https://pokeapi.co/api/v2/pokemon/${i}`,
            success: processPokemonResp
        })
    }

}

function setup(){
    // display defualt type, all the grass pokemon
    display($("#poke_type option:selected").val())
    $("#poke_type").change(() => {
        poke_type  = $("#poke_type option:selected").val();
        // alert(poke_type)
        // display($("#poke_type option:selected").val())
    })
}


$(document).ready(setup)