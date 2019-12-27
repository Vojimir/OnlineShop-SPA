<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Register</div>
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
                <label for="password" class="cols-sm-2 control-label">Password</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon"></span>
                    <div></div>
                    <input
                      v-model="form.password"
                      type="password"
                      class="form-control"
                      name="password"
                      id="password"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="password_confirmation" class="cols-sm-2 control-label">Confirm Password</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <span class="input-group-addon"></span>
                    <input
                      v-model="form.password_confirmation"
                      type="password"
                      class="form-control"
                      name="password_confirmation"
                      id="password_confirmation"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="form-check">
                <input v-model="form.checked" type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">I accept terms and conditions</label>
              </div>
                <br/>
              <div v-if="error" class="alert alert-danger" role="alert">Damn son</div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary btn-lg btn-block login-button">Register</button>
              </div>
            </form>
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
      form: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        checked: false
      }
    };
  },
  computed: {
    ...mapGetters({
      error: "errors"
    })
  },
  methods: {
    ...mapActions({
      register: "register"
    }),
    onSubmit() {
      // this.form.checked = !!this.form.checked;
      this.register(this.form).then(() => {
        if (this.error === null)
          this.$router.push({
            name: "login"
          });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>