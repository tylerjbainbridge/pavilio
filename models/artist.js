/**
 * Created by tyler on 3/25/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var album = require('./album').schema;

var Artist = new Schema({
    name: String,
    image: String,
    genre: [String],
    albums: [album]
});

module.exports = mongoose.model('Artist', Artist);