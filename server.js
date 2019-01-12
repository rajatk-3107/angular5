const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    config = require('./config/config.json')
contacts = require('./routes/routes')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect('mongodb://test:plmnko09876@ds121726.mlab.com:21726/school', (err, data) => {
    if (err) throw err;
    else console.log("Database connected.")
})
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})
app.set('secret', config.SECRET);
app.use('/', contacts)

app.use(express.static(__dirname + '/dist'))
app.use(function(req, res) {
    res.sendFile(__dirname + '/dist/index.html')
})

app.listen(config.PORT, () => {
    console.log("Server started at port : " + config.PORT);
})