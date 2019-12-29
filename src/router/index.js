import Vue from 'vue'
import VueRouter from 'vue-router'

import Shops from '.././components/Shops'
import Login from '.././components/Login'
import Register from '.././components/Register'
import AllManagers from '.././components/AllManagers'
import AddManager from '.././components/AddManager'
import SingleManager from '.././components/SingleManager'
import SingleShop from '.././components/SingleShop'
import MyShop from '.././components/MyShop'
import AddShop from '.././components/AddShop'
import AddArticle from '.././components/AddArticle'
import ShopEdit from '.././components/ShopEdit'

import store from '.././store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Shops,
    meta: {
      guest: true
    }
  },
  {
    path: '/shops/:id',
    name: 'shop',
    component: SingleShop,
    meta: {
      guest: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: '/managers',
    name: 'managers',
    component: AllManagers,
    meta: {
      guest: false
    }
  },
  {
    path: '/managers/create',
    name: 'addManager',
    component: AddManager,
    meta: {
      guest: false
    }
  },
  {
    path: '/managers/:id',
    name: 'manager',
    component: SingleManager,
    meta: {
      guest: false
    }
  },
  {
    path: '/my-shop',
    name: 'my-shop',
    component: MyShop,
    meta: {
      guest: false
    }
  },
  {
    path: '/shop/create',
    name: 'add-shop',
    component: AddShop,
    meta: {
      guest: false
    }
  },
  {
    path: '/article/create',
    name: 'add-article',
    component: AddArticle,
    meta: {
      guest: false
    }
  },
  {
    path: '/shop/:id/article/create',
    name: 'myShopAddArticle',
    component: AddArticle,
    meta: {
      guest: false
    }
  },
    {
      path: '/shops/:id/edit',
      name: 'shopEdit',
      component: ShopEdit,
      meta: {
        guest: false
      }
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isUserLoggedIn = store.getters.isUserAuthenticated
  if (!to.meta.guest && !isUserLoggedIn) {
    next({
      name: 'login',
      path: '/login'
    })
  }
  return next()
})

export default router
