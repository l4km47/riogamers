<template>
  <div class="card neon-card event-card mb-3">
    <img class="event-image" :src="eventImage" alt="Event Image" />
    <div class="card-body">
      <div class="">
        <h5 class="card-">{{ eventName }}</h5>
      </div>
      <p class="card-text">{{ eventDescription }}</p>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><strong>Date:</strong> {{ eventDate }}</li>
        <li class="list-group-item"><strong>Time:</strong> {{ eventTime }}</li>
        <li class="list-group-item">
          <strong>Location:</strong> {{ eventLocation }}
        </li>
        <li class="list-group-item"><strong>Game:</strong> {{ eventGame }}</li>
      </ul>
    </div>
    <div class="card-footer">
      <a href="{{ eventLink }}" class="btn btn-sm btn-danger">Register Now</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "EsportsEventCard",
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
};
</script>

<style lang="scss" scoped>
.list-group-item {
  background-color: transparent;
}
.event-card {
  max-width: fit-content;
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
