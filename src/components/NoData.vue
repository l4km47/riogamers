<template>
  <div class="no-data">
    <p>No Upcoming {{ datatype }}</p>
    <Vue3Lottie :animationData="animation" />
  </div>
</template>
  
  <script>
import emptyghost from "../assets/empty-ghost.json";

export default {
  name: "NoDataComponent",
  components: {},
  data() {
    return {
      emptyghost,
    };
  },
  props: {
    datatype: {
      type: String,
      required: true,
    },
  },
  computed: {
    animation() {
      return emptyghost;
    },
  },
};
</script>
  
  <style >
</style>
  