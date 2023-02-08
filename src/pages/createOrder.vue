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
          ><v-app-bar height="fit-content" shaped color="transparent">
            <template v-slot:extension color="white">
              <v-tabs align-with-title color="white">
                <v-tab
                  @click="loadProduct(c)"
                  color="white"
                  v-for="c in category"
                  :key="c._id"
                  >{{ c }}</v-tab
                >
              </v-tabs>
            </template>
          </v-app-bar>
          <v-app-bar
            height="fit-content"
            shaped
            color="rgba(0, 0, 0, 0.63)"
            fixed
            bottom
            width="78%"
            class="grid"
            ><v-row class="justify-center align-center" no-gutters
              ><v-col :cols="3"
                ><v-card-title class="header4"
                  ><v-icon>mdi-cart-arrow-right mdi-36px</v-icon></v-card-title
                ></v-col
              ><v-col :cols="3">
                <v-card-title class="header4"
                  >{{ order.length }} Product selected</v-card-title
                ></v-col
              ><v-col :cols="3">
                <v-card-title class="header4"
                  >RM {{ total }}</v-card-title
                ></v-col
              ><v-col :cols="3">
                <v-card-title class="header4"
                  ><v-btn :disabled="order.length < 1" @click="addOrder()"
                    >ORDER</v-btn
                  ></v-card-title
                ></v-col
              ></v-row
            >
          </v-app-bar>
          <div v-if="showFood">
            <v-card
              v-for="product in products"
              :key="product._id"
              class="grid3"
              :class="{ 'on-hover': hover }"
              :elevation="hover ? 12 : 16"
              color="#F5F7FA"
              ><div v-if="product.productCategory == 'Food'">
                <v-card-title class="header1">{{
                  product.productName
                }}</v-card-title>
                <v-card
                  class="grid4"
                  width="160px"
                  height="160px"
                  :class="{ 'on-hover': hover }"
                  :elevation="hover ? 12 : 16"
                >
                  <v-img
                    :src="product.productImageUrl"
                    height="150px"
                    width="150px"
                  >
                  </v-img
                ></v-card>
                <v-row no-gutters class="justify-center align-center"
                  ><v-col :cols="5"
                    ><v-card-title class="header2"
                      >RM {{ product.productPrice }}</v-card-title
                    ></v-col
                  ><v-col :cols="5"
                    ><v-card-title class="header2"
                      ><v-icon
                        color="#4b0be1"
                        @click="removeFromCart(product._id)"
                        >mdi-minus-circle</v-icon
                      ><v-card-title class="header3">{{
                        product.quantity
                      }}</v-card-title
                      ><v-icon color="#4b0be1" @click="addToCart(product._id)"
                        >mdi-plus-circle</v-icon
                      ></v-card-title
                    ></v-col
                  ></v-row
                >
              </div></v-card
            >
          </div>
          <div v-if="showBeverages">
            <v-card
              v-for="product in products"
              :key="product._id"
              class="grid3"
              :class="{ 'on-hover': hover }"
              :elevation="hover ? 12 : 16"
              color="#F5F7FA"
              ><div v-if="product.productCategory == 'Beverage'">
                <v-card-title class="header1">{{
                  product.productName
                }}</v-card-title>
                <v-card
                  class="grid4"
                  width="160px"
                  height="160px"
                  :class="{ 'on-hover': hover }"
                  :elevation="hover ? 12 : 16"
                >
                  <v-img
                    :src="product.productImageUrl"
                    height="150px"
                    width="150px"
                  >
                  </v-img
                ></v-card>
                <v-row no-gutters class="justify-center align-center"
                  ><v-col :cols="5"
                    ><v-card-title class="header2"
                      >RM {{ product.productPrice }}</v-card-title
                    ></v-col
                  ><v-col :cols="5"
                    ><v-card-title class="header2"
                      ><v-icon
                        color="#4b0be1"
                        @click="removeFromCart(product._id)"
                        >mdi-minus-circle</v-icon
                      ><v-card-title class="header3">{{
                        product.quantity
                      }}</v-card-title
                      ><v-icon color="#4b0be1" @click="addToCart(product._id)"
                        >mdi-plus-circle</v-icon
                      ></v-card-title
                    ></v-col
                  ></v-row
                >
              </div></v-card
            >
          </div>
          <div v-if="showAsian">
            <v-card
              v-for="product in products"
              :key="product._id"
              class="grid3"
              :class="{ 'on-hover': hover }"
              :elevation="hover ? 12 : 16"
              color="#F5F7FA"
              ><div v-if="product.productCategory == 'Asian'">
                <v-card-title class="header1">{{
                  product.productName
                }}</v-card-title>
                <v-card
                  class="grid4"
                  width="160px"
                  height="160px"
                  :class="{ 'on-hover': hover }"
                  :elevation="hover ? 12 : 16"
                >
                  <v-img
                    :src="product.productImageUrl"
                    height="150px"
                    width="150px"
                  >
                  </v-img
                ></v-card>
                <v-row no-gutters class="justify-center align-center"
                  ><v-col :cols="5"
                    ><v-card-title class="header2"
                      >RM {{ product.productPrice }}</v-card-title
                    ></v-col
                  ><v-col :cols="5"
                    ><v-card-title class="header2"
                      ><v-icon
                        color="#4b0be1"
                        @click="removeFromCart(product._id)"
                        >mdi-minus-circle</v-icon
                      ><v-card-title class="header3">{{
                        product.quantity
                      }}</v-card-title
                      ><v-icon color="#4b0be1" @click="addToCart(product._id)"
                        >mdi-plus-circle</v-icon
                      ></v-card-title
                    ></v-col
                  ></v-row
                >
              </div></v-card
            >
          </div>
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
      orders: [],
      table: [],
      products: [],
      product: [],
      category: [],
      categories: [],
      showBeverages: false,
      showFood: true,
      showAsian: false,
      quantity: 1,
      order: [],
      total: 0,
    };
  },
  computed: {
    // sumToPay() {
    //   let t = this.total;
    //   let sum = t.reduce(function(a, b) {
    //     return a + b;
    //   }, 0);
    //   return sum;
    // },
  },

  mounted() {
    this.getProducts();
  },

  methods: {
    async getProducts() {
      this.$setLoader();
      await dataService.getProducts().then((res) => {
        this.products = res.data.products;
        for (let product of this.products) {
          this.categories.push(product.productCategory);
        }
        this.categories.forEach((element) => {
          if (!this.category.includes(element)) {
            this.category.push(element);
          }
        });
        return this.category;
      });

      this.$disableLoader();
    },

    loadProduct(categori) {
      console.log(categori);
      if (categori == "Food") {
        this.showFood = true;
        this.showBeverages = false;
        this.showAsian = false;
      }
      if (categori == "Beverage") {
        this.showFood = false;
        this.showBeverages = true;
        this.showAsian = false;
      }
      if (categori == "Asian") {
        this.showFood = false;
        this.showBeverages = false;
        this.showAsian = true;
      }
    },

    addToCart(productId) {
      for (let product of this.products) {
        if (product._id == productId) {
          product.quantity = product.quantity + 1;
          product.currentPrice = product.quantity * product.productPrice;
          if (this.order.length != 0) {
            var item = this.order.find((x) => x._id == productId);
            if (item) {
              item = product;
            } else {
              this.order.push(product);
            }
          } else {
            this.order.push(product);
          }
          this.total += Number(product.productPrice);
        }
      }
    },

    removeFromCart(productId) {
      for (let product of this.products) {
        if (product._id == productId) {
          product.quantity = product.quantity - 1;
          !isNaN(product.quantity) && product.quantity > 0
            ? product.quantity
            : (product.quantity = 0);
          if (product.quantity >= 1) {
            product.currentPrice = product.quantity * product.productPrice;
            var item = this.order.find((x) => x._id == productId);
            if (item) {
              item = product;
            }
            this.total -= Number(product.productPrice);
          } else {
            product.quantity = 0;
            if (this.total != 0) {
              this.total -= Number(product.productPrice);
            } else {
              this.total = 0;
            }
            for (var i = 0; i < this.order.length; i++)
              if (this.order[i]._id === productId) {
                this.order.splice(i, 1);
                break;
              }
          }
        }
      }
    },

    async addOrder() {
      this.$setLoader();
      let data = {
        order: this.order,
        total: this.total,
      };
      await dataService.addOrder(data).then((res) => {
        let cardId = res.data.addOrder._id;
        this.$router.push({ path: `/confirmOrder/${cardId}` });
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
  margin-bottom: 22%;
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

.header1 {
  margin-right: auto !important;
  margin-left: auto !important;
  font-size: 20px;
  font-weight: bolder;
  justify-content: center;
  align-items: center;
  color: #001736 !important;
}

.header2 {
  margin-right: auto !important;
  margin-left: auto !important;
  font-size: 18px;
  justify-content: center;
  align-items: center;
  color: #4b0be1 !important;
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
