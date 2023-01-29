import axios from "axios";
import Util from "../../Util.js"

var BACKEND_URL = process.env.VUE_APP_BACKEND_URL;

export default class RestResource {
  async getConfiguration(params) {
    return await axios.post(`${BACKEND_URL}/ifeed/getConfiguration`, params, Util.setupHeaders());
  }

  async getConfigs(params) {
    axios.defaults.headers.common['Authorization'] = window.$cookies.get('ifeedToken')
    return await axios.post(`${BACKEND_URL}/ifeed/getConfigs`, params);
  }

  async getDemographics(params) {
    return await axios.post(`${BACKEND_URL}/ifeed/getDemographics`, params, Util.setupHeaders());
  }

  async getUserDemographics(params) {
    return await axios.post(`${BACKEND_URL}/ifeed/getUserDemographics`, params);
  }

  async getQuote(params) {
    return await axios.post(`${BACKEND_URL}/ifeed/getQuote`, params, Util.setupHeaders());
  }

  async getTemplates(params) {
    axios.defaults.headers.common['Authorization'] = window.$cookies.get('ifeedToken')
    return axios.post(`${BACKEND_URL}/ifeed/getTemplates`, params);
  }

  async getDrafts(params) {
    axios.defaults.headers.common['Authorization'] = window.$cookies.get('ifeedToken')
    return axios.post(`${BACKEND_URL}/ifeed/getDrafts`, params);
  }

  async getProjectData(params) {
    return axios.post(`${BACKEND_URL}/ifeed/getProjectData`, params, Util.setupHeaders());
  }

  async addProject(params) { 
    return axios.post(`${BACKEND_URL}/ifeed/addProject`, params, Util.setupHeaders());
  }

  async removeProject(params) {
    return axios.post(`${BACKEND_URL}/ifeed/removeProject`, params, Util.setupHeaders());
  }

  async register(params) {
    return await axios.post(`${BACKEND_URL}/ifeed/auth/register`, params, Util.setupHeaders());
  }

  async login(params) {
    return await axios.post(`${BACKEND_URL}/ifeed/auth/login`, params, Util.setupHeaders());
  }

  async updateUser(params) {
    return await axios.post(`${BACKEND_URL}/ifeed/auth/updateUser`, params);
  }

  async logout(params) {
    axios.defaults.headers.common['Authorization'] = window.$cookies.get('ifeedToken')
    return await axios.post(`${BACKEND_URL}/ifeed/auth/logout`, params);
  }

  auditLog(data) {
    return axios.post(`${BACKEND_URL}/audit/create`, data);
  }

  whoAmI(data) {
    axios.defaults.headers.common["Authorization"] = window.$cookies.get("ifeedToken");
    return axios.post(`${BACKEND_URL}/ifeed/auth/whoAmI`, data);
  }
  
  async updateProjectDesc(params) {
    return await axios.post(`${BACKEND_URL}/ifeed/updateProjectDesc`, params);
  }

  async getSampleSplit(params) {
    return await axios.post(`${BACKEND_URL}/ifeed/getSampleSplit`, params, Util.setupHeaders());
  }

  async saveSampleSplit(params) {
    return await axios.post(`${BACKEND_URL}/ifeed/saveSampleSplit`, params, Util.setupHeaders());
  }

  async saveQuestionnaire(data) {
    return await axios.post(`${BACKEND_URL}/ifeed/saveQuestionnaire`, data, Util.setupHeaders());
  }

  async getQuestions(data) {
    return await axios.post(`${BACKEND_URL}/ifeed/getQuestions`, data);
  }

  async updateQuestions(data) {
    return await axios.post(`${BACKEND_URL}/ifeed/updateQuestions`, data);
  }

  async getCost(data) {
    return await axios.post(`${BACKEND_URL}/ifeed/getCost`, data);
  }

}
