<template>
    <div>
      
            <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Add New Shop</div>
          <div class="card-body">
            <form class="form-horizontal" @submit.prevent="onSubmit">
              <div class="form-group">
                <label for="first_name" class="cols-sm-2 control-label">Shop Name</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon"></span>
                    <input
                      v-model="form.title"
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
                <label for="url" class="cols-sm-2 control-label">Photo Url</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon"></span>
                    <div></div>
                    <input
                      v-model="form.photo"
                      type="url"
                      class="form-control"
                      name="photo"
                      id="photo"
                      required
                    />
                  </div>
                </div>
              </div>
              <label  class="cols-sm-2 control-label">Select Manager</label>
              <select v-model="form.manager_id" class="form-control">
                <option></option>
                <option
                  v-for="manager in managers"
                  :key="manager.id"
                  v-bind:value="manager.id"
                  v-show="manager.shop_id === null"
                >{{ manager.first_name+ ' ' +manager.last_name }}</option>
              </select>

              <br />
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
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      form: { title: "", photo: "", manager_id: "" }
    };
  },
  computed: {
    ...mapGetters({
    //   errors: "shopErrors",
      managers: "managers",
        shop : "shop"
    })
  },
  methods: {
    ...mapActions({
      fetchManagers: "fetchManagers",
      editShop: "editShop",
      fetchShop: "fetchShop",
    }),
    onSubmit() {
      this.editShop(this.form).then(() => {
        this.$router.push({
          name: "home"
        });
      });
    },
    cancel() {
      this.$router.push({
        name: "home"
      });
    }
  },
  created() {
    this.fetchShop(this.$route.params.id).then(() =>{
        
        this.form = this.shop;
        this.fetchManagers()
    })
  }
};
</script>

<style lang="scss" scoped>

</style>