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

// app.get('/', function (req, res) {
//     res.send('<h1> GET request to homepages pt2 </h1>')    
// })

// app.get('/', function (req, res) {
//     res.sendFile(_dirname + "/index.html");    
// })

app.use(express.static('./public'))

app.get('/profile/:id', function (req, res) {
    // res.send(`<h1> Hey the id is: ${req.params.id} </h1>`)   
    
    res.render("profile.ejs",{
        "id": req.params.id,
    });

    // res.json({
    //     "k1":"v1",
    //     "k2":"v1",
    //     "k3":"v1",
    // })
})