<template>
  <div class="wrapper  mx-6">

    <div class="img">
      <img :src="hotelImg" :alt="accomodation.name"  class="rounded-lg  overflow-hidden">
    </div>

    <div class="details  flex  flex-col">
      <h2 class="flex  text-xl  font-bold  text-gray-800">
        {{ accomodation.name }}
        <span class="flex  items-start  mx-2">
          <img
            :key="i"
            v-for="i in Array.from({length: accomodation.rating})"
            :src="ratingStarIcon"
            class="rating-star"
          >
        </span>
      </h2>

      <p class="text-xs  text-gray-500">
        {{ accomodation.type }} - {{ distance }} {{distanceUnit}} de votre recherche
      </p>

      <div class="flex  items-center">
        <img :src="tripadvisorIcon" alt="tripadvisor:" />
        <span class="mx-2  text-gray-700  text-xs  font-bold">
          {{ accomodation.rating }}/5
        </span>
        <span class="ml-2  text-gray-500  text-xs  font-bold">
          ({{ accomodation.ratings }} avis)
        </span>
      </div>

      <div class="flex  my-2">
        <img
          :key="service.icon"
          v-for="service in accomodation.services"
          :src="service.icon"
          :alt="service.alt"
          :title="service.title || service.alt"
          class="mx-1  service-icon"
        >
      </div>

      <div class="prices  flex-grow  bg-gray-100  relative  rounded-lg">
        <div
          class="price-label  absolute  rounded-full  bg-white  text-gray-800  uppercase  mx-2  p-2  text-xs"
        >
          Tarif à partir de (1)
        </div>

        <div class="flex  justify-end  items-center  h-full  px-4">
          <div class="text-gray-500">
            <p class="text-right">Pour 1 nuit | 1 adulte</p>
            <div class="flex  flex-grow">
              <p>
                Public
                <span class="mx-1 text-xl  font-bold  text-gray-700">220</span>
                <span class="font-bold  text-sm">€</span>
              </p>
              <div class="v-rule"></div>
              <p class="price-member">
                <span class="text-blue-900">
                  Membre
                  <span class="mx-1 text-xl  font-bold">209</span>
                  <span class="font-bold  text-sm">€</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="actions  flex  justify-between">
      <span class="text-green-700  text-underline">Voir le calendrier des prix</span>
      <button class="rounded-full  bg-green-700  text-white  py-2  px-6">Sélectionner une chambre</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, reactive } from 'vue';
import hotelImg from '../assets/hotel.jpg';
import ratingStarIcon from '../assets/rating-star.svg';
import parkingIcon from '../assets/parking.svg';
import restaurantIcon from '../assets/restaurant.svg';
import tripadvisorIcon from '../assets/tripadvisor.png';
import beverageIcon from '../assets/beverage.svg';
import wifiIcon from '../assets/wifi.svg';
import airConditioningIcon from '../assets/air-conditioning.svg';

defineProps({
  msg: String,
});

const state = reactive({ count: 0 });
const accomodation = {
  name: 'Novotel Paris Les Halles',
  type: 'Hôtels',
  rating: 4,
  tripAdvisorRating: 4,
  ratings: 5563,
  services: [
    { icon: parkingIcon, alt: 'parking' },
    { icon: wifiIcon, alt: 'wifi' },
    { icon: restaurantIcon, alt: 'restaurant' },
    { icon: airConditioningIcon, alt: 'air conditioning' },
    { icon: beverageIcon, alt: 'beverage' },
  ],
};

const distance = '0.6';
const distanceUnit = 'km';

</script>

<style scoped>
.rating-star {
  width: 8px;
  margin: 0 1px;
}
.service-icon {
  width: 1.75em;
}
.prices {
}
.price-label {
  right: 1em;
  top: 0;
  transform: translateY(-50%);
}
.v-rule {
  border-left: 1px solid gray;
  margin: 0 1em;
  height: 1.75em;

  &:after {
    content: " "
  }
}

.wrapper {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 0.5em;
}

@media (max-width: 768px) {
  .wrapper {
    display: block;
  }
}

.img {
  grid-column: 1;
  grid-row: 1;
}
.details {
  grid-column: 2 / 12;
  grid-row: 1;
}
.actions {
  grid-column: 2 / 12;
  grid-row: 2;
}
</style>
