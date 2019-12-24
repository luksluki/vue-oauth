import Vue from "vue";
import App from "./App.vue";
import GAuth from "vue-google-oauth2";

//client id exaditama
// Vue.use(GAuth, {
//   clientId:
//     "Client ID EXA.apps.googleusercontent.com"
// });

Vue.use(GAuth, {
  clientId:
    "768834812579-rq7d2r3ne7am7imjnajenu670ounoi01.apps.googleusercontent.com"
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
