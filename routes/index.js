var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Artist = require('../models/artist');
var Album = require('../models/album');
var Review = require('../models/review');
var router = express.Router();


router.get('/', function (req, res) {
  res.render('index', { user : req.user });
});

router.get('/addartist', function (req, res) {
  res.render('addartist', { user : req.user });
});

router.get('/allalbums', function (req, res){
  Album.find({}, function (err, albums){
    var albumMarkup = "";
    for(var i=0; i<albums.length; i++){
      albumMarkup+="<a href=\"/album/" + albums[i].id + "\">"  +
              albums[i].title + "</a><br>";
      console.log(albumMarkup);
    }
    res.render('allalbums', {albums: albumMarkup});
    console.log(albums[0]);
  });
});

router.get('/album/:albumid', function (req, res) {
  Album.findById(req.params.albumid, function(err, album){
    if(album){
      console.log(album.title);
      res.render('album', { album : album});
    }else{
      console.log("error");
    }

  });
});

router.get('/artist/:artistname', function (req, res) {
  Artist.findOne({shortname: req.params.artistname}, function(err, artist){
    if(artist){
      var albumMarkup = "";
      for(var i=0; i<artist.albums.length; i++){
        albumMarkup+="<a href=\"/album/" + artist.albums[i].id + "\">"  +
            artist.albums[i].title + "</a><br>";
      }
      res.render('artist', {artist: artist, albums: albumMarkup});
      console.log(artist.shortname);
    }else{
      console.log("error");
    }

  });
});

router.get('/artist', function (req, res) {
  res.render('artist', { user : req.user });
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
  var shortname = req.body.name.replace(/\s/g, '');
  shortname = shortname.toLowerCase();
  var newArtist = new Artist({name: req.body.name, image: req.body.image, shortname: shortname});
  console.log(req.body.name);
  newArtist.save(function(err) {
    if (err){
      throw err;
    }else{
      res.render('addalbum', {artist: req.body.name});
    }

    console.log('Image created!');
  });
});

router.post('/review/:album', function(req, res){
  Album.findOne({shortname: req.params.album}, function (err, alb) {
    if (alb) {
      var newReview = new Review({username: req.user.username,
        albumid: alb.id,
        score: req.body.score,
        writtenReview: req.body.review});
      newReview.save(function(err) {
        if (err){
          throw err;
        }else{

        }
      });
      alb.reviews.push(newReview);
      alb.save(function(err) {
        if (err){
          throw err;
        }else{
          res.redirect('/album/' + alb.id);
        }
      });
    }else{

    }
  });
});

router.post('/create/album', function(req, res) {
  var shortname = req.body.album.replace(/\s/g, '');
  shortname = shortname.toLowerCase();
  //var artisthortname = req.body.artist.replace(/\s/g, '');
  //artisthortname = shortname.toLowerCase();
  Artist.findOne({name: req.body.artist}, function (err, art) {
    if(art){
      console.log(art);
      var newAlbum = new Album({title: req.body.album, artist: req.body.artist, artistshortname: art.shortname, image: req.body.image, shortname: shortname});
      newAlbum.save(function(err) {
        if (err) {
          throw err;
        } else {
          res.sendStatus(200);
        }
      });
      art.albums.push(newAlbum);
      art.save(function(err) {
        if (err){
          throw err;
        }else{
          res.render('addalbum', {artist: art.artist});
        }
      });
    }else{
      console.log("error");
    }
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
