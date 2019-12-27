<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Online-Shop</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link to="/" class="nav-item nav-link">Shops</router-link>
        <router-link to="/managers" class="nav-item nav-link" v-if="isUserAuthenticated">All Managers</router-link>
        <router-link to="/login" class="nav-item nav-link" v-if="!isUserAuthenticated" >Login</router-link>
        <router-link to="/register" class="nav-item nav-link" v-if="!isUserAuthenticated">Register</router-link>
        <router-link to="/my-shop" class="nav-item nav-link" v-if="isUserAuthenticated">My Shop</router-link>
        <router-link to="/shop/create" class="nav-item nav-link" v-if="isUserAuthenticated">Add Shop</router-link>
        <router-link to="/article/create" class="nav-item nav-link" v-if="isUserAuthenticated">Add Article</router-link>
      </div>
    </div>
    <button v-if="isUserAuthenticated" @click="onLogout" type="button" class="btn btn-dark btn-sm">Log out</button>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      isUserAuthenticated: "isUserAuthenticated"
    })
  },
  methods: {
    ...mapActions({
      logout: "logout"
    }),
    onLogout() {
      this.logout();
      this.$router.push({
        name: "login"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>