/*
 * @Date: 2021-12-01
 * @Description:
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import getters from "./getters";
import state from "./state";
import modules from "./modules";

export default new Vuex.Store({
  modules,
  getters,
  state,
});
