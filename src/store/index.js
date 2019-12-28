import Vue from 'vue'
import Vuex from 'vuex'



import { AuthStore } from './AuthStore'
import { ManagerStore } from './ManagerStore'
import { ShopStore } from './ShopStore'
import { ArticleStore } from './ArticleStore'

Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
 modules: {
  AuthStore,
  ShopStore,
  ManagerStore,
  ArticleStore,
 }
});
  

export default store