<template>
  <div class="container mt-4">
    <div class="col">
      <h1>Create or Update Challage</h1>
      <form @submit.prevent="handleSubmit">
        <div class="row">
          <div class="col-md-3 m-3">
            <div>
              <label for="image">Select Image:</label>
              <input
                type="file"
                id="image"
                ref="imageInput"
                @change="setImage"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Image URL</label>
              <input
                type="text"
                class="form-control form-control-sm"
                v-model="form.image"
                disabled
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Price Pool</label>
              <input
                type="number"
                class="form-control form-control-sm"
                v-model="form.pricepool"
                required
              />
            </div>
          </div>
          <div class="col-md-3 m-3">
            <div class="mb-3">
              <label class="form-label">Title</label>
              <input
                type="text"
                class="form-control form-control-sm"
                v-model="form.title"
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea
                class="form-control form-control-sm"
                v-model="form.discription"
                required
              ></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label">Participants</label>
              <input
                type="number"
                class="form-control form-control-sm"
                v-model="form.participants"
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Time</label>
              <input
                type="datetime-local"
                class="form-control form-control-sm"
                v-model="form.time"
                required
              />
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <hr />
    <div class="col">
      <h1>Challage List</h1>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price Pool</th>
            <th>Participants</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="challage in challages" :key="challage.id">
            <td>{{ challage.id }}</td>
            <td>
              <img
                :src="challage.image"
                alt="Challage Image"
                style="max-height: 100px"
              />
            </td>
            <td>{{ challage.title }}</td>
            <td>{{ challage.discription }}</td>
            <td>{{ challage.pricepool }}</td>
            <td>{{ challage.participants }}</td>
            <td>
              {{
                new Date(challage.time).toLocaleString("en-IN", {
                  timeZone: "Asia/Colombo",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              }}
            </td>
            <td>
              <button
                class="btn btn-sm btn-primary"
                @click="editChallage(challage)"
              >
                Edit
              </button>
              <button
                class="btn btn-sm btn-danger"
                @click="deleteChallage(challage.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
  <script>
import axios from "../../axios.js";

export default {
  data() {
    return {
      form: {
        id: null,
        imagefile: null,
        image: "",
        title: "",
        discription: "",
        pricepool: null,
        participants: null,
        time: null,
      },
      challages: [],
      editing: false,
    };
  },
  async created() {
    await this.getChallages();
  },
  methods: {
    setImage(event) {
      this.form.imagefile = event.target.files[0];
    },
    async getChallages() {
      try {
        const response = await axios.get("/challenges");
        this.challages = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async createChallage(challage) {
      try {
        await axios.post("/challenges", challage, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.form.id = null;
        this.form.image = null;
        (this.form.imagefile = null), (this.form.title = "");
        this.form.discription = "";
        this.form.pricepool = null;
        this.form.participants = null;
        this.form.time = null;
        await this.getChallages();
      } catch (error) {
        console.error(error);
      }
    },
    async updateChallage(challage) {
      try {
        await axios.put(`/challenges/${challage.id}`, challage, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.form.id = null;
        this.form.image = null;
        (this.form.imagefile = null), (this.form.title = "");
        this.form.discription = "";
        this.form.pricepool = null;
        this.form.participants = null;
        this.form.time = null;
        this.editing = false;
        await this.getChallages();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteChallage(id) {
      try {
        await axios.delete(`/challenges/${id}`);
        await this.getChallages();
      } catch (error) {
        console.error(error);
      }
    },
    editChallage(challage) {
      this.form.id = challage.id;
      this.form.image = challage.image;
      this.form.title = challage.title;
      this.form.discription = challage.discription;
      this.form.pricepool = challage.pricepool;
      this.form.participants = challage.participants;
      this.form.time = new Date(challage.time);
      this.editing = true;
    },
    async handleSubmit() {
      if (this.editing) {
        await this.updateChallage(this.form);
      } else {
        await this.createChallage(this.form);
      }
    },
  },
};
</script>
 <style lang="scss" scoped>
.form-group.required label::after {
  content: "*";
  color: red;
}

.form-control form-control-sm:focus {
  border-color: #3b82f6;
  box-shadow: none;
}

.btn-primary {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

.btn-primary:hover {
  background-color: #2563eb;
  border-color: #2563eb;
}

.btn-danger {
  background-color: #ef4444;
  border-color: #ef4444;
}

.btn-danger:hover {
  background-color: #dc2626;
  border-color: #dc2626;
}

.table th,
.table td {
  vertical-align: middle;
}

.table th:first-child,
.table td:first-child {
  padding-left: 0;
}

.table th:last-child,
.table td:last-child {
  padding-right: 0;
}

.table .btn {
  margin-right: 0.5rem;
}

@media screen and (max-width: 576px) {
  .table td:nth-child(3),
  .table th:nth-child(3) {
    display: none;
  }
}
</style>