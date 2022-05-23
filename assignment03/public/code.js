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

to_add = ""

function processPokeResp(data){
    console.log(data)
    const type = data.types[0].type.name
    const color = colors[type];

    //3- etract the image and process the respones
    to_add += `<div class="pokemon_information" style="background-color:${color};"> 
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
    </div>`
}

async function loadNineImages() {
    looper = 9
    for (i = 1; i <= looper; i++) {// loops Nine times
        if (i % 3 == 1) {// if index is 1,4,7... create new div
            to_add += `<div class="images_group">`;
        }

        // 1 - generater random numbers
        pokedex_number = Math.floor(Math.random() * 900) + 1

        try{
        //2- init a AJAX request to pokeapi.com^^
        await $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${pokedex_number}/`,
            success: processPokeResp
        })

        } catch(e){
            console.log("CAUGHT THIS:", e)
            looper +=1
        }

        if (i % 3 == 0) { //when index id 3,6,9 ...  close div
            to_add += `</div> `;

        }

    }
    // this will add the value 'to_add' from db to main div
    jQuery("main").html(to_add)
}

function setup() {
    loadNineImages();
    // events handlers
}

jQuery(document).ready(setup)