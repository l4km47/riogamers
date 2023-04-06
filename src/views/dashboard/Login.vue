<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Login</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                  type="email"
                  class="form-control"
                  id="username"
                  slide
                  v-model="username"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                  required
                />
              </div>
              <div v-if="error" class="alert alert-danger" role="alert">
                {{ error }}
              </div>
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import axios from "../../axios.js";

export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      this.error = "";
      try {
        const response = await axios.post("/login", {
          email: this.username,
          password: this.password,
        });
        if (response.data) {
          localStorage.setItem("token", response.data.token);
          if (response.data.isAdmin) {
            this.$router.push("/dashboard");
          } else {
            this.$router.push("/profile");
          }
        } else {
          this.error = response.data;
        }
      } catch (err) {
        console.log(err.response.data);
        this.error = "Invalid email or password";
      }
    },
  },
};
</script>
  