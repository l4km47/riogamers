<template>
  <div
    class="modal fade"
    id="loginModal"
    tabindex="-1"
    aria-labelledby="loginModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header" v-if="!loading">
          <h5 class="modal-title" id="loginModalLabel">Log In</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div v-if="loading" class="text-center">
            <p>{{ generateFact() }}</p>
            <Vue3Lottie :animationData="mario" />
          </div>
          <div v-else>
            <form>
              <div class="mb-3">
                <label for="loginEmail" class="form-label">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="loginEmail"
                  v-model="email"
                  :class="{ 'is-invalid': errors.email }"
                />
                <div v-if="errors.email" class="invalid-feedback">
                  {{ errors.email }}
                </div>
              </div>
              <div class="mb-3">
                <label for="loginPassword" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="loginPassword"
                  v-model="password"
                  :class="{ 'is-invalid': errors.password }"
                />
                <div v-if="errors.password" class="invalid-feedback">
                  {{ errors.password }}
                </div>
              </div>
              <div v-if="error" class="alert alert-danger" role="alert">
                {{ error }}
              </div>
              <div class="d-grid gap-2">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="login"
                  :disabled="loading"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import mario from "../assets/mario.json";
import axios from "../axios";
export default {
  data() {
    return {
      mario,
      email: "",
      password: "",
      error: "",
      errors: {},
      loading: false,
      randomFact: "",
      facts: [
        "Super Mario Bros. was released in 1985.",
        "Mario's full name is Mario Mario.",
        "Bowser's original name was King Koopa.",
        "The original Donkey Kong game was actually Mario's first appearance.",
        "The first Mario Kart game was released in 1992.",
        "The Super Mario Bros. theme song was composed by Koji Kondo.",
        "Mario's creator, Shigeru Miyamoto, drew inspiration for the character from a landlord he had as a young adult.",
        "Mario has appeared in over 200 video games.",
      ],
    };
  },
  methods: {
    generateFact() {
      const randomIndex = Math.floor(Math.random() * this.facts.length);
      this.randomFact = this.facts[randomIndex];
      return this.randomFact;
    },
    async login() {
      // Reset errors
      this.errors = {};

      // Validate form inputs
      if (!this.email) {
        this.errors.email = "Please enter an email address";
      } else if (!this.validateEmail(this.email)) {
        this.errors.email = "Please enter a valid email address";
      }
      if (!this.password) {
        this.errors.password = "Please enter a password";
      } else if (this.password.length < 8) {
        this.errors.password = "Password must be at least 8 characters long";
      }

      // If form is valid, initiate login and show loading animation
      if (Object.keys(this.errors).length === 0) {
        this.loading = true;
        // Replace with actual login logic
        try {
          const response = await axios.post("/login", {
            email: this.email,
            password: this.password,
          });
          localStorage.setItem("token", response.data.token);
          setTimeout(() => {
            this.loading = false;
            $("#loginModal").modal("hide");
            if (response.data.isAdmin) {
              this.$router.push("/dashboard");
            } else {
              location.reload();
            }
          }, 2000);
        } catch (err) {
          console.log(err);
          this.error = "Invalid email or password";
        }
      }
    },
    validateEmail(email) {
      // Simple email validation function, can be improved
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
  },
};
</script>
  
<style lang="scss">
</style>