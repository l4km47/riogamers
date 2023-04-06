<template>
  <div class="container mt-4">
    <div class="col">
      <h1>Create or Update Slids</h1>
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
                v-model="form.description"
                required
              ></textarea>
            </div>
          </div>
          <div class="col-md-3 m-3">
            <div class="mb-3">
              <label class="form-label">Url</label>
              <textarea
                class="form-control form-control-sm"
                v-model="form.url"
                required
              ></textarea>
            </div>
            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="show-description"
                v-model="form.showDescription"
                @click="log()"
              />
              <label class="form-check-label" for="show-description"
                >Show Description</label
              >
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <hr />
    <div class="col">
      <h1>slide List</h1>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Url</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="slid in slids" :key="slid.id">
            <td>{{ slid.id }}</td>
            <td>
              <img
                :src="slid.image"
                alt="slide Image"
                style="max-height: 100px"
              />
            </td>
            <td>{{ slid.title }}</td>
            <td>{{ slid.discription }}</td>
            <td>{{ slid.url }}</td>
            <td>{{ slid.showDescription }}</td>

            <td>
              <button class="btn btn-sm btn-primary" @click="editslide(slid)">
                Edit
              </button>
              <button
                class="btn btn-sm btn-danger"
                @click="deleteslide(slid.id)"
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
        description: "",
        url: "",
        showDescription: false,
      },
      slids: [],
      editing: false,
    };
  },
  async created() {
    await this.getSlids();
  },
  methods: {
    log() {
      console.log(this.form);
    },
    setImage(event) {
      this.form.imagefile = event.target.files[0];
    },
    async getSlids() {
      try {
        const response = await axios.get("/slide");
        this.slids = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async createSlids(slid) {
      try {
        console.log(slid);
        await axios.post("/slide", slid, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.form.id = null;
        this.form.image = null;
        (this.form.imagefile = null), (this.form.title = "");
        this.form.description = "";
        this.form.url = null;
        this.form.showDescription = false;
        await this.getSlids();
      } catch (error) {
        console.error(error);
      }
    },
    async updateSlids(slide) {
      try {
        console.log(slide);
        await axios.put(`/slide/${slide.id}`, slide, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.form.id = null;
        this.form.image = null;
        (this.form.imagefile = null), (this.form.title = "");
        this.form.description = "";
        this.form.url = null;
        this.editing = false;
        this.form.showDescription = false;
        await this.getSlids();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteslide(id) {
      try {
        await axios.delete(`/slide/${id}`);
        await this.getSlids();
      } catch (error) {
        console.error(error);
      }
    },
    editslide(slide) {
      console.log(slide);
      this.form.id = slide.id;
      this.form.image = slide.image;
      this.form.title = slide.title;
      this.form.description = slide.description;
      this.form.url = slide.url;
      this.form.showDescription = slide.showDescription === 1;
      console.log(this.form);
      this.editing = true;
    },
    async handleSubmit() {
      if (this.editing) {
        await this.updateSlids(this.form);
      } else {
        await this.createSlids(this.form);
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