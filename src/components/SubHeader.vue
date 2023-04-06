<template>
  <div class="sub-header">
    <div class="sub-header-title">
      <h5>{{ title }}</h5>
    </div>
    <router-link :to="linkto" class="">
      Explore more
      <i class="fa fa-angle-right"></i>
    </router-link>
  </div>
</template>
  
  <script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SubHeader",
  props: {
    title: String,
    linkto: String,
  },
});
</script>
  
<style lang=scss>
</style>
  