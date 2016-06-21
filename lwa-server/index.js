var app = require('./app');
var config = require('../config');
var https = require('https');
var fs = require('fs');

var server = app.listen(config.port, function () {
    console.log('Express server listening on port ' + server.address().port);
});

// SSL server in case we're running locally
https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app).listen(443);

module.exports = server;
