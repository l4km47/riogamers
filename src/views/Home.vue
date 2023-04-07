<template>
  <div class="loading-overlay" v-if="isloading">
    <div class="loading-spinner"></div>
  </div>
  <div class="">
    <carousel
      :autoplay="3000"
      :settings="settings1"
      :breakpoints="breakpoints1"
      :wrap-around="true"
    >
      <Slide v-for="slide in slides" :key="slide">
        <div class="carousel__item">
          <img :src="domain + slide.image" alt="" />
          <div class="carousel__item_text" v-if="slide.showDescription">
            <h4 class="slidetitle">{{ slide.title }}</h4>
            <p class="slidetext slid-description">{{ slide.description }}</p>
            <div class="btn btn-sm btn-primary" @click="routetopage(slide)">
              View more
            </div>
          </div>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </carousel>

    <div v-if="show" class="sub-header-main">
      <SubHeader title="TOP GAMES" linkto="/"></SubHeader>
      <div class="sub-container">
        <Carousel :settings="settings" :breakpoints="breakpoints">
          <Slide v-for="slide in gamesslides" :key="slide">
            <div class="carousel__games">
              <div class="game-card">
                <img :src="domain + slide.gamebanner" alt="" />
                <p class="carousel__games_image-text">{{ slide.gametitle }}</p>
              </div>
            </div>
          </Slide>

          <template #addons>
            <Navigation v-if="windowWidth < 1000" />
          </template>
        </Carousel>
      </div>
    </div>

    <div class="sub-header-main container-fluid">
      <SubHeader title="TOP GAMES" linkto="/"></SubHeader>
      <div class="sub-container sub-space game-card-container">
        <NoDataComponent
          v-if="challages.length == 0"
          datatype="challanges"
        ></NoDataComponent>
        <ChallangeCard
          class=""
          v-else
          v-for="c in challages"
          :key="c.id"
          :challengeImage="domain + c.image"
          :challengeTitle="c.title"
          :challengeDescription="c.discription"
          :challengePrize="c.pricepool"
          :challengeParticipants="c.participants"
          :challengeTime="
            new Date(c.time).toLocaleString('en-IN', {
              timeZone: 'Asia/Colombo',
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })
          "
        />
      </div>
    </div>

    <div class="sub-header-main container-fluid">
      <SubHeader title="UPCOMING EVENTS" linkto="/"></SubHeader>
      <div class="sub-container sub-space">
        <NoDataComponent
          v-if="events.length == 0"
          datatype="events"
        ></NoDataComponent>
        <UpcomingEventsCard
          v-else
          class="col-lg-3 col-sm-6 col-xs-12"
          v-for="e in events"
          :key="e.id"
          :eventImage="domain + e.image"
          :eventName="e.eventName"
          :eventDescription="e.eventDescription"
          :eventDate="e.eventDate"
          :eventTime="e.eventTime"
          :eventLocation="e.eventLocation"
          :eventGame="e.eventGame"
          :eventLink="e.eventLink"
        />
      </div>
    </div>

    <div v-if="show" class="sub-header-main container-fluid">
      <SubHeader title="UPCOMING TOURNAMENTS" linkto="/"></SubHeader>
      <div class="sub-container">
        <NoDataComponent
          v-if="tournamants.length == 0"
          datatype="events"
        ></NoDataComponent>
        <tournament-card
          v-else
          class="row col-lg-4 col-md-4 col-sm-12"
          v-for="t in tournamants"
          :key="t.id"
          :tournament-name="t.tournamentName"
          :start-time="new Date(t.startTime)"
          :end-time="new Date(t.endTime)"
          :prize-pool="t.prizePool"
          :tournament-logo="t.tournamentLogo"
        />
      </div>
    </div>
    <div v-if="show" class="sub-header-main">
      <SubHeader title="ORGANISATIONS / CLANS" linkto="/"></SubHeader>
      <div class="sub-container">
        <div class="card" v-for="c in 4" :key="c">
          {{ c }}
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import SlidableImageList from "../components/slidablelist.vue";
import TournamentCard from "../components/TournamentCard.vue";
import ChallangeCard from "../components/ChallangeCard.vue";
import UpcomingEventsCard from "../components/UpcomingEventsCard.vue";
import NoDataComponent from "../components/NoData.vue";

import SubHeader from "../components/SubHeader.vue";
import axios from "../axios.js";

export default {
  name: "Home",

  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    TournamentCard,
    SlidableImageList,
    UpcomingEventsCard,
    NoDataComponent,
    ChallangeCard,
    SubHeader,
  },
  data() {
    return {
      domain: "https://riogamers.lk",
      isloading: true,
      slides: [],
      challages: [],
      events: [],
      tournamants: [],
      clans: [],
      gamesslides: [],
      windowWidth: window.innerWidth,
      listHeader: "Top Games",
      // carousel settings
      settings1: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      breakpoints1: {
        // 700px and up
        700: {
          itemsToShow: 1,
          snapAlign: "center",
        },
        // 1024 and up
        1024: {
          itemsToShow: 1,
          snapAlign: "center",
        },
      },
      settings: {
        itemsToShow: 5,
        snapAlign: "start",
      },
      // breakpoints are mobile first
      // any settings not specified will fallback to the carousel settings
      breakpoints: {
        // 700px and up
        700: {
          itemsToShow: 5,
          snapAlign: "start",
        },
        // 1024 and up
        1024: {
          itemsToShow: 10,
          snapAlign: "start",
        },
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },

  async created() {
    await this.GetData();
    this.isloading = false;
  },
  methods: {
    async GetData() {
      try {
        const response = await axios.get("/challenges");
        this.challages = response.data;
        const ev = await axios.get("/events");
        this.events = ev.data;

        const _slides = await axios.get("/slide");
        this.slides = _slides.data;
      } catch (error) {
        console.error(error);
      }
    },
    routetopage(slide) {
      this.$router.push(slide.to);
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    handleImageClicked(index) {
      console.log(`Image at index ${index} was clicked.`);
    },
  },
};
</script>
<style lang="scss">
</style>