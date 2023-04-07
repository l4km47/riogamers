<template>
  <div
    class="modal fade"
    id="discordmodel"
    tabindex="-1"
    aria-labelledby="discordmodelLabel"
    aria-hidden="false"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="col discord-header">
            <img class="discord-logo" :src="serverimageurl" />
          </div>
          <div class="discord-count m-3">
            <h4>{{ serverinfo.name }}</h4>
            <div class="discord-count-details">
              <div class="m-3">
                <i class="fa fa-circle green-circle" aria-hidden="true"></i>
                Online {{ membercounts.online }}
              </div>
              <div class="m-3">
                <i class="fa fa-circle" aria-hidden="true"></i>
                Members {{ membercounts.members }}
              </div>
            </div>
            <a class="btn btn-purple invite" :href="invitelink" target="_blank"
              >Join our discord</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
export default {
  data() {
    return {
      invitelink: "https://discord.gg/BJDuAutU4t",
      serverimageurl:
        "https://cdn.discordapp.com/icons/772439371017224193/9b8c09ae4333919546e66b772c35d92e.webp?size=64",
      serverinfo: { name: "" },
      membercounts: { online: 0, members: 0 },
    };
  },
  beforeMount() {
    this.getDiscordInfo();
  },
  methods: {
    getDiscordInfo() {
      axios
        .get(
          "https://discord.com/api/v9/invites/BJDuAutU4t?with_counts=true&with_expiration=true"
        )
        .then((res) => {
          console.log(res.data);
          this.serverinfo = res.data.guild;
          this.membercounts.members = res.data.approximate_member_count;
          this.membercounts.online = res.data.approximate_presence_count;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
div {
}
.invite:hover {
  color: #fff;
  text-shadow: none;
}
.modal-content {
  .modal-body {
    padding: 30px;
  }
}
.btn-purple {
  background-color: rgb(88, 101, 242);
  color: #fff;
}
.green-circle {
  color: green;
}
.discord-count {
  display: flex;
  justify-content: center;
  font-size: small;
  align-items: center;
  flex-direction: column;
  .discord-count-details {
    font-family: "gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial,
      sans-serif;
    display: flex;
    justify-content: center;
    font-size: small;
    align-items: center;
    flex-direction: row;
  }
}
.discord-header {
  display: flex;
  align-content: center;
  flex-direction: column;
  align-items: center;

  .discord-logo {
    width: 64px;
  }
}
</style>
  