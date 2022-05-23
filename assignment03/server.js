const express = require('express')
const app = express()
const https = require('https');
const bodyparser = require("body-parser");
app.set('view engine', 'ejs');

app.listen(5000, function (err) {
    if (err)
        console.log(err);
})

// ------------ Login Page ------------//

// var session = require('express-session')

// //use the session middleware
// app.use(session({ secret: 'keyboard cat', saveUninitialized: true, resave: true }));

// users = [
//     {
//         username: "user1",
//         password: "pass1",
//         shoppingCart: [
//             {
//                 pokeID: 25,
//                 quantity: 2,
//                 price: 32
//             },
//             {
//                 pokeID: 21,
//                 quantity: 4,
//                 price: 16
//             }
//         ]
//     },
//     {
//         username: "user2",
//         password: "pass2"
//     },
// ]

// //declaring a global miiddleware
// app.use(loggerOne)

// function loggerOne(req, res, next) {
//     console.log("loggerOne Function got executed!")
//     next()
//     console.log("Bye from loggerOne function!")
// }

// function auth(req, res, next) {
//     console.log("loggerTwo Function got executed!")
//     if (req.session.authenticated) {
//         next()
//     }
//     else {
//         res.redirect('/login')
//     }
// }


// app.get('/', auth, function (req, res) {
//     console.log(" / router got accessed!")
//     res.send(`Welcome <a href="/userProfile/${req.session.user}">${req.session.user} </a>`)

// })

// app.get('/login/', function (req, res, next) {
    
//     //------ turn into input field ------//

//     res.send("Please provide the credentials through the URL")
// })

// // link together//
// app.get('/login/:user/:pass', function (req, res, next) {
//     if (users.filter(user => user.username == req.params.user)[0].password == req.params.pass)
//     // [req.params.user] == req.params.pass)
//     {
//         req.session.authenticated = true
//         req.session.user = req.params.user
//         res.send("Successful Login!") // go to profile or main
//     } else {
//         req.session.authenticated = false
//         res.send("Failed Login!") // go to login
//     }

// })

// app.get('/userProfile/:name', function (req, res) {
// //     res.write(`Welcome ${req.params.name}`)
// //     res.write(`<br>`)
// //     // console.log(users.filter( user => user.username == req.params.name))
// //     res.write(JSON.stringify(
// //                  users.filter(user => user.username == req.params.name)[0].shoppingCart[0]
// //             ))
// // res.send()

// const url = `https://pokeapi.co/api/v2/pokemon/${req.params.name}`
// data = '';
// https.get(url, function (https_res) {

//         https_res.on("data", function (chunk) {
//             // console.log(JSON.parse(chunk));
//             data += chunk
//         })

//         https_res.on('end', function () {
//             data = JSON.parse(data)
//             console.log(data)
//             // console.log(JSON.parse(data));
//             // console.log("data" + JSON.parse(data));
//             //             hp_ = data.stats.filter((obj_) => {
//             //                 return obj_.stat.name == "hp"
//             //             }).map((obj2) => {
//             //                 return obj2.base_stat
//             //             });
//             //             console.log(hp_)
//             //             res.render("profile.ejs", {
//             //                 "id": req.params.id,
//             //                 "name": data.name,
//             //                 "img_path": '', //data.sprites.other["official-artwork"]["front_default"],
//             //                 "hp": hp_[0]
//             //             });
//             //         })
//             //     });
//             // })
//         })
//     })
// })

//------ creating the Database for mongo.db via terminal ------//
// mongo
// showdbs
// 
// * to create *
// use exactNameofDatabase
// 
// * to go into collection *
// use.exactNameofDatabase
// 
// * THEN => to drop collection *
// db.dropDatabase()
// 
//*to insert data in collection* MUST end with "s"
// db.exactNameofDatabases.insert({ the data key: 'and the value'})
// 
// *to find the data*
// db.exactNameofDatabase.find().pretty()//

