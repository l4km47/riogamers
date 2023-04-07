<template>
  <div class="card neon-card event-card">
    <img class="event-image" :src="eventImage" alt="Event Image" />
    <div class="card-body">
      <h5 class="card-">{{ eventName }}</h5>
      <div class="items-list">
        <detail-item
          name="Date"
          :description="formatDate(eventDate)"
        ></detail-item>
        <detail-item
          name="Time"
          :description="formatTime(eventTime)"
        ></detail-item>
        <detail-item name="Location" :description="eventLocation"></detail-item>
        <detail-item name="Game" :description="eventGame"></detail-item>
      </div>
    </div>
    <div class="card-footer">
      <a :href="eventLink" target="_blank" class="btn btn-sm btn-danger"
        >Join Now</a
      >
    </div>
  </div>
</template>

<script>
import DetailItem from "./DetailItem.vue";

export default {
  name: "EsportsEventCard",
  components: {
    DetailItem,
  },
  props: {
    eventName: String,
    eventDescription: String,
    eventImage: String,
    eventDate: String,
    eventTime: String,
    eventLocation: String,
    eventGame: String,
    eventLink: String,
  },
  methods: {
    formatDate(date) {
      const dateObject = new Date(date);
      let d = dateObject.toLocaleString("en-IN", {
        timeZone: "Asia/Colombo",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      return d;
    },
    formatTime(time) {
      return new Date(`1970-01-01T${time}Z`).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.items-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.list-group-item {
  background-color: transparent;
}
.event-card {
  margin: 3px;
  .event-image {
    border-radius: 6px 6px 0 0;
    box-shadow: 0px 5px 11px 0px #0000008a;
    width: 100%;
    height: 200px;
    object-fit: fill;
  }
  .card-footer {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
}
</style>
