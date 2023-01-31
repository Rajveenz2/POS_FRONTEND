<template>
  <v-app id="login">
    <vue-particles
      color="#05a0bf"
      :particleOpacity="1"
      :particlesNumber="25"
      shapeType="star"
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
    <v-form>
      <v-container class="container">
        <v-hover v-slot="{ hover }" open-delay="200">
          <v-card
            class="grid"
            width="400"
            height="auto"
            shaped
            :class="{ 'on-hover': hover }"
            :elevation="hover ? 12 : 16"
          >
            <v-card-title>
              <div class="layout column align-center">
                <img
                  src="./../assets/images/logo.png"
                  class="logo"
                  alt="InsightzClub"
                />
              </div>
            </v-card-title>
            <v-form ref="registerForm" v-model="valid" lazy-validation>
              <v-card-text>
                <v-row>
                  <v-col>
                    <v-card-text class="text">Email</v-card-text>
                    <v-text-field
                      class="text"
                      prepend-icon="mdi-email-outline"
                      color="#0075a7"
                      v-model="email"
                      :rules="emailRules"
                      dense
                      solo
                      data-vv-name="email"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-card-text class="text">Password</v-card-text>
                    <v-text-field
                      class="text"
                      prepend-icon="mdi-lock-outline"
                      color="#0075a7"
                      v-model="password"
                      :rules="[rules.required]"
                      maxlength="20"
                      dense
                      solo
                      data-vv-name="password"
                      :append-icon="value ? 'visibility' : 'visibility_off'"
                      @click:append="() => (value = !value)"
                      :type="value ? 'password' : 'text'"
                    >
                    </v-text-field>
                    <v-row class="justify-center align-center" no-gutters>
                      <v-btn class="button" dark color="#05a0bf" @click="login">
                        <v-icon color="#fff"> mdi-login mdi-18px </v-icon>
                        Login
                      </v-btn>
                    </v-row>
                  </v-col>
                </v-row>
                <br />
              </v-card-text>
            </v-form>
          </v-card>
        </v-hover>
      </v-container>
    </v-form>

    <v-footer padless class="footer">
      <v-card-text class="footer">
        Copyright {{ new Date().getFullYear() }} ©
        <a href="https://www.facebook.com/" target="_blank" class="company-link"
          >Fast Track Solutions</a
        >
      </v-card-text>
    </v-footer>
  </v-app>
</template>

<script>
import DataService from "../services/dataService.js";
const dataService = new DataService();

export default {
  data() {
    return {
      email: null,
      password: null,
      value: String,
      valid: true,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => (v && v.length >= 8) || "Min 8 characters",
      },
      emailRules: [
        (v) => !!v || "Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      errorMessage: false,
    };
  },

  mounted() {
    this.errorMessage = "Failed";
  },

  methods: {
    async first() {
      this.$router.push({ path: `/home` });
    },
    async login() {
      try {
        this.$setLoader();
        let loginDto = {
          email: this.email.toLowerCase(),
          password: this.password,
        };
        await dataService.login(loginDto).then((res) => {
          this.$store.state.user = res.data.user;
          this.$store.state.code = this.password;
          window.$cookies.set("posToken", res.data.token);
          this.$router.push({ path: `/home` });
        });
        this.$disableLoader();
      } catch (error) {
        // alert("Error 1000 - Page does not exists!")
      }
      // this.$setLoader();
      // this.$router.push({ path: `/home` });
      // this.$disableLoader();
    },
  },
};
</script>

<style scoped lang="css">
.container {
  margin-top: 5%;
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

#particles-js {
  background-color: #001736;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
}

.company-link {
  color: #05a0bf;
  text-decoration: none;
}

.v-sheet.v-card.v-sheet--shaped {
  border-radius: 24px 4px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
  border-bottom-left-radius: 24px;
}

.grid {
  margin-top: 2% !important;
  /* margin-bottom: 1% !important; */
  margin-right: auto !important;
  margin-left: auto !important;
  width: 60%;
  height: 60%;
  place-items: center;
  background-color: transparent;
  /* background-image: linear-gradient(to right, #FFCF9F, #FF889C); */
}
.footer {
  font-size: 12px;
  font-weight: 600;
  color: #00fded;
  line-height: 1.25;
  text-align: center;
  background-color: #fff0;
  margin-top: 1%;
}

.text {
  color: #ffffff !important;
}
.theme--light.v-input input, .theme--light.v-input textarea, .text {
  color: #ffffff !important;
}
.v-btn > .v-btn__content .v-icon {
  color: #05a0bf;
  margin-right: 5px;
}

.theme--light.v-card > .v-card__text,
.theme--light.v-card .v-card__subtitle {
  color: rgba(0, 0, 0, 0.6);
}

.col-xl,
.col-xl-auto,
.col-xl-12,
.col-xl-11,
.col-xl-10,
.col-xl-9,
.col-xl-8,
.col-xl-7,
.col-xl-6,
.col-xl-5,
.col-xl-4,
.col-xl-3,
.col-xl-2,
.col-xl-1,
.col-lg,
.col-lg-auto,
.col-lg-12,
.col-lg-11,
.col-lg-10,
.col-lg-9,
.col-lg-8,
.col-lg-7,
.col-lg-6,
.col-lg-5,
.col-lg-4,
.col-lg-3,
.col-lg-2,
.col-lg-1,
.col-md,
.col-md-auto,
.col-md-12,
.col-md-11,
.col-md-10,
.col-md-9,
.col-md-8,
.col-md-7,
.col-md-6,
.col-md-5,
.col-md-4,
.col-md-3,
.col-md-2,
.col-md-1,
.col-sm,
.col-sm-auto,
.col-sm-12,
.col-sm-11,
.col-sm-10,
.col-sm-9,
.col-sm-8,
.col-sm-7,
.col-sm-6,
.col-sm-5,
.col-sm-4,
.col-sm-3,
.col-sm-2,
.col-sm-1,
.col,
.col-auto,
.col-12,
.col-11,
.col-10,
.col-9,
.col-8,
.col-7,
.col-6,
.col-5,
.col-4,
.col-3,
.col-2,
.col-1 {
  width: 30%;
  padding: 0px;
}
.row {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
}

.v-application .elevation-16 {
  box-shadow: 0px 8px 10px -5px #00fded, 0px 16px 24px 2px #00fded,
    0px 6px 30px 5px #00fded !important;
}

.v-application .elevation-12 {
  box-shadow: 0px 3px 5px -1px #00fded, 0px 5px 8px 0px #00fded,
    0px 1px 14px 0px #00fded !important;
}
.v-application .elevation-6 {
  box-shadow: 0px 3px 5px -1px #2ca8a0, 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0, 0, 0, 0.12) !important;
}
</style>
