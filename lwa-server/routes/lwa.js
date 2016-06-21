﻿var express = require('express');var router = express.Router();var http = require("http2");var querystring = require('querystring')var config = require('../../config');// GET: '/lwa/auth'router.get('/auth', function (request, response) {    getAccessToken(request.query.code, function(err, result) {        if(err) {            response.code(500).send(err);        } else {            response.send("Got refresh token: " + result.refresh_token);        }    });});function getAccessToken(code, callback) {    if(config.DEBUG) console.log("Getting token...");    // get an access token using the refresh token    var options = {        method: "POST",        hostname: "api.amazon.com",        port: 443,        path: "/auth/o2/token",        headers: {            "content-type": "application/x-www-form-urlencoded;charset=UTF-8"        },        agent: new http.Agent({ keepAlive: false })  // turn off keep alive to avoid EOF errors    }    var req = http.request(options, function(res) {        var chunks = [];        res.on("data", function (chunk) {            chunks.push(chunk);        });        res.on("error", function (err) {            if (config.DEBUG) console.log("Access token response failed, trying again...");            getAccessToken();        });        res.on("end", function () {            // grab the access token            var access_token_response = JSON.parse(Buffer.concat(chunks));            if(config.DEBUG) console.log("Got token: " + JSON.stringify(access_token_response));            callback(null, access_token_response);        });    });    req.on("error", function (err) {        console.log(err);        if (config.DEBUG) console.log("Access token request failed, trying again...");        getAccessToken();    });    var body = "grant_type=authorization_code&code=" + querystring.escape(code) + "&client_id=" + querystring.escape(config.CLIENT_ID) + "&client_secret=" + querystring.escape(config.CLIENT_SECRET) + "&redirect_uri=" + querystring.escape("https://localhost/lwa/auth");    if(config.DEBUG) console.log("Posting body to /auth/o2/token:  " + body)    req.write(body);    req.end();}module.exports = router;