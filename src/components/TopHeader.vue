<template>
  <div>
    <header>
      <div class="topheader">
        <ul class="header-social">
          <p>Follow us :</p>
          <li class="header-social-li">
            <a :href="facebook" class="header-social-a" target="_blank"
              ><i class="fab fa-facebook-square"></i
            ></a>
          </li>
          <li v-if="show" class="header-social-li">
            <a :href="twitter" class="header-social-a" target="_blank"
              ><i class="fab fa-twitter-square"></i
            ></a>
          </li>
          <li class="header-social-li">
            <a :href="instagrame" class="header-social-a" target="_blank"
              ><i class="fab fa-instagram-square"></i
            ></a>
          </li>
          <li class="header-social-li">
            <a :href="youtube" class="header-social-a" target="_blank"
              ><i class="fab fa-youtube-square"></i
            ></a>
          </li>
          <li class="header-social-li">
            <a
              :href="twitch"
              class="header-social-a header-social-a--twitch"
              target="_blank"
              ><i class="fab fa-twitch"></i
            ></a>
          </li>
          <li class="header-social-li">
            <a
              :href="discord"
              class="header-social-a header-social-a--twitch"
              target="_blank"
            >
              <i class="fab fa-discord"></i
            ></a>
          </li>
        </ul>
      </div>
      <div class="navbar">
        <div class="header-logo">
          <img :src="logo" />
        </div>
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div
              class="offcanvas offcanvas-end"
              tabindex="-1"
              id="navbarNav"
              aria-labelledby="navbarNavLabel"
            >
              <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="navbarNavLabel">
                  Navigation menu
                </h5>
                <button
                  type="button"
                  class="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div class="offcanvas-body">
                <ul class="navbar-nav">
                  <li v-for="rout in routers" :key="rout.id" class="nav-item">
                    <router-link
                      :class="' nav-link ' + (rout.active ? 'active' : '')"
                      aria-current="page"
                      :to="rout.to"
                      data-bs-dismiss="offcanvas"
                      @click="closenav(rout)"
                      >{{ rout.title }}</router-link
                    >
                  </li>
                  <li
                    v-for="rout in logingrouters"
                    :key="rout.id"
                    class="nav-item"
                  >
                    <router-link
                      v-if="!username"
                      :class="' nav-link ' + (rout.active ? 'active' : '')"
                      aria-current="page"
                      :to="rout.to"
                      data-bs-dismiss="offcanvas"
                      @click="closenav(rout)"
                      >{{ rout.title }}</router-link
                    >
                  </li>
                  <router-link
                    v-if="username"
                    class="nav-link"
                    aria-current="page"
                    to="/profile"
                    data-bs-dismiss="offcanvas"
                    @click="closenav({ to: '/profile' })"
                    >User Profile</router-link
                  >
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  </div>

  <login-modal></login-modal>
  <RegistrationModal />
  <discord-model></discord-model>
</template>

<script>
import LoginModal from "./LoginModel.vue";
import RegistrationModal from "./RegistrationModal.vue";
import axios from "../axios";
import DiscordModel from "./DiscordModel.vue";

export default {
  components: {
    LoginModal,
    RegistrationModal,
    DiscordModel,
  },
  async created() {
    const response = await axios.get("/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    this.username = response.data.username;
  },
  data() {
    return {
      facebook: "https://www.facebook.com/riogamerslk",
      tiktok: "https://www.tiktok.com/@riogamerslk",
      twitter: "",
      instagrame: "https://www.instagram.com/riogamerslk/",
      youtube: "https://www.youtube.com/riogamerslk",
      twitch: "https://www.twitch.tv/riogamerslk",
      discord: "https://discord.gg/BJDuAutU4t",
      username: "",
      logo: "/public/logo.png",
      modalShown: false,
      routers: [
        { id: 1, to: "/", title: "Home", active: true },
        { id: 2, to: "/events", title: "Events", active: false },
        { id: 4, to: "/challanges", title: "Challanges", active: false },
        { id: 3, to: "/clans", title: "Clans", active: false },
      ],
      logingrouters: [
        {
          id: 5,
          to: "/login",
          title: "Login",
          active: false,
          model: "loginModal",
        },
        {
          id: 6,
          to: "/register",
          title: "Register",
          active: false,
          model: "registrationModal",
        },
      ],
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
    };
  },
  mounted() {
    let showModalFlag = false;
    const lastShown = localStorage.getItem("discordModalLastShown");
    console.log(lastShown);
    const now = new Date().getTime();

    // show modal if it hasn't been shown in the last hour
    if (!lastShown || now - parseInt(lastShown, 10) >= 3600000) {
      showModalFlag = true;
      localStorage.setItem("discordModalLastShown", now.toString());
    }
    if (showModalFlag) this.showModal("discordmodel");
  },
  methods: {
    login() {},
    showModal(id) {
      // Get the modal element
      const modal = document.getElementById(id);

      // Create a Bootstrap Modal object from the modal element
      const modalObject = new bootstrap.Modal(modal);

      // Show the modal
      modalObject.show();
    },
    closenav(rout) {
      if (rout.model) {
        this.showModal(rout.model);
      } else this.$router.push(rout.to);
    },
  },
};
</script>

<style lang="scss" scoped>
$base-color: #ff7d7d;
a:visited {
  color: $base-color;
}
</style>