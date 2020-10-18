const express = require('express');
const dotenv = require('dotenv').config()
const fetch = require('node-fetch');
const btoa = require('btoa');
const { catchAsync } = require('../utils');

const router = express.Router();
const scopes = ['identify', 'guilds'];

const CLIENT_ID = "767409581458194453";
const CLIENT_SECRET = "fp4yxDabFu3zznhHPU2C80jtqQweZu3X";
const redirect =       
encodeURIComponent('http://transvibe.club:25565/callback');

router.get('/login', (req, res) => {
  res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect}&response_type=code&scope=identify%20guilds`);
});

router.get('/callback', catchAsync(async (req, res) => {
  if (!req.query.code) throw new Error('NoCodeProvided');
  const code = req.query.code;
  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
    {
  method: 'POST',
  headers: {
    Authorization: `Basic ${creds}`,
  },
});
  const json = await response.json();
  res.redirect(`/success/?token=${json.access_token}`);
}));

module.exports = router;
