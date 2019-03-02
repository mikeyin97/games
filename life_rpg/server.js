var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('assets'));
app.use(express.static('static'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(2000);