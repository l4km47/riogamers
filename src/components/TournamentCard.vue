<template>
  <div class="card">
    <div class="card-header">
      <img
        class="tournament-logo"
        :src="tournamentLogo"
        alt="Tournament logo"
      />
      <h2 class="tournament-name">{{ tournamentName }}</h2>
    </div>
    <div class="card-body">
      <i class="far fa-clock"></i>
      <p class="tournament-time">{{ startTime }} - {{ endTime }}</p>
      <i class="fas fa-trophy"></i>
      <p class="tournament-prize">PricePool {{ prizePool }}</p>
      <div>
        <p v-if="timeRemaining > 0" class="tournament-remaining">
          <i class="far fa-hourglass"></i>
          Time Remaining: {{ timeRemaining }}
        </p>
        <p v-else class="tournament-ended">Tournament has ended.</p>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { computed, ref } from "vue";

export default {
  props: {
    tournamentName: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    prizePool: {
      type: String,
      required: true,
    },
    tournamentLogo: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const currentTime = ref(new Date());

    const timeRemaining = computed(() => {
      const timeDiff = props.endTime - currentTime.value;
      if (timeDiff > 0) {
        const seconds = Math.floor((timeDiff / 1000) % 60);
        const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        return `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
      } else {
        return 0;
      }
    });

    setInterval(() => {
      currentTime.value = new Date();
    }, 1000);

    return {
      timeRemaining,
    };
  },
};
</script>
  
  <style lang="scss">
.card {
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
  .card-header {
    .tournament-logo {
      height: 50px;
      width: 50px;
      margin-right: 1rem;
      border-radius: 50%;
    }

    .tournament-name {
      font-size: 1.25rem;
      margin: 0;
    }
  }
  .card-body {
    .tournament-time,
    .tournament-prize,
    .tournament-remaining,
    .tournament-ended {
      display: flex;
      align-items: center;
      font-size: 0.875rem;

      & > * + * {
        margin-left: 0.5rem;
      }
    }

    .tournament-remaining {
      color: #198754;
    }

    .tournament-ended {
      color: #dc3545;
    }
  }
}
</style>
