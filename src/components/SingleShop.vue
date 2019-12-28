<template>
  <div>
    <div class="d-flex bd-highlight">
      <div class="p-2 flex-shrink-1 bd-highlight">
        <img :src="shop.photo" class="img-thumbnail" />
      </div>
      <div class="p-2 flex-fill bd-highlight">
        <h3 class="card-title">{{shop.title}}</h3>
        
        <h6 class="card-subtitle mb-2">Shop Manager: {{manager.first_name+' '+manager.last_name}}</h6>
        <h6 class="card-subtitle mb-2">Number of articles:</h6>
        <h6 v-if="shop.manager_id == null" class="card-subtitle mb-2">No manager assigned</h6>

      </div>
    </div>
  </div>
 
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      manager: "manager",
      shop: "shop"
    })
  },
  methods: {
    ...mapActions({
      fetchManager: "fetchManager",
      fetchShop: "fetchShop"
    })
  },
  
  created() {
    this.fetchShop(this.$route.params.id)
    .then(()=>
    this.fetchManager(this.shop.manager_id)
    )},
 
};
</script>

<style>
.card .card-body .message {
  padding-left: 80px;
}


.card .card-body .actions {
  margin-top: 5px;
}
</style>