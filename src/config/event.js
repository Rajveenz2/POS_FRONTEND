import RestResource from "./../services/dataService";
const dataService = new RestResource();


export default [
  {
    name: 'APP_LOGOUT',
    callback: function () {
      dataService.logout({'_id' : this.$store.state.user.userId})
      window.$cookies.remove('izcToken')
      window.$cookies.remove('izcRole')
      this.$store.state.userProfile = {}
      this.$router.replace({ name: 'login' });
    }
  },
];
