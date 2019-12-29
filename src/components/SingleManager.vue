<template>
  <div>
    <div class="d-flex bd-highlight">
      <div class="p-2 flex-shrink-1 bd-highlight">
        <img :src="manager.photo" class="img-thumbnail" />
      </div>
      <div class="p-2 flex-fill bd-highlight">
        <h3 class="card-title">{{manager.first_name + ' ' + manager.last_name}}</h3>
        <h4 class="card-subtitle mb-2 text-muted">{{manager.email}}</h4>
        <h6 class="card-subtitle mb-2">Shop name: {{shop.title}}</h6>
        <h6 class="card-subtitle mb-2">Number of articles in shop:{{counter}}</h6>
        <h6 v-if="manager.shop_id == null" class="card-subtitle mb-2">Manager is available</h6>

      </div>
    </div>
  </div>
 
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      counter : 0
    }
  },
  computed: {
    ...mapGetters({
      manager: "manager",
      shop: "shop",
      articles: "articles",
    })
  },
  methods: {
    ...mapActions({
      fetchManager: "fetchManager",
      fetchShop: "fetchShop",
      fetchArticles: "fetchArticles"
    })
  },
  
  created() {
    this.fetchManager(this.$route.params.id)
    .then(()=>
    this.fetchShop(this.manager.shop_id),
    this.fetchArticles(),
    this.articles.forEach(article => {
      if (article.shop_id == this.shop.id) {
        this.counter++
      }
    })
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