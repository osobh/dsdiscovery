var express = require('express');
var passport = require('passport');
var router = express.Router();

var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'https://dsp01.dyndns.org/callback'
};
/* GET users listing. */

router.get('/',
  function(req, res){
    res.render('login', { env: env });
  });

module.exports = router;
