<template>
  <img class="card-image" :src="challengeImage" alt="Event Image" />
  <!-- </div>
  <div class="" v-if="show">
    <div class="card-body">
      <div class="body-1">
        <div class="card-title">{{ challengeTitle }}</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            {{ challengeDescription }}
          </li>
          <li class="list-group-item">
            <strong>Price pool:</strong> {{ challengePrize }}
          </li>
          <li class="list-group-item">
            <strong> Participants:</strong> {{ challengeParticipants }}
          </li>
          <li class="list-group-item">
            <strong>Time:</strong> {{ challengeTime }}
          </li>
        </ul>
      </div>
      <div class="card-footer card-action">
        <button class="btn btn-sm btn-danger">More details</button>
      </div>
    </div>
  -->
</template>
  
  <script>
export default {
  name: "EsportsChallengecard",
  props: {
    challengeImage: {
      type: String,
      required: true,
    },
    challengeTitle: {
      type: String,
      required: true,
    },
    challengeDescription: {
      type: String,
      required: true,
    },
    challengePrize: {
      type: String,
      required: true,
    },
    challengeParticipants: {
      type: String,
      required: true,
    },
    challengeTime: {
      type: String,
      required: true,
    },
  },

  methods: {
    getstyle() {
      return `
      background-size: cover;
      background-image: url(${this.challengeImage});`;
    },
  },
};
</script>
  
<style scoped lang="scss" >
.card-body {
  display: flex;
  padding: 3px;
  margin: 3px;
  border-radius: 0px 6px 6px 0px;
  background-color: rgba(62, 62, 62, 0.253);
  height: 350px;
  justify-content: space-between;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  .card-action {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
  .body-1 {
    .card-title {
      padding: 5px 10px;
      margin-bottom: 0px;
      font-weight: bold;
    }
    .card-description {
      padding: 5px;
      font-size: medium;
    }
  }
}
.ccard {
  display: flex;
}
.cardx {
  display: flex;
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.card-image {
  height: 200px;
  object-fit: cover; /* maintain aspect ratio and crop to fill */
  border-radius: 6px;
  padding: 3px;
}

@media only screen and (max-width: 768px) {
  .card-image {
    height: 100%;
    max-width: 50%;
  }
}

.card-details {
  flex-basis: 60%;
}

.card-details h2 {
  font-size: 1.5rem;
  margin-top: 0;
}

.card-details p {
  margin-bottom: 0.5rem;
}
</style>