const http = require('http');
const url = require('url');
const port = 25565;

const fs = require('fs');

http.createServer((req, res) => {
	
	const urlObj = url.parse(req.url, true);

	pathN = urlObj.pathname;
	
	if(pathN.startsWith("/Api/getRecentJoin"))
		{
			const params = current_url.searchParams;
			
			const interation = search_params.get('interation');
			const type = search_params.get('type');

			res.setHeader('Content-Type', 'application/json');
    		res.end(
			
			JSON.stringify(
				{ 
					Username: "Conni!~#0920", 
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
