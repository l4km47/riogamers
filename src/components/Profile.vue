<template>
  <div class="container">
    <h1>User Profile</h1>
    <p>Welcome, {{ username }}!</p>
    <button class="btn btn-danger" @click="logout">Logout</button>
  </div>
</template>
  
  <script>
import axios from "../axios";

export default {
  data() {
    return {
      username: "",
    };
  },
  async created() {
    const response = await axios.get("/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    this.username = response.data.username;
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      location.reload();
    },
  },
};
</script>
  