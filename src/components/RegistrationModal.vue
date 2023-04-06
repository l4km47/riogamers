<template>
  <div
    class="modal fade"
    id="registrationModal"
    tabindex="-1"
    aria-labelledby="registrationModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="loginModalLabel">Register</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <form @submit.prevent="handleSubmit" novalidate>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="firstName" class="form-label">First Name</label>
                  <input
                    v-model="form.firstName"
                    type="text"
                    class="form-control"
                    id="firstName"
                    required
                  />
                  <div class="invalid-feedback" v-if="formErrors.firstName">
                    {{ formErrors.firstName }}
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="lastName" class="form-label">Last Name</label>
                  <input
                    v-model="form.lastName"
                    type="text"
                    class="form-control"
                    id="lastName"
                    required
                  />
                  <div class="invalid-feedback" v-if="formErrors.lastName">
                    {{ formErrors.lastName }}
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                  v-model="form.username"
                  type="text"
                  class="form-control"
                  id="username"
                  required
                />
                <div class="invalid-feedback" v-if="formErrors.username">
                  {{ formErrors.username }}
                </div>
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="form-control"
                  id="email"
                  required
                />
                <div class="invalid-feedback" v-if="formErrors.email">
                  {{ formErrors.email }}
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                    v-model="form.password"
                    type="password"
                    class="form-control"
                    id="password"
                    required
                  />
                  <div class="invalid-feedback" v-if="formErrors.password">
                    {{ formErrors.password }}
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="confirmPassword" class="form-label"
                    >Confirm Password</label
                  >
                  <input
                    v-model="form.confirmPassword"
                    type="password"
                    class="form-control"
                    id="confirmPassword"
                    required
                  />
                  <div
                    class="invalid-feedback"
                    v-if="formErrors.confirmPassword"
                  >
                    {{ formErrors.confirmPassword }}
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="birthdate" class="form-label">Birthdate</label>
                <input
                  v-model="form.birthdate"
                  type="date"
                  class="form-control"
                  id="birthdate"
                  required
                />
                <div class="invalid-feedback" v-if="formErrors.birthdate">
                  {{ formErrors.birthdate }}
                </div>
              </div>

              <div class="mb-3">
                <label for="country" class="form-label">Country</label>
                <select
                  v-model="form.country"
                  class="form-select"
                  id="country"
                  required
                >
                  <option value="" selected disabled>
                    Select your country
                  </option>
                  <option
                    v-for="country in countries"
                    :key="country.code"
                    :value="country.name"
                  >
                    {{ country.name }}
                  </option>
                </select>
                <div class="invalid-feedback" v-if="formErrors.country">
                  {{ formErrors.country }}
                </div>
              </div>

              <div class="mb-3">
                <label for="game" class="form-label">Game</label>
                <select
                  v-model="form.game"
                  class="form-select"
                  id="game"
                  required
                >
                  <option value="" selected disabled>Select your game</option>
                  <option
                    v-for="game in games"
                    :key="game.id"
                    :value="game.code"
                  >
                    [{{ game.code }}] {{ game.name }}
                  </option>
                </select>
                <div class="invalid-feedback" v-if="formErrors.game">
                  {{ formErrors.game }}
                </div>
              </div>
              <div v-if="error" class="alert alert-danger" role="alert">
                {{ error }}
              </div>
              <button type="submit" class="btn btn-primary">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios.js";

export default {
  data() {
    return {
      error: "",
      games: [
        { id: 1, code: "apex", name: "Apex Legends", type: "Battle Royale" },
        {
          id: 2,
          code: "csgo",
          name: "Counter-Strike: Global Offensive",
          type: "First-person shooter",
        },
        { id: 3, code: "dota2", name: "Dota 2", type: "MOBA" },
        { id: 4, code: "fortnite", name: "Fortnite", type: "Battle Royale" },
        {
          id: 5,
          code: "leagueoflegends",
          name: "League of Legends",
          type: "MOBA",
        },
        { id: 6, code: "minecraft", name: "Minecraft", type: "Sandbox" },
        {
          id: 7,
          code: "overwatch",
          name: "Overwatch",
          type: "First-person shooter",
        },
        {
          id: 8,
          code: "pubg",
          name: "PlayerUnknown's Battlegrounds",
          type: "Battle Royale",
        },
        {
          id: 9,
          code: "rainbowsixsiege",
          name: "Rainbow Six Siege",
          type: "Tactical shooter",
        },
        {
          id: 10,
          code: "valorant",
          name: "Valorant",
          type: "First-person shooter",
        },
        { id: 11, code: "rocketleague", name: "Rocket League", type: "Sports" },
      ],
      form: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthdate: "",
        country: "",
        game: "",
      },
      formErrors: {},
      countries: [
        { code: "US", name: "United States" },
        { code: "CA", name: "Canada" },
        { code: "MX", name: "Mexico" },
      ],
    };
  },
  methods: {
    async handleSubmit() {
      this.formErrors = {};

      if (!this.form.firstName) {
        this.formErrors.firstName = "First name is required.";
      }

      if (!this.form.lastName) {
        this.formErrors.lastName = "Last name is required.";
      }

      if (!this.form.username) {
        this.formErrors.username = "Username is required.";
      }

      if (!this.form.email) {
        this.formErrors.email = "Email is required.";
      } else if (!this.validateEmail(this.form.email)) {
        this.formErrors.email = "Invalid email address.";
      }

      if (!this.form.password) {
        this.formErrors.password = "Password is required.";
      } else if (this.form.password.length < 6) {
        this.formErrors.password = "Password must be at least 6 characters.";
      }

      if (!this.form.confirmPassword) {
        this.formErrors.confirmPassword = "Confirm password is required.";
      } else if (this.form.password !== this.form.confirmPassword) {
        this.formErrors.confirmPassword = "Passwords do not match.";
      }

      if (!this.form.birthdate) {
        this.formErrors.birthdate = "Birthdate is required.";
      } else if (!this.validateBirthdate(this.form.birthdate)) {
        this.formErrors.birthdate = "Invalid birthdate.";
      }

      if (!this.form.country) {
        this.formErrors.country = "Country is required.";
      }

      if (!this.form.game) {
        this.formErrors.game = "Game is required.";
      }

      if (Object.keys(this.formErrors).length === 0) {
        //alert("Registration successful!");
        console.log(this.form);
        try {
          const response = await axios.post("/register", this.form);
          console.log(response.data);
          if (response.data.error) {
            this.error = response.data.error;
          } else if (response.data.message) {
            this.error = null;
            location.reload();
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
    validateEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
    validateBirthdate(birthdate) {
      const date = new Date(birthdate);
      return date instanceof Date && !isNaN(date);
    },
  },
};
</script>
<style scoped>
</style>