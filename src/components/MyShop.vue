<template>
  <div>
    <div>
      <button
        @click="onAddArticlePage(shop.id)"
        v-if="manager.shop_id !== null"
        class="btn btn-success"
      >Add New Article</button>
      <div
        v-if="manager.shop_id == null"
        class="alert alert-warning"
        role="alert"
      >You have no Shops!</div>
      <div class="d-flex bd-highlight">
        <div class="p-2 flex-shrink-1 bd-highlight">
          <img :src="shop.photo" class="img-thumbnail" />
        </div>
        <div class="p-2 flex-fill bd-highlight">
          <h3 class="card-title">{{shop.title}}</h3>

          <h6 class="card-subtitle mb-2">Shop Manager: {{manager.first_name+' '+manager.last_name}}</h6>
         <label for="">Articles:</label>
          <div v-for="article in articles" :key="article.id">
            <div v-if="article.shop_id == shop.id">
              <img :src="article.photo.split(',')[0]" />
          <h6 class="card-subtitle mb-2">{{article.photo}}{{article.name}} {{article.price}} {{article.description}}</h6>
          </div>
          </div>
          <!-- <h6 v-if="shop.manager_id == null" class="card-subtitle mb-2">No manager assigned</h6> -->
        </div>
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
      user: "user",
      shop: "shop",
      articles: "articles",
      
    })
  },
  methods: {
    ...mapActions({
      fetchShop: "fetchShop",
      fetchManager: "fetchManager",
      fetchArticles: "fetchArticles"
    }),
    onAddArticlePage(id) {
      this.$router.push({
        name: "myShopAddArticle",
        params: { id }
      });
    }
  },
  created() {
    this.fetchManager(this.user.manager_id).then(() => {
      this.fetchShop(this.manager.shop_id);
      this.fetchArticles();
     
    });
  }
};
</script>

<style lang="scss" scoped>
</style>