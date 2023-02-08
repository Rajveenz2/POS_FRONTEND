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
      <v-hover v-slot="{ hover }" open-delay="200">
        <v-card
          class="grid"
          shaped
          color="transparent"
          width="80%"
          :class="{ 'on-hover': hover }"
          :elevation="hover ? 12 : 16"
          ><v-card
            class="grid"
            shaped
            color="transparent"
            width="80%"
            :class="{ 'on-hover': hover }"
            :elevation="hover ? 12 : 16"
            v-for="o in order"
            :key="o._id"
            ><v-row class="justify-center align-center" no-gutters
              ><v-col :cols="6">
                <v-card-title class="header1"
                  ><v-icon
                    >mdi-numeric-{{ o.quantity }}-circle-outline
                    mdi-36px</v-icon
                  ></v-card-title
                ></v-col
              ><v-col :cols="6">
                <v-card-title class="header2">{{
                  o.productName
                }}</v-card-title></v-col
              ></v-row
            >
          </v-card>
          <v-card-title class="header2"
            >Please select a dining option :</v-card-title
          >
          <v-radio-group v-model="orderType" row>
            <v-radio label="Dine-in" value="Dine-in"></v-radio>
            <v-radio label="Takeaway" value="Takeaway"></v-radio>
          </v-radio-group>
          <v-card-title class="header2"
            >Please select a table number :</v-card-title
          >
          <v-autocomplete
            background-color="#fff"
            :items="tables"
            v-model="table"
            auto-select-first
            item-text="tableNumber"
            item-value="_id"
            required
            solo
          ></v-autocomplete
          ><v-spacer></v-spacer>
          <v-card-title class="header2">Total : RM {{ total }}</v-card-title>
          <v-btn
            class="btn"
            :disabled="table.length < 1"
            @click="confirmOrder()"
            >Confirm</v-btn
          >
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
      tables: [],
      table: [],
      order: [],
      total: 0,
      orderId: [],
      orderType: "Dine-in",
    };
  },
  computed: {},

  mounted() {
    this.findOrder();
    this.getInactiveTables();
  },

  methods: {
    async findOrder() {
      this.$setLoader();
      await dataService
        .findOrder({ _id: this.$route.params.cardId })
        .then((res) => {
          this.order = res.data.order[0].order;
          this.total = res.data.order[0].total;
          this.orderId = res.data.order[0]._id;
        });

      this.$disableLoader();
    },

    async getInactiveTables() {
      this.$setLoader();
      await dataService.getInactiveTables().then((res) => {
        this.tables = res.data.table;
        this.table = this.tables[0];
      });

      this.$disableLoader();
    },

    async confirmOrder() {
      this.$setLoader();
      let data = {
        order: this.order,
        total: this.total,
        table: this.table,
        orderType: this.orderType,
        _id: this.orderId,
      };
      await dataService.confirmOrder(data).then((res) => {
        console.log(res)
        this.$disableLoader();
      });
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
  display: grid !important;
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
  margin-left: 1% !important;
  place-items: center;
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

.header1 {
  font-size: 18px;
  justify-content: center !important;
  align-items: center !important;
  color: #0ff !important;
  flex-wrap: inherit !important;
}

.header2 {
  margin-right: auto !important;
  margin-left: auto !important;
  font-size: 18px;
  justify-content: center;
  align-items: center;
  color: #fff !important;
  flex-wrap: inherit !important;
}

.header3 {
  font-size: 18px;
  justify-content: center;
  align-items: center;
  color: #001736 !important;
}

.header4 {
  margin-left: 1%;
  font-size: 18px;
  justify-content: center;
  align-items: center;
  color: #00fff3 !important;
  flex-wrap: inherit !important;
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
