<template>
  <v-app id="app">
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script>
import VeeValidate from "vee-validate";
import Vue from "vue";
import sassStyles from '@/assets/styles/main.scss'
import AppEvents from  '@/config/event';
import VueNumber from 'vue-number-animation'
import moment from 'moment';
import store from './app.store'

Vue.config.productionTip = false
Vue.use(VeeValidate);
Vue.use(VueNumber)
Vue.prototype.$moment = moment

// Global alert for error dialog
Vue.config.errorHandler = (err) => {
  if (err.message) {
    store.state.loader = false
    store.state.dialogMessageText = err.message
    store.state.showDialogMessage = true
  }
};

const default_layout = "default";

export default {
  components: {
    sassStyles,
    AppEvents
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout';
    }
  },
  created () {
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback);
    });
    window.getApp = this;
  },
}
</script>