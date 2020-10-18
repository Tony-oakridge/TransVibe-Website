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
	console.log("Ready!");
});

http.createServer((req, res) => {

	const urlObj = url.parse(req.url, true);

	pathN = urlObj.pathname;
	
	if(pathN.startsWith("/Api/getMaxUsers")) {
		let guild = client.guilds.cache.find(c => c.id == '689925894764232788');
		
		res.setHeader('Content-Type', 'application/json');
    	res.end(
			
		JSON.stringify(
			{ 
				count: guild.members.cache.array().length
			}));
		return;
	}
	
	if(pathN.startsWith("/Api/getUser"))
		{
			let guild = client.guilds.cache.find(c => c.id == '689925894764232788');

		//	for (let i = 0; i < guild.members.cache.array().length; i++) {
		//		if(guild.members.cache.array()[UserIndex].id == "299709641271672832") {
		//			var saved = guild.members.cache.array()[i];
		//		}
		//		console.log(guild.members.cache.array()[i].displayName);
		//	}
			
			var queryStr = urlObj.search.substring(1);
			var params = querystring.parse(queryStr);
			
			// Params
			const UserIndex = params.UserIndex;

			
			res.setHeader('Content-Type', 'application/json');
    		res.end(
			
			JSON.stringify(
				{ 
					interation: UserIndex,
					userName: guild.members.cache.array()[UserIndex].displayName, 
					id: guild.members.cache.array()[UserIndex].id, 
					timeSinceJoin: "A long time!"
				}));
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

				res.writeHead(200, {
					'content-type': 'text/html;charset=utf-8',
				});

				res.write(content);
				res.end();

		});		
	}

})
.listen(port);

client.login(config.token);
