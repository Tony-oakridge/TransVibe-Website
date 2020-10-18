const Discord = require("discord.js");
const config = require("./config.json");
const querystring = require('querystring');
const fetch = require('node-fetch');

const http = require('http');
const url = require('url');
const port = 25565;

const fs = require('fs');

const client = new Discord.Client();

// Bot status
client
  .on("connected", () => {
    console.warn("Fyre has reconnected!");
  })
  .on("reconnecting", () => {
    console.warn("Fyre is reconnecting...");
  })
  .on("disconnect", () => {
    console.warn("Warning! Fyre has disconnected!");
  });

client.on("ready", async () => {   
	console.log("CLIENT");
	console.log(client);
});

http.createServer((req, res) => {
	
		const urlObj = url.parse(req.url, true);

	
	
		if (urlObj.query.code) {
		const accessCode = urlObj.query.code;
		const data = {
			client_id: '767409581458194453',
			client_secret: 'fp4yxDabFu3zznhHPU2C80jtqQweZu3X',
			grant_type: 'authorization_code',
			redirect_uri: 'http://transvibe.club:25565/',
			code: accessCode,
			scope: 'the scopes',
		};

		fetch('https://discord.com/api/oauth2/token', {
			method: 'POST',
			body: new URLSearchParams(data),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
			.then(discordRes => discordRes.json())
			.then(info => {
				console.log(info);
				return info;
			})
			.then(info => fetch('https://discord.com/api/users/@me', {
				headers: {
					authorization: `${info.token_type} ${info.access_token}`,
				},
			}))
			.then(userRes => userRes.json())
			.then(console.log);
	}

	if (urlObj.pathname === '/') {
		responseCode = 200;
		content = fs.readFileSync('../index.html');
						res.writeHead(200, {
					'content-type': 'text/html;charset=utf-8',
				});

				res.write(content);
				res.end();
		return;
	}

	

	pathN = urlObj.pathname;
	
	if(pathN.startsWith("/Api/getRecentJoin"))
		{
			console.log(client.guilds.cache.array());
			
			var queryStr = urlObj.search.substring(1);
			var params = querystring.parse(queryStr);
			console.log(params);
			
			const interationS = params.interation;

			res.setHeader('Content-Type', 'application/json');
    		res.end(
			
			JSON.stringify(
				{ 
					interation: interationS,
					userName: "Conni!~#0920", 
					id: 123456789, 
					timeSinceJoin: "A long time!"
				} 
			));
			return;
		}

	if(pathN.startsWith("/admin"))
	{
		// read file sample.html
		fs.readFile('../Ari_Test.html',
			// callback function that is called when reading file is done
			function(err, data) { 
				if (err) throw err;
				// data is a buffer containing file content
				let content = data.toString('utf8');

				console.log("Request made for!");
				console.log(pathN);

				res.writeHead(200, {
					'content-type': 'text/html;charset=utf-8',
				});

				res.write(content);
				res.end();

		});		
	}

})
.listen(port);
