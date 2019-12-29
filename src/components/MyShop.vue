<template>
  <div>
    <div v-if="manager.shop_id !== null">
      <div class="d-flex bd-highlight">
        <div class="p-2 flex-fill bd-highlight">
          <button
            @click="onAddArticlePage(shop.id)"
            v-if="manager.shop_id !== null"
            class="btn btn-success"
          >Add New Article</button>

          <div class="p-2 flex-shrink-1 bd-highlight">
            <img :src="shop.photo" class="img-thumbnail" />
          </div>
          <button @click="onEditPage(shop.id)" class="btn btn-info">Edit Shop</button>
          <button
          @click="onDeleteShop(shop.id)"
          v-if="manager.id == shop.manager_id && user.manager_id == manager.id"
          class="btn btn-danger"
        >Delete</button>
          <div class="p-2 flex-fill bd-highlight">
            <h3 class="card-title">{{shop.title}}</h3>

            <h6
              class="card-subtitle mb-2"
            >Shop Manager: {{manager.first_name+' '+manager.last_name}}</h6>
            <label for>Articles:</label>

            <table class="table table-bordered">
              <thead class="bg-warning">
                <tr>
                  <th scope="col">Photo</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody v-for="article in articles" :key="article.id">
                <tr v-if="article.shop_id == shop.id">
                  <th>
                    <img :src="article.photo.split(',')[0]" />
                  </th>
                  <td>{{article.name}}</td>
                  <td>{{article.price}}</td>
                  <td>{{article.description}}</td>
                </tr>
              </tbody>
            </table>

            <!-- <div v-for="article in articles" :key="article.id">
            <div v-if="article.shop_id == shop.id">
              <img :src="article.photo.split(',')[0]" />
          <h6 class="card-subtitle mb-2">{{article.photo}}{{article.name}} {{article.price}} {{article.description}}</h6>
          </div>
            </div>-->
            <!-- <h6 v-if="shop.manager_id == null" class="card-subtitle mb-2">No manager assigned</h6> -->
          </div>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-warning" role="alert">You have no Shops!</div>
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
      articles: "articles"
    })
  },
  methods: {
    ...mapActions({
      fetchShop: "fetchShop",
      fetchManager: "fetchManager",
      fetchArticles: "fetchArticles",
      deleteShop: "deleteShop",
    }),
    onAddArticlePage(id) {
      this.$router.push({
        name: "myShopAddArticle",
        params: { id }
      });
    },
    onEditPage(id) {
      this.$router.push({
        name: "shopEdit",
        params: { id }
      });
    },
    onDeleteShop(id) {
    if (confirm("Are you sure you want to delete shop?")) {
      this.deleteShop(id)
      .then(() => {
        this.$router.push({
        name: "home",
        
      });
      });
    }
  },
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