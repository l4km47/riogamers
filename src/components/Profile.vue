<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <img
              :src="user.avatar"
              class="img-fluid rounded-circle mb-3"
              alt="User Avatar"
            />
            <h5 class="card-title">{{ user.name }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ user.email }}</h6>
            <p class="card-text">{{ user.bio }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Edit Profile</h5>
            <form>
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="user.name"
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="user.email"
                />
              </div>
              <div class="mb-3">
                <label for="bio" class="form-label">Bio</label>
                <textarea
                  class="form-control"
                  id="bio"
                  rows="3"
                  v-model="user.bio"
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import axios from "../axios";

export default {
  data() {
    return {
      user: null,
    };
  },
  async created() {
    const response = await axios.get("/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    this.user = response.data;
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      location.reload();
    },
  },
};
</script>
  