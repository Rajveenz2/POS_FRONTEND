<template>
  <v-app>
    <v-container class="container">
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
        :moveSpeed="1"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="false"
        clickMode="push"
      >
      </vue-particles>
      <v-card
        class="grid"
        width="80%"
        shaped
        color="transparent"
        v-if="table.tableStatus == 'Active'"
        ><v-card class="grid4"
          ><v-card-text class="producttitle1">
            Current Order for Table :
            <v-card-text class="producttitle2">{{
              table.tableNumber
            }}</v-card-text>
          </v-card-text></v-card
        ><v-card class="grid4"
          ><v-card-text class="producttitle"
            >Order Status : {{ order.orderStatus }}</v-card-text
          ><v-card-text class="producttitle"
            >Order ID : {{ order._id }}</v-card-text
          ></v-card
        ><v-card class="grid4" v-for="o in order.order" :key="o._id"
          ><v-card-text class="producttitle2">Name : {{ o.name }}</v-card-text
          ><v-card-text class="producttitle2"
            >Quantity : {{ o.quantity }}</v-card-text
          ><v-card-text class="producttitle2"
            >Total Amount : RM {{ o.total }}</v-card-text
          ></v-card
        ><v-card class="grid4"
          ><v-card-text class="producttitle1"
            >Order Total : RM {{ order.total }}</v-card-text
          ></v-card
        ></v-card
      >
      <v-card class="grid" width="80%" shaped color="transparent" v-else
        ><v-card class="grid4" height="300px" shaped>
          <v-card-title class="producttitle">
            No order found. Please find an active table to view orders
          </v-card-title></v-card
        ></v-card
      ></v-container
    ></v-app
  >
</template>

<script>
import DataService from "../services/dataService.js";
const dataService = new DataService();

export default {
  data() {
    return {
      order: [],
      table: [],
    };
  },
  computed: {},

  mounted() {
    this.getTableStatus();
  },

  methods: {
    async getTableStatus() {
      this.$setLoader();
      await dataService
        .getTable({ _id: this.$route.params.cardId })
        .then((res) => {
          this.table = res.data.table[0];
          if (this.table.tableStatus == "Active") {
            this.findOrder();
          }
        });

      this.$disableLoader();
    },

    async findOrder() {
      this.$setLoader();
      await dataService
        .getOrder({ _id: this.$route.params.cardId })
        .then((res) => {
          if (res.data.order[0]) {
            this.order = res.data.order[0];
          } else {
            alert("No order found");
          }
        });
      this.$disableLoader();
    },
  },
};
</script>

<style scoped lang="css">
.container {
  margin-top: 1%;
  max-width: none !important;
}

.button {
  margin-top: 2%;
}
.logo {
  height: 75px;
  width: 300px;
  margin-bottom: 15px;
  background-color: #fffafa00;
  box-shadow: none;
}

.grid {
  margin-bottom: 2% !important;
  /* margin-bottom: 1% !important; */
  margin-right: auto !important;
  margin-left: auto !important;
  place-items: center;
  background-color: transparent;
  /* display: grid !important; */
  /* background-image: linear-gradient(to right, #FFCF9F, #FF889C); */
}
.grid2 {
  margin-top: auto !important;
  margin-bottom: auto !important;
  margin-right: auto !important;
  margin-left: auto !important;
  place-items: center;
  /* background-image: linear-gradient(to right, #FFCF9F, #FF889C); */
}

.grid3 {
  margin-top: 1% !important;
  margin-bottom: 1% !important;
  margin-right: auto !important;
  margin-left: auto !important;
  place-items: center;
}

.grid4 {
  margin-top: 1% !important;
  margin-bottom: 1% !important;
  margin-right: auto !important;
  margin-left: auto !important;
  place-items: center;
  display: grid;
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

.cardtitle {
  font-size: 15px;
  font-weight: bolder;
  color: #000000 !important;
  text-decoration: none;
  text-align: center;
}

.carddesc {
  font-size: 14px;
  text-decoration: none;
  text-align: center;
  color: #05a0bf !important;
}

.carddesc2 {
  font-size: 14px;
  text-decoration: none;
  text-align: center;
  color: #dc1b1b !important;
}

.producttitle {
  font-size: 18px;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
  color: #e10b0b !important;
  justify-content: center;
  align-items: center;
}
.producttitle1 {
  font-size: 18px;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
  color: #001736 !important;
  justify-content: center;
  align-items: center;
}

.producttitle2 {
  font-size: 15px;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
  color: #4b0be1 !important;
  justify-content: center;
  align-items: center;
}

.stepper-header {
  background-color: #001736;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0),
    0px 2px 2px 0px rgba(0, 0, 0, 0), 0px 1px 5px 0px rgba(0, 0, 0, 0);
}

.colclass {
  flex: 0 0 50%;
  max-width: inherit !important;
  padding-top: 8px !important;
  padding-right: 8px !important;
  padding-bottom: 8px !important;
  padding-left: 8px !important;
}
</style>
