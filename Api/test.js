var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const fetch = require('node-fetch');
const FormData = require('form-data');
const data = new FormData();

const fs = require('fs');

const axios = require("axios")
const process = require("process")
app.use(bodyParser.text());


app.get('/', function (req, res) {
		// read file sample.html
		fs.readFile('../index.html',
			// callback function that is called when reading file is done
			function(err, data) { 
				if (err) throw err;
				// data is a buffer containing file content
				let content = data.toString('utf8');

				console.log("Request made for!");

				res.writeHead(200, {
					'content-type': 'text/html;charset=utf-8',
				});

				res.write(content);
				res.end();

		});	
})
app.post('/', function (req, res) {
    console.log(req.body)
    data.append('client_id', "767409581458194453");
    data.append('client_secret', "fp4yxDabFu3zznhHPU2C80jtqQweZu3X");
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', "http://transvibe.club:25565/");
    data.append('scope', 'identify');
    data.append('code', req.body);

    fetch('https://discordapp.com/api/oauth2/token', {
        method: 'POST',
        body: data,
    })
        .then(response => response.json())
        .then(data=>{
            console.log(data)
            const config = {
                headers:{
                    "authorization":`Bearer ${data.access_token}`
                }
            }
            axios
                .get("https://discordapp.com/api/users/@me",config)
                .then(response=>{
                    console.log(response.data.username)
                    res.send(response.data.username)
                })
                .catch(error=>{
                    console.log(error)
                })
        })
})
app.listen(25565)
=======
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const fetch = require('node-fetch');
const FormData = require('form-data');
const data = new FormData();

const fs = require('fs');

const axios = require("axios")
const process = require("process")
app.use(bodyParser.text());


app.get('/', function (req, res) {
		// read file sample.html
		fs.readFile('../index.html',
			// callback function that is called when reading file is done
			function(err, data) { 
				if (err) throw err;
				// data is a buffer containing file content
				let content = data.toString('utf8');

				console.log("Request made for!");

				res.writeHead(200, {
					'content-type': 'text/html;charset=utf-8',
				});

				res.write(content);
				res.end();

		});	
})
app.post('/', function (req, res) {
    console.log(req.body)
    data.append('client_id', "767409581458194453");
    data.append('client_secret', "fp4yxDabFu3zznhHPU2C80jtqQweZu3X");
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', "http://transvibe.club:25565/");
    data.append('scope', 'identify');
    data.append('code', req.body);

    fetch('https://discordapp.com/api/oauth2/token', {
        method: 'POST',
        body: data,
    })
        .then(response => response.json())
        .then(data=>{
            console.log(data)
            const config = {
                headers:{
                    "authorization":`Bearer ${data.access_token}`
                }
            }
            axios
                .get("https://discordapp.com/api/users/@me",config)
                .then(response=>{
                    console.log(response.data.username)
                    res.send(response.data.username)
                })
                .catch(error=>{
                    console.log(error)
                })
        })
})
app.listen(25565)