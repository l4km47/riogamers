<template>
  <div class="center">
    <Vue3Lottie :animation-link="url404" :height="200" :width="200" />
    <h1>Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
  </div>
</template>
 
 <script>
import { Vue3Lottie } from "vue3-lottie";
import "vue3-lottie/dist/style.css";

export default {
  components: {
    Vue3Lottie,
  },
  name: "NotFoundComponent",
  data() {
    return {
      url404: "https://assets1.lottiefiles.com/packages/lf20_urmTP4.json",
    };
  },
};
</script>
 

<style lang="scss">
.center {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>