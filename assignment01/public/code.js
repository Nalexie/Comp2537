
to_add = ""

function processPokeResp(data) {
    // console.log(data)

    //3- etract the image and process the respones
    to_add += `${data.name} <div class="image_container">
    <a href="/profile/${data.id}"> 
    <img src="${data.sprites.other["official-artwork"].front_default}"> 
    </a>
    </div>`
}

async function loadNineImages() {
    for (i = 1; i <= 9; i++) {// loops Nine times
        if (i % 3 == 1) {// if index is 1,4,7... create new div
            to_add += `<div class="images_group">`
        }

        // 1 - generater random numbers
        pokedex_number = Math.floor(Math.random() * 1000) + 1

        //2- init a AJAX request to pokeapi.co ^^
        await $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${pokedex_number}/`,
            success: processPokeResp
        })

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