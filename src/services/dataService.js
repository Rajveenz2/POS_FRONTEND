import axios from "axios";
import Util from "../../Util.js";

var BACKEND_URL = process.env.VUE_APP_BACKEND_URL;

export default class RestResource {
  async getConfiguration(params) {
    return await axios.post(
      `${BACKEND_URL}/admin/getConfiguration`,
      params,
      Util.setupHeaders()
    );
  }

  async getTemplates(params) {
    axios.defaults.headers.common["Authorization"] = window.$cookies.get(
      "posToken"
    );
    return axios.post(`${BACKEND_URL}/admin/getTemplates`, params);
  }

  async login(params) {
    return await axios.post(
      `${BACKEND_URL}/admin/auth/login`,
      params,
      Util.setupHeaders()
    );
  }

  async logout(params) {
    axios.defaults.headers.common["Authorization"] = window.$cookies.get(
      "posToken"
    );
    return await axios.post(`${BACKEND_URL}/admin/auth/logout`, params);
  }

  whoAmI(data) {
    axios.defaults.headers.common["Authorization"] = window.$cookies.get(
      "posToken"
    );
    return axios.post(`${BACKEND_URL}/admin/auth/whoAmI`, data);
  }

  async getProducts(params) {
    return await axios.post(
      `${BACKEND_URL}/product/getProducts`,
      params,
      Util.setupHeaders()
    );
  }

  async getProduct(params) {
    return await axios.post(
      `${BACKEND_URL}/product/getProduct`,
      params,
      Util.setupHeaders()
    );
  }

  async addProduct(params) {
    return await axios.post(
      `${BACKEND_URL}/product/addProduct`,
      params,
      Util.setupHeaders()
    );
  }

  async updateProduct(params) {
    return await axios.post(
      `${BACKEND_URL}/product/updateProduct`,
      params,
      Util.setupHeaders()
    );
  }

  async deleteProduct(params) {
    return await axios.post(
      `${BACKEND_URL}/product/deleteProduct`,
      params,
      Util.setupHeaders()
    );
  }

  async getTables(params) {
    axios.defaults.headers.common["Authorization"] = window.$cookies.get(
      "posToken"
    );
    return await axios.post(`${BACKEND_URL}/table/getTables`, params);
  }

  async getTable(params) {
    return await axios.post(
      `${BACKEND_URL}/table/getTable`,
      params,
      Util.setupHeaders()
    );
  }

  async getInactiveTables(params) {
    return await axios.post(
      `${BACKEND_URL}/table/getInactiveTables`,
      params,
      Util.setupHeaders()
    );
  }

  async getTableslength(params) {
    return await axios.post(
      `${BACKEND_URL}/table/getTableslength`,
      params,
      Util.setupHeaders()
    );
  }

  async addTable(params) {
    return await axios.post(
      `${BACKEND_URL}/table/addTable`,
      params,
      Util.setupHeaders()
    );
  }

  async getOrder(params) {
    return await axios.post(
      `${BACKEND_URL}/order/getOrder`,
      params,
      Util.setupHeaders()
    );
  }

  async addOrder(params) {
    return await axios.post(
      `${BACKEND_URL}/order/addOrder`,
      params,
      Util.setupHeaders()
    );
  }

  async findOrder(params) {
    return await axios.post(
      `${BACKEND_URL}/order/findOrder`,
      params,
      Util.setupHeaders()
    );
  }

  async confirmOrder(params) {
    return await axios.post(
      `${BACKEND_URL}/order/confirmOrder`,
      params,
      Util.setupHeaders()
    );
  }

  async getactiveOrders(params) {
    return await axios.post(
      `${BACKEND_URL}/order/getactiveOrders`,
      params,
      Util.setupHeaders()
    );
  }

  async deleteTable(params) {
    return await axios.post(
      `${BACKEND_URL}/table/deleteTable`,
      params,
      Util.setupHeaders()
    );
  }
}
