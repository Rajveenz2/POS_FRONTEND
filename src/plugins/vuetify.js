import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import VueCookies from 'vue-cookies'
var randomMC = require('random-material-color');

Vue.use(Vuetify);

let color = (VueCookies.get('izcRole') == "ADMIN") ? randomMC.getColor({ shades: ['400', '500', '600', '700', '800']}) : "#0C9780"

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: color
      },
      dark: {
        primary: color
      }
    }
  }
});