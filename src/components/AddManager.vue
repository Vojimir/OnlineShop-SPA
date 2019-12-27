<template>
      <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Add New Manager</div>
          <div class="card-body">
            <form class="form-horizontal" @submit.prevent="onSubmit">
              <div class="form-group">
                <label for="first_name" class="cols-sm-2 control-label">First Name</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon"></span>
                    <input
                      v-model="form.first_name"
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
                <label for="last_name" class="cols-sm-2 control-label">Last Name</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon"></span>
                    <input
                      v-model="form.last_name"
                      type="text"
                      class="form-control"
                      name="last_name"
                      id="last_name"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="email" class="cols-sm-2 control-label">Your Email</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon"></span>
                    <input
                      v-model="form.email"
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
                    <div></div>
                    <input
                      v-model="form.photo"
                      type="url"
                      class="form-control"
                      name="password"
                      id="password"
                      required
                    />
                  </div>
                </div>
              </div>
              <label  class="cols-sm-2 control-label">Select Shop</label>
              <select v-model="form.shop_id" class="form-control">
                <option></option>
                <option
                  v-for="shop in shops"
                  :key="shop.id"
                  v-bind:value="shop.id"
                  v-show="shop.manager_id === null"
                >{{ shop.title }}</option>
              </select>
           
                <br/>
              <!-- <div v-if="error" class="alert alert-danger" role="alert">Damn son</div> -->
              <div class="form-group">
                <button type="submit" class="btn btn-success btn-lg btn-block login-button">Submit</button>
                <button @click="cancel" type="submit" class="btn btn-danger btn-lg btn-block login-button">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
              
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    data() {
        return {
            form: {first_name: '', last_name: '', email: '', photo: '', shop_id:''}
        }
    },
    computed: {
        ...mapGetters({
            errors: 'managerErrors',
            manager: 'manager',
            shops: 'shops'
        })
    },
    methods: {
        ...mapActions({
          fetchShops: 'fetchShops',
          addManager: 'addManager',
        }),
        onSubmit() {
          
            this.addManager(this.form)
            .then(() => {this.$router.push({
                name: 'managers'
            })})
        },
        cancel() {
        this.$router.push({
        name: 'managers'
      });
        }
    },
    beforeRouteEnter(to, from, next) {
    next(vm => vm.fetchShops());
  }
}
</script>

<style>
</style>