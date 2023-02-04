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
          width="80%"
          shaped
          :class="{ 'on-hover': hover }"
          :elevation="hover ? 12 : 16"
          ><v-card shaped class="grid3" width="90%" color="#F5F7FA">
            <v-form ref="form" v-model="valid" lazy-validation
              ><v-card shaped class="grid3" width="90%" color="#F5F7FA"
                ><div class="form-group" v-if="showUpload">
                  <v-card
                    width="70%"
                    class="grid3"
                    color="#F5F7FA"
                    shaped
                    :class="{ 'on-hover': hover }"
                    :elevation="hover ? 12 : 16"
                    ><v-card class="grid3" width="80%" color="#F5F7FA">
                      <label for="my-file">Select Image</label>
                      <v-file-input
                        prepend-icon="mdi-image-outline"
                        accept="image/*"
                        @change="previewImage"
                        id="my-file"
                      /><v-row class="justify-center align-center" no-gutters>
                        <v-btn
                          class="btn"
                          color="#05a0bf"
                          @click="cancelUpload()"
                        >
                          Cancel Upload
                        </v-btn></v-row
                      ></v-card
                    ></v-card
                  >
                </div>
                <v-card-title class="producttitle">Product Image</v-card-title>
                <v-card
                  class="grid"
                  width="250px"
                  height="250px"
                  :class="{ 'on-hover': hover }"
                  :elevation="hover ? 12 : 16"
                  @click="upload()"
                  ><div v-if="preview">
                    <v-img :src="preview" height="240px" width="240px"> </v-img>
                  </div>
                  <div v-else>
                    <v-img
                      :src="product.productImageUrl"
                      height="240px"
                      width="240px"
                    >
                    </v-img>
                  </div>
                </v-card>
                <v-card-title class="producttitle"
                  >Product Category</v-card-title
                >
                <v-autocomplete
                  prepend-icon="mdi-vector-selection"
                  color="#05a0bf"
                  :items="categories"
                  item-text="name"
                  item-value="name"
                  v-model="product.productCategory"
                  required
                  small-chips
                  solo
                  clearable
                  deletable-chips
                  data-vv-name="category"
                  :error-messages="errors.collect('category')"
                ></v-autocomplete>
                <v-card-title class="producttitle">Product Name</v-card-title>
                <v-text-field
                  class="carddesc"
                  prepend-icon="mdi-food-variant"
                  color="#0075a7"
                  v-model="product.productName"
                  solo
                  dense
                  shaped
                >
                </v-text-field>
                <v-card-title class="producttitle"
                  >Product Price (RM)</v-card-title
                >
                <v-text-field
                  class="carddesc"
                  prepend-icon="mdi-currency-usd"
                  color="#0075a7"
                  v-model="product.productPrice"
                  solo
                  dense
                  shaped
                >
                </v-text-field>
                <v-card-title class="producttitle"
                  >Product Description (Optional)</v-card-title
                >
                <v-text-field
                  class="carddesc"
                  prepend-icon="mdi-food-kosher"
                  color="#0075a7"
                  v-model="product.productDesc"
                  solo
                  dense
                  shaped
                >
                </v-text-field>
              </v-card> </v-form
            ><v-row class="justify-center align-center" no-gutters>
              <v-btn class="btn" color="#05a0bf" @click="editProduct()">
                Update Product
              </v-btn>
              <v-btn class="btn" color="#05a0bf" @click="deleteProduct()">
                Delete Product
              </v-btn></v-row
            ></v-card
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
      product: [],
      e1: 1,
      valid: true,
      preview: null,
      categories: ["Food", "Beverage"],
      showUpload: false,
    };
  },

  mounted() {
    this.getProduct();
  },

  methods: {
    async getProduct() {
      this.$setLoader();
      await dataService
        .getProduct({ _id: this.$route.params.cardId })
        .then((res) => {
          this.product = res.data.product[0];
        });

      this.$disableLoader();
    },

    upload() {
      if (confirm("Upload a new image?")) {
        this.showUpload = true;
      }
    },

    cancelUpload() {
      if (confirm("Cancel Upload?")) {
        this.showUpload = false;
        this.preview = null;
      }
    },

    previewImage(file) {
      if (file) {
        this.$setLoader();
        file.resource_type = "image";
        file.url = process.env.VUE_APP_CLOUDINARY_URL_IMAGE;
        this.uploadFileToCloudinary(file).then((fileResponse) => {
          this.preview = fileResponse.url;
          //   this.product.productImageUrl = this.preview;
          this.$disableLoader();
        });
      }
    },

    uploadFileToCloudinary(file) {
      this.preview = null;
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

    async editProduct() {
      if (this.preview != null) {
        this.product.productImageUrl = this.preview;
      } else {
        this.product.productImageUrl = this.product.productImageUrl;
      }
      let data = {
        _id: this.$route.params.cardId,
        productData: this.product,
      };

      this.$setLoader();
      await dataService.updateProduct(data).then((res) => {
        console.log(res);
      });
      this.$router.push({ path: `/inventory` });
      this.$disableLoader();
    },

    async deleteProduct() {
      let data = {
        _id: this.$route.params.cardId,
      };

      this.$setLoader();
      await dataService.deleteProduct(data).then((res) => {
        console.log(res);
      });
      this.$router.push({ path: `/inventory` });
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
  display: grid !important;
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

.grid3 {
  margin-top: 1% !important;
  margin-bottom: 1% !important;
  margin-right: auto !important;
  margin-left: auto !important;
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
  font-size: 18px;
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
</style>
