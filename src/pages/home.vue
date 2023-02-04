<template>
  <v-app>
    <vue-particles
      color="#05a0bf"
      :particleOpacity="1"
      :particlesNumber="25"
      shapeType="triangle"
      :particleSize="5"
      linesColor="#00fded"
      :linesWidth="2"
      :lineLinked="true"
      :lineOpacity="0.5"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="false"
      clickMode="push"
    >
    </vue-particles>
    <v-container class="container">
      <v-hover v-slot="{ hover }" open-delay="200">
        <v-card
          class="grid"
          shaped
          :class="{ 'on-hover': hover }"
          :elevation="hover ? 12 : 16"
          ><v-card-text class="text"
            >Welcome {{ name }} , please click on any of the box below for
            futher explanation.</v-card-text
          >
          <v-row no-gutters class="justify-center align-center">
            <v-col cols="5"
              ><v-card
                class="grid1"
                :class="{ 'on-hover': hover }"
                :elevation="hover ? 12 : 16"
                @click="sales"
                ><v-card-title class="text1">Sales Today</v-card-title>
                <v-card-title class="header">RM 250.00</v-card-title></v-card
              ></v-col
            >
            <v-col cols="5"
              ><v-card
                class="grid1"
                :class="{ 'on-hover': hover }"
                :elevation="hover ? 12 : 16"
                @click="inventory"
                ><v-card-title class="text1">Total Items</v-card-title>
                <v-card-title class="header">{{
                  productLength
                }}</v-card-title></v-card
              ></v-col
            >
          </v-row>
          <v-row no-gutters class="justify-center align-center">
            <v-col cols="5"
              ><v-card
                class="grid1"
                :class="{ 'on-hover': hover }"
                :elevation="hover ? 12 : 16"
                @click="tables"
                ><v-card-title class="text1">Tables Occupied</v-card-title>
                <v-card-title class="header"
                  >{{ tablesLength.active }} out of {{ tablesLength.tables }}</v-card-title
                ></v-card
              ></v-col
            >
            <v-col cols="5"
              ><v-card
                class="grid1"
                :class="{ 'on-hover': hover }"
                :elevation="hover ? 12 : 16"
                @click="staff"
                ><v-card-title class="text1">Total Workers</v-card-title>
                <v-card-title class="header">5</v-card-title></v-card
              ></v-col
            >
          </v-row>
        </v-card>
      </v-hover>
    </v-container>
  </v-app>
</template>

<script>
import DataService from "../services/dataService.js";
const dataService = new DataService();
export default {
  data() {
    return {
      name: this.$store.state.userProfile.name,
      productLength: [],
      tablesLength: [],
    };
  },
  mounted: function () {
    this.getProductsLength();
    this.getTablesLength();
  },

  methods: {
    async getProductsLength() {
      this.$setLoader();
      await dataService.getProducts().then((res) => {
        this.productLength = res.data.products.length;
      });

      this.$disableLoader();
    },

    inventory() {
      this.$setLoader();
      this.$router.push({ path: `/inventory` });
      this.$disableLoader();
    },

    async getTablesLength() {
      this.$setLoader();
      await dataService.getTableslength().then((res) => {
        this.tablesLength = res.data.tablesLength;
      });

      this.$disableLoader();
    },

    tables() {
      this.$router.push({ path: `/tables` });
    },

    sales() {
      this.$router.push({ path: `/sales` });
    },

    staff() {
      this.$router.push({ path: `/staff` });
    },
  },
};
</script>

<style scoped lang="css">
.container {
  margin-top: 1%;
  max-width: none !important;
}

#particles-js {
  background-color: #001736;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
}
.grid {
  margin-top: 0 !important;
  margin-right: auto !important;
  margin-left: auto !important;
  width: auto;
  height: auto;
  place-items: center;
  color: #ffffff;
  background-color: transparent;
  padding-bottom: 3%;
}
.grid1 {
  margin-top: 3% !important;
  margin-bottom: 3%;
  margin-right: 3% !important;
  margin-left: auto !important;
  width: auto;
  height: 200px;
  place-items: center;
  color: #ffffff;
  background-color: #ffffff;
}
.text {
  margin-right: auto !important;
  margin-left: auto !important;
  font-size: 20px;
  justify-content: center;
  color: #ffffff !important;
}
.text1 {
  margin-right: auto !important;
  margin-left: auto !important;
  font-size: 20px;
  justify-content: center;
  align-items: center;
  color: #001736 !important;
  font-weight: bold;
}
.header {
  margin-right: auto !important;
  margin-left: auto !important;
  font-size: 20px;
  justify-content: center;
  align-items: center;
  color: #05a0bf !important;
}
.v-application .elevation-16 {
  box-shadow: 0px 8px 10px -5px #05a0bf,
    0px 16px 24px 2px rgba(255, 255, 255, 0.14),
    0px 6px 30px 5px rgba(0, 0, 0, 0.12) !important;
}

.v-application .elevation-12 {
  box-shadow: 0px 3px 5px -1px #001736, 0px 5px 8px 0px rgba(0, 0, 0, 0.14),
    0px 1px 14px 0px rgba(0, 0, 0, 0.12) !important;
}
.v-application .elevation-6 {
  box-shadow: 0px 3px 5px -1px #05a0bf, 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0, 0, 0, 0.12) !important;
}
</style>
