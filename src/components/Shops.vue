<template>
  <div>
    <br />
    <Search />
    <br />
    <div class="container">
      <div v-if="shops == '' " class="alert alert-warning" role="alert">There are no shops available</div>
      <div class="card">
        <div v-for="shop in shops" :key="shop.id" class="card-body">
          <img :src="shop.photo" class="float-left rounded-circle" />
          <div class="message">
            <h5 @click="SingleShopPage(shop.id)" class="card-title">Shop : {{shop.title}}</h5>
            <h6
              v-if="shop.manager_id == null "
              class="card-subtitle mb-2 text-muted"
            >NO manager assigned!</h6>
            <div v-for="manager in managers" :key="manager.id">
              <h6
                @click="SingleManagerPage(manager.id)"
                v-if="shop.manager_id == manager.id"
                class="card-subtitle mb-2 text-muted"
              >Manager : {{manager.first_name+' '+manager.last_name}}</h6>
            </div>
            <h6>{{shop.created_at}}</h6>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../components/layouts/Search";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Search
  },
  computed: {
    ...mapGetters({
      shops: "filteredShops",
      managers: "managers"
    })
  },
  methods: {
    ...mapActions({
      fetchShops: "fetchShops",
      fetchManagers: "fetchManagers"
    }),
    SingleManagerPage(id) {
      this.$router.push({
        name: "manager",
        params: { id }
      });
    },
    SingleShopPage(id) {
      this.$router.push({
        name: "shop",
        params: { id }
      });
    },
    
  },
  created() {},
  beforeRouteEnter(to, from, next) {
    next(vm => vm.fetchShops() && vm.fetchManagers());
  }
};
</script>

<style >
.card .card-body .message {
  padding-left: 80px;
}
img {
  height: 100px;
  width: 100px;
}

.card .card-body .actions {
  margin-top: 5px;
}
</style>