// const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/timelineDB",
//     { useNewUrlParser: true, useUnifiedTopology: true });
// const eventSchema = new mongoose.Schema({
//     text: String,
//     time: String,
//     hits: Number
// });
// const eventModel = mongoose.model("timelineevents", eventSchema);

app.use(bodyparser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}));


// // CRUD
// // R 
// app.get('/timeline/getAllEvents', function (req, res) {
//     // console.log("received a request for "+ req.params.city_name);
//     eventModel.find({}, function (err, data) {
//         if (err) {
//             console.log("Error " + err);
//         } else {
//             console.log("Data " + data);
//         }
//         res.send(data);
//     });
// })

// //C - create
// app.put('/timeline/insert', function (req, res) {
//     console.log(req.body)
//     eventModel.create({
//         text: req.body.text,
//         time: req.body.time,
//         hits: req.body.hits
//     }, function (err, data) {
//         if (err) {
//             console.log("Error " + err);
//         } else {
//             console.log("Data " + data);
//         }
//         res.send(data);
//     });
// })

// //U - update
// app.get('/timeline/inreaseHits/:id', function (req, res) {
//     console.log(req.params)
//     eventModel.updateOne({
//         _id: req.params.id
//     }, {
//         $inc: { hits: 1 }
//     }, function (err, data) {
//         if (err) {
//             console.log("Error " + err);
//         } else {
//             console.log("Data " + data);
//         }
//         res.send("Update is good!");
//     });
// })

// //D
// app.get('/timeline/remove/:id', function (req, res) {
//     // console.log(req.params)
//     eventModel.remove({
//         _id: req.params.id
//     }, function (err, data) {
//         if (err) {
//             console.log("Error " + err);
//         } else {
//             console.log("Data " + data);
//         }
//         res.send("Delete is good!");
//     });
// })


app.get('/profile/:id', function (req, res) {

    // res.send(`<h1> Hey the id is: ${req.params.id} </h1>`)   

    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`
    data = '';
    https.get(url, function (https_res) {

        https_res.on("data", function (chunk) {
            // console.log(JSON.parse(chunk));
            data += chunk
        })

        https_res.on('end', function () {
            data = JSON.parse(data)
            // console.log(data)
            // console.log(JSON.parse(data));
            // console.log("data" + JSON.parse(data));
            //             hp_ = data.stats.filter((obj_) => {
            //                 return obj_.stat.name == "hp"
            //             }).map((obj2) => {
            //                 return obj2.base_stat
            //             });
            //             console.log(hp_)
            //             res.render("profile.ejs", {
            //                 "id": req.params.id,
            //                 "name": data.name,
            //                 "img_path": '', //data.sprites.other["official-artwork"]["front_default"],
            //                 "hp": hp_[0]
            //             });
            //         })
            //     });
            // })
            res.render('profile.ejs', {
                id: data.id,
                name: data.name,
                hp: data.stats.filter((obj) => {
                    return obj.stat.name == "hp"
                }).map((obj_) => {
                    return obj_.base_stat
                })[0],
                attack: data.stats.filter((obj) => {
                    return obj.stat.name == "attack"
                }).map((obj_) => {
                    return obj_.base_stat
                })[0],
                'defense': data.stats.filter((obj) => {
                    return obj.stat.name == "defense"
                }).map((obj_) => {
                    return obj_.base_stat
                })[0],
                "special-attack": data.stats.filter((obj) => {
                    return obj.stat.name == "special-attack"
                }).map((obj_) => {
                    return obj_.base_stat
                })[0],
                "special-defense": data.stats.filter((obj) => {
                    return obj.stat.name == "special-defense"
                }).map((obj_) => {
                    return obj_.base_stat
                })[0],
                "speed": data.stats.filter((obj) => {
                    return obj.stat.name == "speed"
                }).map((obj_) => {
                    return obj_.base_stat
                })[0],
                "electric": data.stats.filter((obj) => {
                    return obj.stat.name == "electric"
                }).map((obj_) => {
                    return obj_.base_stat
                })[0],
                'weight': data.weight,
                'height': data.height
            });
        });
    });
    // res.send('GET request  to homepage')
})

app.use(express.static('./public'))
