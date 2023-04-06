<template>
  <vue-carousel :per-page="perPage" :pagination="pagination">
    <slot></slot>
  </vue-carousel>
</template>
  
  <script>
import { ref } from "vue";
import VueCarousel from "vue-carousel-3";

export default {
  components: {
    VueCarousel,
  },
  props: {
    perPage: {
      type: Number,
      default: 1,
    },
    pagination: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
  