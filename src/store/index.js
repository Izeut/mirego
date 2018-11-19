import Vue from 'vue';
import Vuex from 'vuex';
import _ from "lodash";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    $moments: {}
  },
  mutations: {
    /**
     * Set the moments in vuex, add the "like" option
     * @param moments {Array} : All the moments from the api
     */
    setMoments: function setMoments(state, payload) {
      _.each(payload.moments, function (moment) {
        moment.like = null;
        state.$moments[moment.id] = moment;
      });
    },

    /**
     * Set the moment like
     * @param data {Object}
     *        - id {String} : The moment ID
     *        - status {Boolean} : The like status decided by the user
     */
    setMomentLike: function setMomentLike(state, payload) {
      var moment = state.$moments[payload.id];
      moment.like = payload.status;
      Vue.set(state.$moments, payload.id, moment);
    }
  },
  getters: {
    /**
     * Get all the moments in store
     * @param state
     * @returns {state.$moments|{}}
     */
    getMoments: function getMoments(state) {
      return state.$moments;
    }
  },
  actions: {
    setMoments: function setMoments(context, payload) {
      return new Promise(function (resolve, reject) {
        if (!_.has(payload, "moments")) {
          reject("Moments missing");
        }

        if (_.size(payload.moments) === 0) {
          reject("No moments received");
        }

        context.commit("setMoments", payload);
        resolve();
      });
    },

    /**
     * Check if the data is correct and if moment exists if user wants to like/dislike one
     * @param context
     * @param payload {Object}
     * @returns {Promise}
     */
    setMomentLike: function setMomentLike(context, payload) {
      return new Promise(function (resolve, reject) {
        if (!_.has(payload, "id") || payload.id === "") {
          reject("Id missing");
        }

        if (!_.isString(payload.id)) {
          reject("Invalid id");
        }

        if (!_.has(payload, "status")) {
          reject("Status missing");
        }

        if (!_.isBoolean(payload.status)) {
          reject("Invalid status");
        }

        if (!_.has(context.state.$moments, payload.id)) {
          reject("Moment not found");
        }

        context.commit("setMomentLike", payload);
        resolve();
      });
    }
  }
})
