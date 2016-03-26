/**
 * Created by tyler on 3/26/16.
 */
var reviewMarkup = "";
for(var i = 0; i<album.reviews.length; i++){
    reviewMarkup += "<p>" + album.reviews[i].writtenReview + "</p><br>" + "<p>"+ album.reviews[i].score +"</p>";
}

$("#userreviews").html(reviewMarkup);