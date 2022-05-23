const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

// resultList =[]
typeGlobal=""
function processPokemonResp(data){
    // console.log(data)
    color = colors[data.types[0].type.name]
    // console.log(color)
    for (i = 0 ; i < data.types.length; i++)  // for (x in data.types)
        
        
        if(data.types[i].type.name == typeGlobal)
            

            $("main").append(`<div class="pokemon_information" style="background-color:${color};"> 
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
            ${data.types[0].type.name}
            </span>
            </div>
            </div>
            </div>`)
        
            
        }


function display(type_){
    $("main").empty()
    typeGlobal = type_
    for(i = 1 ; i < 1000; i++){
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
        display($("#poke_type option:selected").val())
    })
}

$(document).ready(setup)