<template>
  <div>
    <br />
    <Search />
    <br />
    <div class="container">
      <div class="card">
        <div v-for="shop in shops" :key="shop.id" class="card-body">
          <img :src="shop.photo" class="float-left rounded-circle" />
          <div class="message">
            <h5 class="card-title">{{shop.title}}</h5>
            <div v-for="manager in managers" :key="manager.id">
            <h6 v-if="shop.manager_id == manager.id" class="card-subtitle mb-2 text-muted">{{manager.first_name+' '+manager.last_name}}</h6>
            <h6 v-else-if="shop.manager_id == null " class="card-subtitle mb-2 text-muted">NO manager assigned!</h6>
            </div>
            <p
              class="card-text"
            >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
    })
    
  },
  created(){


  },
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