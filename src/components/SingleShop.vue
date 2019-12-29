<template>
  <div>
    <div class="d-flex bd-highlight">
      <div class="p-2 flex-fill bd-highlight">
        <button
          @click="onAddArticlePage(shop.id)"
          v-if="manager.id == shop.manager_id && user.manager_id == manager.id"
          class="btn btn-success"
        >Add New Article</button>
        <div class="p-2 flex-shrink-1 bd-highlight">
          <img :src="shop.photo" class="img-thumbnail" />
        </div>
        <button @click="onEditPage(shop.id)" class="btn btn-info">Edit Shop</button>
        <button @click="onDelete(shop.id)" v-if="manager.id == shop.manager_id && user.manager_id == manager.id" class="btn btn-danger">Delete</button>

        <h1 class="card-title">{{shop.title}}</h1>

        <h6 class="card-subtitle mb-2">Shop Manager: {{manager.first_name+' '+manager.last_name}}</h6>
        <h6 v-if="shop.manager_id == null" class="card-subtitle mb-2">No manager assigned</h6>
        <label>Articles:</label>
        <table class="table table-bordered ">
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

        <div class="">
      <div class="row">
        <div class="col-md-8">
          <div class="page-header">
            <h3>Comments</h3>
          </div>
          <div v-for="comment in comments" :key="comment.id" class="comments-list">
            <div class="media">
              <div class="media-body">
                <h5 class="media-heading user_name">{{comment.author}}:</h5>
                <p class="media-body">{{comment.body}}</p>
                <button @click="onDelete(comment.id)" v-if="user.id == comment.author_id" class="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      </div>
    </div>

    

    <div class="">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <div class="panel panel-info">
            <div class="panel-body">
              <form @submit.prevent="onSubmit" class="form-inline">
                <textarea
                  v-model="form.body"
                  placeholder="Write your comment here!"
                  class="pb-cmnt-textarea"
                ></textarea>
                <div class="btn-group">
                  <button class="btn" type="button">
                    <span class="fa fa-picture-o fa-lg"></span>
                  </button>
                  <button class="btn" type="button">
                    <span class="fa fa-video-camera fa-lg"></span>
                  </button>
                  <button class="btn" type="button">
                    <span class="fa fa-microphone fa-lg"></span>
                  </button>
                  <button class="btn" type="button">
                    <span class="fa fa-music fa-lg"></span>
                  </button>
                </div>
                <button class="btn btn-primary pull-right" type="submit">Add Comment</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      form: { author: "", body: "", shop_id: "",author_id: "", }
    };
  },
  computed: {
    ...mapGetters({
      manager: "manager",
      shop: "shop",
      articles: "articles",
      comments: "comments",
      user: "user"
    })
  },
  methods: {
    ...mapActions({
      fetchManager: "fetchManager",
      fetchShop: "fetchShop",
      fetchArticles: "fetchArticles",
      fetchComments: "fetchComments",
      addComment: "addComment",
      deleteComment: "deleteComment"
    }),
    onAddArticlePage(id) {
      this.$router.push({
        name: "myShopAddArticle",
        params: { id }
      });
    },
    onSubmit() {
      this.form.author = this.user.first_name + " " + this.user.last_name;
      this.form.author_id = this.user.id;
      this.form.shop_id = this.shop.id;
      this.addComment(this.form);
      this.form = { author: "", body: "", shop_id: "",author_id: "", };
      this.fetchComments()
    },
    onDelete(id){
      if(confirm("Are you sure you want to delete comment?")){

        this.deleteComment(id).then(() => {

          this.fetchComments()
        })
      }
    },
    onEditPage(id) {
      this.$router.push({
        name: "shopEdit",
        params: { id }
      });
    }
  },

  created() {
    this.fetchShop(this.$route.params.id).then(
      () => this.fetchManager(this.shop.manager_id),
      this.fetchArticles(),
      this.fetchComments()
    );
  }
};
</script>

<style>
.card .card-body .message {
  padding-left: 80px;
}

.card .card-body .actions {
  margin-top: 5px;
}
.pb-cmnt-container {
  font-family: Lato;
  margin-top: 100px;
}

.pb-cmnt-textarea {
  resize: none;
  padding: 20px;
  height: 130px;
  width: 100%;
  border: 1px solid #f2f2f2;
}
</style>