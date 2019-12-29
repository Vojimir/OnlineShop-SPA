<template>
  <div>
    <br />
    <Search />
    <br />
    <!-- <button class="btn btn-success " @click="AddManagerPage">Add manager</button> -->

    <div class="container">
      <div class="card">
        <div v-for="manager in managers" :key="manager.id" class="card-body">
          <img :src="manager.photo" class="float-left rounded-circle" />
          <div class="message">
            <h5
              class="card-title"
              @click="SingleManagerPage(manager.id)"
            >Name : {{manager.first_name + ' ' + manager.last_name}}</h5>
            <div v-for="shop in shops" :key="shop.id">
              <h6
                v-if="manager.id == shop.manager_id"
                class="card-subtitle mb-2 text-muted"
              >Shop : {{shop.title}}</h6>
            </div>
            <h6 v-if="manager.shop_id == null">Manager is available</h6>
          </div>
          <!-- <div class="actions">
        <a href="#" class="card-link">Like</a>
        <a href="#" class="card-link">Reply</a>
        <a href="#" class="card-link">Share</a>
          </div>-->
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
      managers: "filteredManagers",
      shops: "shops"
    })
  },
  methods: {
    ...mapActions({
      fetchManagers: "fetchManagers",
      fetchShops: "fetchShops"
    }),
    SingleManagerPage(id) {
      this.$router.push({
        name: "manager",
        params: { id }
      });
    },
    AddManagerPage() {
      this.$router.push({
        name: "addManager"
      });
    }
  },
  created() {
    this.fetchManagers().then(() => {
      this.fetchShops();
    });
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