import Vue from 'vue'
import Vuex from 'vuex'



import { AuthStore } from './AuthStore'
import { ManagerStore } from './ManagerStore'
import { ShopStore } from './ShopStore'
import { ArticleStore } from './ArticleStore'
import { CommentStore } from './CommentStore'

Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
 modules: {
  AuthStore,
  ShopStore,
  ManagerStore,
  ArticleStore,
  CommentStore,
 }
});
  

export default store