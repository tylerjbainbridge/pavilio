/**
 * Created by tyler on 3/25/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var album = require('./album').schema;
var random = require('mongoose-simple-random');

var Artist = new Schema({
    name: String,
    image: String,
    genre: [String],
    albums: [album]
});

Artist.plugin(random);
module.exports = mongoose.model('Artist', Artist);