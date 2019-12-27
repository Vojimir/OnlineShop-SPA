<template>
  <div class="container">
    <div class="row justify-content-center align-items-center" >
      <div class="col-4">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form @submit.prevent="submit">
              <div class="form-group">
                <label>Email</label>
                <input v-model="email" type="email" class="form-control" name="username" />
              </div>
              <div class="form-group">
                <label for>Password</label>
                <input v-model="password" type="password" class="form-control" name="password" />
              </div>
              <div v-if="error" class="alert alert-danger" role="alert">Invalid credentials</div>
              <button type="submit" class="btn btn-primary btn-lg btn-block login-button">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Material form login -->
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
        ...mapGetters({
            error: 'errors'
        })
    },

  methods: {
    ...mapActions({
      login: "login"
    }),
    submit() {
      this.login({
        email: this.email,
        password: this.password
      }).then(() => {
        if(this.error === null)
        this.$router.push({
          name: "home"
        });
      });
    }
  }
};
</script>
<style>
</style>