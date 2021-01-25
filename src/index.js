const app = require('../app');

//Question 4
const hotel = app.findHotelNearbyWithBestOfferForUser(48.855163, 2.409015, 2000, "11/01/2021",8);

document.querySelector(".hotel_title").innerHTML= hotel[0].commercialName;
document.querySelector(".km").innerHTML= hotel[0].distance/1000;
document.querySelector(".local-rating").innerHTML= hotel[0].localRating;
document.querySelector(".info-public__price .block__price .price__value").innerHTML= hotel.offer.price;
document.querySelector(".info-membre__price .block__price .price__value").innerHTML= hotel.offer.price;

