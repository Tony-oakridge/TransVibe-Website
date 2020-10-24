const Discord = require("discord.js");
const config = require("./config.json");
const querystring = require('querystring');

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

http.createServer((req, res) => {
	
	const urlObj = url.parse(req.url, true);

	pathN = urlObj.pathname;
	
	if(pathN.startsWith("/Api/getRecentJoin"))
		{
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
})
.listen(port);
