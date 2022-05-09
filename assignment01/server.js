/// ***On Terminal: {
// 1. npm init

//  [starts or restarts the server request use when opening saved file]
// 2. npm install
// 3. add a sever.js (in folder) >>
// 4. node server.js
// 4.or nodemon server.js
// }***


const express = require('express')
const app = express()
app.set('view engine', 'ejs');


app.listen(4000, function (err) {
    if (err) console.log(err);
})

// app.get('/', function (req, res, next) {
//     res.send((x++) + '<h1> GET request to homepages pt2 </h1>')    
// })

// app.get('/', function (req, res) {
//     res.sendFile(_dirname + "/index.html");    
// })



app.use(express.static('./public'))

const https = require('https');

app.get('/profile/:id', function (req, res) {
    // res.send(`<h1> Hey the id is: ${req.params.id} </h1>`)   

    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`

    https.get(url, function (https_res) {
        data = '';
        https_res.on("data", function (chunk) {
            // console.log(JSON.parse(chunk));
            data += chunk
        })

        https_res.on('end', function () {
            data = JSON.parse(data)
            //     console.log(data)
            // console.log(JSON.parse(data));
            // console.log("data" + JSON.parse(data));

            hp_ = data.stats.filter((obj_) => {
                return obj_.stat.name == "hp"
            }).map((obj2) => {
                return obj2.base_stat
            });
            console.log(hp_)
            res.render("profile.ejs", {
                "id": req.params.id,
                "name": data.name,
                "img_path": '', //data.sprites.other["official-artwork"]["front_default"],
                "hp": hp_[0]
            });
        })
    });

})