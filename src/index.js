const app = require('../app');


// Question 1
// console.log("hotels q1", app.findHotelsNearby(48.856564, 2.351711, 2000));

// Question 2
// console.log("prices q2",app.findHotelNearbyWithBestOffer(48.855163, 2.409015, 2000, "11/01/2021"));

//Question 3
// console.log("user q3",app.findHotelNearbyWithBestOfferForUser(48.855163, 2.409015, 2000, "11/01/2021",8));



//Question 4
const hotel = app.findHotelNearbyWithBestOfferForUser(48.855163, 2.409015, 2000, "11/01/2021",8);


document.querySelector(".hotel_title").innerHTML= hotel.commercialName;
document.querySelector(".km").innerHTML= hotel.distance/1000;
document.querySelector(".local-rating").innerHTML= hotel.localRating;
document.querySelector(".info-public__price .block__price .price__value").innerHTML= hotel.offre.price;
document.querySelector(".info-membre__price .block__price .price__value").innerHTML= hotel.offre.price;

