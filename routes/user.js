var express = require('express');
var router = express.Router();
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});

/* GET user profile. */
router.get('/', ensureLoggedIn, function(req, res, next) {
  res.render('user', { user: req.user});
});

router.get('/datascience', ensureLoggedIn, function(req, res, next) {
  res.render('datas', { user: req.user, title: "Data Science"});
});

router.get('/spark', ensureLoggedIn, function(req, res, next) {
  res.render('spark', { user: req.user, title: "Spark"});
});

router.get('/tensorflow', ensureLoggedIn, function(req, res, next) {
  res.render('tensorflow', { user: req.user, title: "Tensor Flow"});
});

router.get('/zepp', ensureLoggedIn, function(req, res, next) {
  res.render('zepp', { user: req.user, title: "Zeppelin"});
});

module.exports = router;