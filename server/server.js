const express = require('express')
const app = express()
const path = require('path');
const manifest = require('./mockdata/manifest.json');
const physics = require('./mockdata/physics.json');
const r = require('./mockdata/characters/r.json');
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "../lib/index.html"))
})

//load test manifest
app.get('/game/manifest/:id', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(manifest));
})

/**
 * Map handling start
 */

    //map handling
    app.get('/game/map/:id/skybox/:name', function (req, res) {
        let mapName = req.params.id;
        let skyboxName = req.params.name;
        res.sendFile(path.join(__dirname, "../assets/maps/"+mapName+"/skybox/"+skyboxName));
    })


    //map handling
    app.get('/game/map/:id/physics', function (req, res) {
        let mapName = req.params.id;
        let physicsName = req.params.name;

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(physics));
    })

    app.get('/game/map/:id/texture/:name', function (req, res) {
        let mapName = req.params.id;
        let textureName = req.params.name;
        res.sendFile(path.join(__dirname, "../assets/maps/"+mapName+"/"+textureName));
    })

    app.get('/game/map/:id/heightmap/:name', function (req, res) {
        let mapName = req.params.id;
        let heightMapName = req.params.name;
        res.sendFile(path.join(__dirname, "../assets/maps/"+mapName+"/"+heightMapName));
    })

/**
 * Map handling end
 */

/**
 * Character handling start
 */


   app.get('/game/characters/:id/textures/:name', function (req, res) {
        let id = req.params.name;
        let name = req.params.name;
        res.sendFile(path.join(__dirname, "../assets/commanders/" + id + "/textures/" + name));
   })

    app.get('/game/characters/:id/sounds/:name', function (req, res) {
        let id = req.params.name;
        let name = req.params.name;
        res.sendFile(path.join(__dirname, "../assets/commanders/" + id + "/sounds/" + name));
   })

   
   app.get('/game/characters/:id/manifest', function (req, res) {
        let name = req.params.id;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(r));
    })

 /**
  * Character handling end
  */

//avatar handling

app.use('/static', express.static(path.join(__dirname, "../lib/static")))
app.use('/vendors', express.static(path.join(__dirname, "../lib/vendors")))

app.listen(3000, function () {
  console.log('Test server running on 3000');
})