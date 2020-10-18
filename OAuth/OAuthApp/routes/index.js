var express = require('express');
const OAuthClient = require('disco-oauth');
var router = express.Router();

let oauthClient = new OAuthClient("767409581458194453", "fp4yxDabFu3zznhHPU2C80jtqQweZu3X");

oauthClient.setScopes(['identify', 'guilds'])
oauthClient.setRedirect('http://transvibe.club:25565/login/');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login/', async (req, res) => {
	
	let code = req.query.code;
	
	if(code == undefined) {
		res.send("Auth code isnt defined");
	}
	else {
		let userkey = await oauthClient.getAccess(code).catch(console.error);
		res.cookies.set('key', userkey);
				
		res.redirect('/user/');
	}
	
});

router.get('/user/', async (req, res)=> {
	let key = req.cookies.get('key');
	if(key) {
		let user = await oauthClient.getAuthorizedUser();
		
		res.render('user' , {
			name: user.username,
			id: user.id
		})
	}
	
	
});

module.exports = router;
