<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3 col-lg-2 d-md-block">
        <nav class="nav flex-column">
          <router-link class="nav-link" to="/dashboard/challenges"
            >Challenges</router-link
          >
          <router-link class="nav-link" to="/dashboard/events"
            >Events</router-link
          >
          <router-link class="nav-link" to="/dashboard/games"
            >Games</router-link
          >
          <router-link class="nav-link" to="/dashboard/users">Users</router-link
          ><router-link class="nav-link" to="/dashboard/upload"
            >Uploads</router-link
          ><router-link class="nav-link" to="/dashboard/slides"
            >Slides</router-link
          >
        </nav>
      </div>
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
  
  <script>
import axios from "../../axios";

export default {};
</script>
  
  <style lang="scss" scoped>
header {
  display: none;
}
.sidebar {
  position: fixed;
  top: 4rem;
  bottom: 0;
  left: 0;
  z-index: 100;
  color: #fff;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
  border-right: 1px solid #e9ecef;
}

.nav-link {
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
}

.nav-link:hover {
  color: #0d6efd;
  text-decoration: none;
  background-color: #e9ecef;
}

.nav-link.active,
.nav-link:focus {
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
}
</style>
  