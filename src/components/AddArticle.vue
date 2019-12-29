<template>
  <div class="container">
   
    <div v-if="user.manager.id == shop.manager_id && user.manager_id == user.manager.id">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Add New Article</div>
          <div class="card-body">
            <form class="form-horizontal" @submit.prevent="onSubmit">
              <div class="form-group">
                <label class="cols-sm-2 control-label">Name</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon"></span>
                    <input
                      v-model="form.name"
                      type="text"
                      class="form-control"
                      name="first_name"
                      id="first_name"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="cols-sm-2 control-label">Price</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon"></span>
                    <input
                      v-model="form.price"
                      type="number"
                      class="form-control"
                      name="last_name"
                      id="last_name"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="cols-sm-2 control-label">Description</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon"></span>
                    <input
                      v-model="form.description"
                      type="text"
                      class="form-control"
                      name="email"
                      id="email"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="url" class="cols-sm-2 control-label">Photo Url</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon"></span>
                    <div v-for="(image, index) in images" :key="index" class="input-group">
                    
                    <input
                      v-model="image.value"
                      type="url"
                      class="form-control"
                      name="url"
                      id="url"
                      required
                    />
                    
                  <button
                    class="btn btn-danger my-4 btn-block"
                    type="button"
                    @click="onDelete(index)"
                  >Delete image</button>
                    </div>
                  </div>
                  <button
                    class="btn btn-info my-4 btn-block"
                    type="button"
                    @click="onAddAnotherPhoto"
                  >Add image</button>
                </div>
              </div>

              <!-- <div v-if="error" class="alert alert-danger" role="alert">Damn son</div> -->
              <div class="form-group">
                <button type="submit" class="btn btn-success btn-lg btn-block login-button">Submit</button>
                <button
                  @click="cancel"
                  type="submit"
                  class="btn btn-danger btn-lg btn-block login-button"
                >Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="alert alert-warning" v-else >You dont own any shops!</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: { name: "", price: "", description: "", photo: "" ,shop_id: ""},
      images: [{ value: "" }]
    };
  },
  computed: {
    ...mapGetters({
        user: "user",
        manager: "manager",
        shop: "shop",
    }),
    shopId () {
      //ako nema !this.$route.params.id onda mi daj ?code a ako ima daj mi :code
      return !this.$route.params.id ? this.manager.shop_id : this.$route.params.id
      
      
    }
  },
  methods: {
    ...mapActions({
      addArticle: "addArticle",
      fetchShop: "fetchShop",
      fetchManager: "fetchManager"
      
    }),
    onSubmit() {
      this.images.forEach(img => {
        this.form.photo += !this.form.photo ? img.value : `,${img.value}`;
      });
      
      this.form.shop_id = this.shopId
      this.addArticle(this.form).then(() => {
        this.$router.push({
          name: "home"
        });
      });
    },
    cancel() {
      this.$router.push({
        name: "home"
      });
    },
    onAddAnotherPhoto() {
      this.images.push({ value: "" });
    },
    onDelete(index) {
      this.images.splice(index, 1);
    }
  },
    created() {   
    
    this.fetchManager(this.user.manager_id).then(()=>{
      this.fetchShop(this.manager.shop_id);
      
    })
  }
};
</script>

<style>
</style>