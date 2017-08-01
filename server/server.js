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

app.use('/static', express.static(path.join(__dirname, "../lib/static")))

app.listen(3000, function () {
  console.log('Test server running on 3000');
})