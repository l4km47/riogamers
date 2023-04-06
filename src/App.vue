<template>
  <div>
    <TopHeader v-if="!isDashboard"></TopHeader>
    <div v-else>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <a class="navbar-brand" href="#">Dashboard</a>
      </nav>
    </div>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import TopHeader from "./components/TopHeader.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  setup() {
    const route = useRoute();

    const isDashboard = computed(() => {
      return route.path.includes("/dashboard") || route.path.includes("/admin");
    });

    return {
      isDashboard,
    };
  },
  components: {
    TopHeader,
  },
};
</script>

<style>
</style>
