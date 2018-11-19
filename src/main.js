import Vue from 'vue'
import App from './App.vue';
import VModal from 'vue-js-modal';
import router from "./router";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faHeart, faThumbsDown, faThumbsUp, faFire } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from "./store";


Vue.use(VModal, { dialog: true });
Vue.use(BootstrapVue);

library.add(faTimes, faHeart, faThumbsDown, faThumbsUp, faFire)
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
    router,
    store
}).$mount('#app')

initApi();
/**
 * API Initialization
 * Set the moments into the index.js store and go to the moments list page
 */

function initApi() {
    console.info("Connecting with the Mirego API");
    var request = new XMLHttpRequest();
    request.open('GET', "https://api.neverworkaday.com/organizations/mirego/moments", true);

    request.onload = function () {
        router.push("/");
        if (request.status === 200 && request.statusText === "OK") {
            console.log("API connected!");
            store.dispatch("setMoments", {
                moments: JSON.parse(request.response)
            }).then(function (response) {
                console.log(router);
                setTimeout(function () {
                    router.push("momentsList");
                }, 1000);
            }, function (error) {
                console.error("ERROR", error);
            });
        } else {
            console.error(request.status + " (" + request.statusText + ")", "Unable to connect to the API, it will try again in 10 seconds automatically");
            router.push("notConnected");
            setTimeout(function () {
                initApi();
            }, 10000);
        }
    };

    request.send();
}