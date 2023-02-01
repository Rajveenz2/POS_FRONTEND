import Vue from "vue";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./app.store.js";
import mixin from "./app.mixin.js";
import VueCookies from "vue-cookies";
import VueQuillEditor from "vue-quill-editor";
import axios from "axios";
import JsonEditor from "vue-json-edit-modal";
import VueParticles from "vue-particles";
Vue.use(VueParticles);

import Default from "./layouts/Default";
import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import "quill/dist/quill.bubble.css"; // for bubble theme

const moment = require("moment");

axios.interceptors.response.use(undefined, function (error) {
  store.state.loader = false;

  if (
    error.response &&
    (error.response.status === 409 || error.response.status === 401)
  ) {
    if (error.response.status === 401) {
      store.state.dialogMessageTitle = "Duplicate Login Detected";
      store.state.dialogMessageText =
        "We have detected a duplicate login under the same account. You have been logged out automatically.";
    } else if (error.response.status === 409) {
      store.state.dialogMessageTitle = "Session Expired";
      store.state.dialogMessageText =
        "Your session has expired. Please re-login to renew your session.";
    }

    store.state.showDialogMessage = true;

    window.$cookies.remove("posToken");

    router.replace({ name: "login" });
  }

  if (error.response && error.response.status === 400) {
    store.state.dialogMessageTitle = null;

    if (error.response.data && error.response.data.message) {
      store.state.dialogMessageText = error.response.data.message;
    } else if (error.response.message) {
      store.state.dialogMessageText = error.response.message;
    } else {
      store.state.dialogMessageText =
        "There is an error. Please reach out to our team for support.";
    }

    store.state.showDialogMessage = true;
  }

  return Promise.reject(error);
});

Vue.use(VueCookies);
VueCookies.config("6h");
Vue.component("default-layout", Default);
Vue.mixin(mixin);
Vue.use(VueQuillEditor /* { default global options } */);
Vue.use(JsonEditor);

Vue.prototype.$moment = moment;
Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
