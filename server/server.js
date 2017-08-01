const express = require('express')
const app = express()
const path = require('path');
const manifest = require('./mockdata/manifest.json');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "../lib/index.html"))
})

//load test manifest
app.get('/game/manifest/:id', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(manifest));
})

//map handling
app.get('/game/map/:id/skybox/:name', function (req, res) {
    let mapName = req.params.id;
    let skyboxName = req.params.name;
    res.sendFile(path.join(__dirname, "../assets/maps/"+mapName+"/skybox/"+skyboxName));
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

//avatar handling

app.use('/static', express.static(path.join(__dirname, "../lib/static")))

app.listen(3000, function () {
  console.log('Test server running on 3000');
})