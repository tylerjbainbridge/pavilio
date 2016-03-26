/**
 * Created by tyler on 3/25/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Review = new Schema({
    username: String,
    albumid: String,
    score: Number,
    writtenReview: String
});

Review.plugin(random);
module.exports = mongoose.model('Review', Review);