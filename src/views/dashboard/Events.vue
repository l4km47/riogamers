<template>
  <div class="container mt-3">
    <h1>Events</h1>
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-sm-3 m-3">
          <div>
            <label for="image">Select Image:</label>
            <input type="file" id="image" ref="imageInput" @change="setImage" />
          </div>
          <div class="mb-3">
            <label class="form-label">Image URL</label>
            <input
              type="text"
              class="form-control form-control-sm"
              v-model="formData.image"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="eventName" class="form-label">Event Name</label>
            <input
              type="text"
              class="form-control"
              id="eventName"
              v-model="formData.eventName"
            />
          </div>
          <div class="mb-3">
            <label for="eventDescription" class="form-label"
              >Event Description</label
            >
            <textarea
              class="form-control"
              id="eventDescription"
              v-model="formData.eventDescription"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="eventDate" class="form-label">Event Date</label>
            <input
              type="date"
              class="form-control"
              id="eventDate"
              v-model="formData.eventDate"
            />
          </div>
        </div>
        <div class="col-sm-3 m-3">
          <div class="mb-3">
            <label for="eventTime" class="form-label">Event Time</label>
            <input
              type="time"
              class="form-control"
              id="eventTime"
              v-model="formData.eventTime"
            />
          </div>
          <div class="mb-3">
            <label for="eventLocation" class="form-label">Event Location</label>
            <input
              type="text"
              class="form-control"
              id="eventLocation"
              v-model="formData.eventLocation"
            />
          </div>
          <div class="mb-3">
            <label for="eventGame" class="form-label">Event Game</label>
            <input
              type="text"
              class="form-control"
              id="eventGame"
              v-model="formData.eventGame"
            />
          </div>
          <div class="mb-3">
            <label for="eventLink" class="form-label">Event Link</label>
            <input
              type="text"
              class="form-control"
              id="eventLink"
              v-model="formData.eventLink"
            />
          </div>
        </div>
      </div>
      <div class="mb-3">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Date</th>
          <th>Time</th>
          <th>Location</th>
          <th>Game</th>
          <th>Link</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.id">
          <td>{{ event.id }}</td>
          <td><img :src="event.image" width="50" height="50" /></td>
          <td>{{ event.eventName }}</td>
          <td>{{ event.eventDescription }}</td>
          <td>{{ event.eventDate }}</td>
          <td>{{ event.eventTime }}</td>
          <td>{{ event.eventLocation }}</td>
          <td>{{ event.eventGame }}</td>
          <td>
            <a :href="event.eventLink">{{ event.eventLink }}</a>
          </td>
          <button class="btn btn-sm btn-primary" @click="editEvent(event)">
            Edit
          </button>
          <button class="btn btn-sm btn-danger" @click="deleteEvent(event.id)">
            Delete
          </button>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "../../axios";

export default {
  name: "Events",
  data() {
    return {
      formData: {
        id: null,
        image: "",
        imagefile: null,
        eventName: "",
        eventDescription: "",
        eventDate: "",
        eventTime: "",
        eventLocation: "",
        eventGame: "",
        eventLink: "",
      },
      events: [],

      editing: false,
    };
  },
  methods: {
    setImage(event) {
      this.formData.imagefile = event.target.files[0];
    },
    async getEvents() {
      try {
        const response = await axios.get("/events");
        this.events = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async createEvent(event) {
      try {
        await axios.post("/events", event, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.formData.image = "";
        this.formData.eventName = "";
        this.formData.eventDescription = "";
        this.formData.imagefile = null;
        this.formData.eventDate = null;
        this.formData.eventTime = null;
        this.formData.eventLocation = "";
        this.formData.eventGame = "";
        this.formData.eventLink = "";
        await this.getEvents();
      } catch (error) {
        console.error(error);
      }
    },
    async updateEvent(event) {
      try {
        await axios.put(`/events/${event.id}`, event, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.formData.image = "";
        this.formData.eventName = "";
        this.formData.eventDescription = "";
        this.formData.imagefile = null;
        this.formData.eventDate = null;
        this.formData.eventTime = null;
        this.formData.eventLocation = "";
        this.formData.eventGame = "";
        this.formData.eventLink = "";
        this.editing = false;
        await this.getEvents();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteEvent(id) {
      try {
        await axios.delete(`/events/${id}`);
        await this.getEvents();
      } catch (error) {
        console.error(error);
      }
    },
    editEvent(event) {
      this.formData.id = event.id;
      this.formData.image = event.image;
      this.formData.eventName = event.eventName;
      this.formData.eventDescription = event.eventDescription;
      this.formData.eventDate = event.eventDate;
      this.formData.eventTime = event.eventTime;
      this.formData.eventLocation = event.eventLocation;
      this.formData.eventGame = event.eventGame;
      this.formData.eventLink = event.eventLink;
      this.editing = true;
    },
    async handleSubmit() {
      if (this.editing) {
        await this.updateEvent(this.formData);
      } else {
        await this.createEvent(this.formData);
      }
    },
  },

  mounted() {
    this.getEvents();
  },
};
</script>

<style>
/* Optional custom styles */
</style>