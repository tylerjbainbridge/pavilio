/**
 * Created by tyler on 3/26/16.
 */
var reviewMarkup = "";
for(var i = 0; i<album.reviews.length; i++){
    reviewMarkup += "<p>" +  album.reviews[i].username + ": " + album.reviews[i].writtenReview + "</p>" + "<p>"+ album.reviews[i].score +"/10</p><br>";
}

$("#userreviews").html(reviewMarkup);
