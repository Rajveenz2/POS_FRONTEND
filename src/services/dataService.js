import axios from "axios";
import Util from "../../Util.js"

var BACKEND_URL = process.env.VUE_APP_BACKEND_URL;

export default class RestResource {
  async getConfiguration(params) {
    return await axios.post(`${BACKEND_URL}/admin/getConfiguration`, params, Util.setupHeaders());
  }

  async getTemplates(params) {
    axios.defaults.headers.common['Authorization'] = window.$cookies.get('posToken')
    return axios.post(`${BACKEND_URL}/admin/getTemplates`, params);
  }

  async login(params) {
    return await axios.post(`${BACKEND_URL}/admin/auth/login`, params, Util.setupHeaders());
  }

  async logout(params) {
    axios.defaults.headers.common['Authorization'] = window.$cookies.get('posToken')
    return await axios.post(`${BACKEND_URL}/admin/auth/logout`, params);
  }

  whoAmI(data) {
    axios.defaults.headers.common["Authorization"] = window.$cookies.get("posToken");
    return axios.post(`${BACKEND_URL}/admin/auth/whoAmI`, data);
  }
}
