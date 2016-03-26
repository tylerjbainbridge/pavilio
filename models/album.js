/**
 * Created by tyler on 3/25/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Review = require('./review').schema;
var random = require('mongoose-simple-random');

var Album = new Schema({
    title: String,
    artist: String,
    criticScore: String,
    userScore: String,
    reviews: [Review],
    image: String,
    imageKey: String
});

Album.plugin(random);
module.exports = mongoose.model('Album', Album);