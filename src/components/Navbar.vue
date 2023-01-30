<template>
  <v-app-bar color="#001736" flat class="tbar1">
    <img
      src="./../assets/images/logo.png"
      class="logo"
      v-show="$vuetify.breakpoint.smAndUp"
      @click="$router.push({ name: 'home' })"
    />

    <v-spacer></v-spacer>

    <v-toolbar-title class="username">
      {{ name }}
    </v-toolbar-title>

    <v-btn icon @click="account()">
      <v-icon class="icn1">mdi-account-circle-outline</v-icon></v-btn
    >

    <v-btn icon @click="logout()">
      <v-icon color="#0075a7">mdi-logout-variant</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  props: {
    renderSideBarToggle: Boolean,
    renderSearchBar: Boolean,
  },
  data() {
    return {
      name : this.$store.state.userProfile.name
    };
  },

  computed: {
    nameToInitials() {
      try {
        let name = this.$store.state.userProfile.name;
        return name
          .split(" ")
          .map((x) => x.charAt(0))
          .join("")
          .substr(0, 2)
          .toUpperCase();
      } catch (error) {
        return "IZ";
      }
    },
  },

  methods: {
    // checkPermission(permissionToCheck) {
    //   let user = this.$store.state.buyerUser;

    //   return user &&
    //     user.permissions &&
    //     user.permissions.includes(permissionToCheck)
    //     ? true
    //     : false;
    // },

    account() {
      this.$router.push({ path: `/home` });
    },
    logout() {
      window.getApp.$emit("APP_LOGOUT");
    },
  },
};
</script>

<style scoped lang="css">
.tbar1 {
  box-shadow: 0px 2px 4px -1px rgba(255, 255, 255, 0),
    0px 4px 5px 0px rgba(255, 255, 255, 0),
    0px 1px 10px 0px rgba(255, 255, 255, 0.12) !important;
}

.username {
  font-size: 14px;
  color: #05a0bf;
}

.dashboard {
  font-size: 14px;
  color: #05a0bf;
  display: flex;
}

.icn1 {
  color: #05a0bf !important;
}

.dashboardlogo {
  font-size: 14px;
  color: #05a0bf;
  display: flex;
  left: 20px;
  margin-left: 30px;
}
</style>
