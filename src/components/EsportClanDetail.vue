<template>
  <div class="esports-clan-detail">
    <div class="banner-section">
      <img :src="clanLogo" alt="Clan Logo" class="clan-logo" />
      <h1 class="clan-name">{{ clanName }}</h1>
      <p class="clan-description">{{ clanDescription }}</p>
    </div>

    <div class="member-section">
      <h2 class="section-title">Members</h2>
      <div class="member-list">
        <div class="member-card" v-for="member in members" :key="member.id">
          <img :src="member.avatar" alt="Member Avatar" class="member-avatar" />
          <h3 class="member-name">{{ member.name }}</h3>
          <p class="member-role">{{ member.role }}</p>
        </div>
      </div>
    </div>

    <div class="game-section">
      <h2 class="section-title">Games</h2>
      <div class="game-list">
        <div class="game-card" v-for="game in games" :key="game.id">
          <img :src="game.cover" alt="Game Cover" class="game-cover" />
          <h3 class="game-title">{{ game.title }}</h3>
          <p class="game-description">{{ game.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "EsportsClanDetail",
  props: {
    clanName: {
      type: String,
      required: true,
    },
    clanDescription: {
      type: String,
      required: true,
    },
    clanLogo: {
      type: String,
      required: true,
    },
    members: {
      type: Array,
      required: true,
    },
    games: {
      type: Array,
      required: true,
    },
  },
};
</script>