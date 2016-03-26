var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Artist = require('../models/artist');
var Album = require('../models/album');
var router = express.Router();


router.get('/', function (req, res) {
  res.render('index', { user : req.user });
});

router.get('/addalbum', function (req, res) {
  res.render('addalbum', { user : req.user });
});

router.get('/register', function(req, res) {
  res.render('register', { });
});

router.post('/register', function(req, res) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.render('register', { account : account });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

router.post('/create/artist', function(req, res) {
  var newArtist = new Artist({name: req.body.name, image: req.body.image});
  console.log(req.body.name);
  newArtist.save(function(err) {
    if (err){
      throw err;
    }else{
      res.sendStatus(200);
    }

    console.log('Image created!');
  });
});

router.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});

router.get('/album/:albumName', function(req, res) {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/ping', function(req, res){
  res.status(200).send("pong!");
});

module.exports = router;
