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
        :moveSpeed="2"
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
          :class="{ 'on-hover': hover }"
          :elevation="hover ? 12 : 16"
          ><v-card v-if="addProducts" class="grid" width="80%">
            <div class="grid">
              <v-stepper v-model="e1">
                <v-stepper-header class="stepper-header">
                  <v-stepper-step :complete="e1 > 1" step="1">
                    Product Category
                  </v-stepper-step>

                  <v-divider></v-divider>
                  <v-stepper-step :complete="e1 > 2" step="2">
                    Product Name
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step :complete="e1 > 3" step="3">
                    Product Price
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step :complete="e1 > 4" step="4">
                    Product Image
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step :complete="e1 > 5" step="5">
                    Product Description
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step step="6">
                    Confirm Product Data
                  </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                  <v-stepper-content step="1">
                    <v-card class="grid">
                      <v-card-title class="producttitle"
                        >Pick a category for your product</v-card-title
                      >
                      <v-autocomplete
                        prepend-icon="mdi-vector-selection"
                        color="#05a0bf"
                        :items="categories"
                        item-text="name"
                        item-value="name"
                        v-model="newProduct.productCategory"
                        :rules="[rules.required]"
                        required
                        small-chips
                        solo
                        clearable
                        deletable-chips
                        data-vv-name="category"
                        :error-messages="errors.collect('category')"
                      ></v-autocomplete
                    ></v-card>
                    <v-row class="justify-center align-center" no-gutters>
                      <v-btn
                        v-if="newProduct.productCategory"
                        color="#05a0bf"
                        @click="e1 = 2"
                      >
                        Continue
                      </v-btn>
                      <v-btn text @click="addProducts = false">
                        Cancel
                      </v-btn></v-row
                    >
                  </v-stepper-content>
                  <v-stepper-content step="2">
                    <v-card class="grid">
                      <v-card-title class="producttitle"
                        >Enter the name of your product</v-card-title
                      >
                      <v-text-field
                        class="cardtitle"
                        prepend-icon="mdi-food-variant"
                        color="#0075a7"
                        v-model="newProduct.productName"
                        solo
                        dense
                      >
                      </v-text-field
                    ></v-card>
                    <v-row class="justify-center align-center" no-gutters>
                      <v-btn
                        v-if="newProduct.productName"
                        color="#05a0bf"
                        @click="e1 = 3"
                      >
                        Continue
                      </v-btn>
                      <v-btn text @click="addProducts = false">
                        Cancel
                      </v-btn></v-row
                    >
                  </v-stepper-content>

                  <v-stepper-content step="3">
                    <v-card class="grid">
                      <v-card-title class="producttitle"
                        >Enter the price of your product</v-card-title
                      >
                      <v-text-field
                        class="cardtitle"
                        prepend-icon="mdi-currency-usd"
                        color="#0075a7"
                        v-model="newProduct.productPrice"
                        solo
                        dense
                      >
                      </v-text-field
                    ></v-card>
                    <v-row class="justify-center align-center" no-gutters>
                      <v-btn
                        v-if="newProduct.productPrice"
                        color="#05a0bf"
                        @click="e1 = 4"
                      >
                        Continue
                      </v-btn>
                      <v-btn text @click="addProducts = false">
                        Cancel
                      </v-btn></v-row
                    >
                  </v-stepper-content>

                  <v-stepper-content step="4">
                    <v-card class="grid">
                      <form>
                        <v-card-title class="producttitle"
                          >Upload an image of your product</v-card-title
                        >
                        <div class="form-group">
                          <label for="my-file">Select Image</label>
                          <v-file-input
                            prepend-icon="mdi-image-outline"
                            accept="image/*"
                            @change="previewImage"
                            id="my-file"
                          />
                          <p>Preview Here:</p>
                          <img
                            :src="newProduct.productImageUrl"
                            class="img-fluid"
                            width="300px"
                            height="300px"
                          />
                        </div></form
                    ></v-card>
                    <v-row class="justify-center align-center" no-gutters>
                      <v-btn
                        v-if="newProduct.productImageUrl"
                        color="#05a0bf"
                        @click="e1 = 5"
                      >
                        Continue
                      </v-btn>
                      <v-btn text @click="addProducts = false">
                        Cancel
                      </v-btn></v-row
                    >
                  </v-stepper-content>

                  <v-stepper-content step="5">
                    <v-card class="grid">
                      <v-card-title class="producttitle"
                        >Enter a short description of your product</v-card-title
                      >
                      <v-text-field
                        class="cardtitle"
                        prepend-icon="mdi-food-kosher"
                        color="#0075a7"
                        v-model="newProduct.productDesc"
                        solo
                        dense
                      >
                      </v-text-field
                    ></v-card>
                    <v-row class="justify-center align-center" no-gutters>
                      <v-btn color="#05a0bf" @click="e1 = 6"> Continue </v-btn>
                      <v-btn text @click="addProducts = false">
                        Cancel
                      </v-btn></v-row
                    >
                  </v-stepper-content>

                  <v-stepper-content step="6">
                    <v-card class="grid">
                      <v-card-title class="producttitle"
                        >Confirm the details of your product below and click
                        continue to save</v-card-title
                      >
                      <v-text-field
                        prepend-icon="mdi-vector-selection"
                        color="#0075a7"
                        v-model="newProduct.productCategory"
                        readonly
                        solo
                      >
                      </v-text-field>
                      <v-text-field
                        prepend-icon="mdi-food-variant"
                        color="#0075a7"
                        v-model="newProduct.productName"
                        readonly
                        solo
                      >
                      </v-text-field>
                      <v-text-field
                        prepend-icon="mdi-currency-usd"
                        color="#0075a7"
                        v-model="newProduct.productPrice"
                        readonly
                        solo
                      >
                      </v-text-field>
                      <v-text-field
                        prepend-icon="mdi-image-outline"
                        color="#0075a7"
                        v-model="newProduct.productImageUrl"
                        readonly
                        solo
                      >
                      </v-text-field>
                      <v-text-field
                        prepend-icon="mdi-food-kosher"
                        color="#0075a7"
                        v-model="newProduct.productDesc"
                        readonly
                        solo
                      >
                      </v-text-field
                    ></v-card>
                    <v-row class="justify-center align-center" no-gutters>
                      <v-btn color="#05a0bf" @click="addProduct()">
                        Continue
                      </v-btn>
                      <v-btn text @click="addProducts = false">
                        Cancel
                      </v-btn></v-row
                    >
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </div></v-card
          >
          <v-card
            class="grid2"
            shaped
            height="auto"
            width="350px"
            :class="{ 'on-hover': hover }"
            :elevation="hover ? 12 : 16"
            @click="addProducts = true"
            color="#F5F7FA"
            ><v-card class="grid">
              <v-img
                :src="url"
                class="white--text align-end"
                height="150px"
                width="350px"
              >
              </v-img>
              <v-card-text
                class="cardtitle"
                v-text="name"
              ></v-card-text></v-card
          ></v-card>
          <v-card color="transparent" class="grid2">
            <v-data-table
              :headers="headers"
              :items="products"
              :sort-by="['productCategory']"
              :sort-desc="[false, true]"
              :footer-props="{
                'items-per-page-options': [15, 30, 45, 60, 75],
              }"
              :items-per-page="15"
              class="elevation-1"
            >
              <template v-slot:item="{ item }">
                <tr>
                  <td @click="select(item._id)">
                    <div class="d-flex justify-center">
                      {{ item.productName }}
                    </div>
                  </td>
                  <td>
                    <div class="d-flex justify-center ma-4">
                      <v-img
                        height="250px"
                        width="250px"
                        :src="item.productImageUrl"
                        @click="select(item._id)"
                      />
                    </div>
                  </td>
                  <td @click="select(item._id)">
                    <div class="d-flex justify-center">
                      {{ item.productCategory }}
                    </div>
                  </td>
                  <td @click="select(item._id)">
                    <div class="d-flex justify-center">
                      {{ item.productDesc }}
                    </div>
                  </td>
                  <td>
                    <v-icon @click="deleteProduct(item._id)">
                      mdi-delete
                    </v-icon>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
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
      products: [],
      headers: [
        {
          text: "Name",
          align: "center",
          class: "Dark blue",
          value: "productName",
          sortable: false,
        },
        {
          text: "Image",
          align: "center",
          class: "Dark blue",
          value: "productImageUrl",
          sortable: false,
        },
        {
          text: "Category",
          align: "center",
          class: "Dark blue",
          value: "productCategory",
        },
        {
          text: "Description",
          align: "center",
          class: "Dark blue",
          value: "productDesc",
          sortable: false,
        },
        {
          text: "Actions",
          value: "actions",
          align: "center",
          class: "Dark blue",
          sortable: false,
        },
      ],
      newProduct: {},
      addProducts: false,
      e1: 1,
      valid: true,
      preview: [],
      url:
        "http://res.cloudinary.com/de3gn7o77/image/upload/v1675119701/v5u4sg7q6h5abcamqing.png",
      name: "Click Here to Add a New Product",
      categories: ["Food", "Beverage"],
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },

  mounted() {
    this.getProducts();
  },

  methods: {
    async getProducts() {
      this.$setLoader();
      await dataService.getProducts().then((res) => {
        this.products = res.data.products;
        this.productCount = res.data.products.length;
      });

      this.$disableLoader();
    },

    async select(cardId) {
      this.$setLoader();
      this.$router.push({ path: `/product/${cardId}` });
      this.$disableLoader();
    },

    previewImage(file) {
      if (file) {
        this.$setLoader();
        file.resource_type = "image";
        file.url = process.env.VUE_APP_CLOUDINARY_URL_IMAGE;
        this.uploadFileToCloudinary(file).then((fileResponse) => {
          this.preview = fileResponse.url;
          this.newProduct.productImageUrl = this.preview;
          console.log(this.preview);
          this.$disableLoader();
        });
      }
    },

    uploadFileToCloudinary(file) {
      this.preview = null;
      console.log(file);
      return new Promise(function(resolve, reject) {
        let formData = new FormData();
        formData.append(
          "upload_preset",
          process.env.VUE_APP_CLOUDINARY_PRESET1
        );
        formData.append("resource_type", file.resource_type);
        formData.append("file", file);
        let request = new XMLHttpRequest();
        request.open("POST", file.url, true);
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        request.onreadystatechange = () => {
          if (request.readyState === 4 && request.status === 200) {
            let response = JSON.parse(request.responseText);
            resolve(response);
          }
          if (request.status !== 200) {
            let response = JSON.parse(request.responseText);
            let error = response.error.message;
            this.errorText = "error uploading files " + error;
            this.isError = true;
            reject(error);
          }
        };
        request.onerror = (err) => {
          alert("error: " + err);
          reject(err);
        };
        request.send(formData);
      });
    },

    async addProduct() {
      this.$setLoader();
      let data = this.newProduct;
      await dataService.addProduct(data).then((res) => {
        console.log(res.data);
        this.$router.go(0);
      });

      this.$disableLoader();
    },

    async deleteProduct(productId) {
      let data = {
        _id: productId,
      };

      this.$setLoader();
      await dataService.deleteProduct(data).then((res) => {
        console.log(res);
      });
      this.$router.go(0);
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
  color: #001736 !important;
  /* background-image: linear-gradient(to right, #FFCF9F, #FF889C); */
}
.grid2 {
  margin-top: auto !important;
  margin-bottom: auto !important;
  margin-right: auto !important;
  margin-left: auto !important;
  place-items: center;
  background-color: transparent;
  /* background-image: linear-gradient(to right, #FFCF9F, #FF889C); */
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
  color: #001736;
  justify-content: center;
  align-items: center;
}

.stepper-header {
  background-color: #001736;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0),
    0px 2px 2px 0px rgba(0, 0, 0, 0), 0px 1px 5px 0px rgba(0, 0, 0, 0);
}

.colclass {
  flex: 0 0 25%;
  max-width: inherit !important;
  padding-top: 8px !important;
  padding-right: 8px !important;
  padding-bottom: 8px !important;
  padding-left: 8px !important;
}
.green-bg {
  display: table-row;
}
.green-bg:hover {
  background: #000000 !important;
}
</style>
