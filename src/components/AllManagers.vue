<template>
  <div>
    <br />
    <Search />
    <br />
    <!-- <button class="btn btn-success " @click="AddManagerPage">Add manager</button> -->
    

    <div class="container">
      <div class="card">
        <div v-for="manager in managers" :key="manager.id" class="card-body">
          <img :src="manager.photo" class="float-left rounded-circle" />
          <div class="message">
            <h5 class="card-title " @click="SingleManagerPage(manager.id)"
              >{{manager.first_name + ' ' + manager.last_name}}
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p
              class="card-text"
            >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
          <!-- <div class="actions">
        <a href="#" class="card-link">Like</a>
        <a href="#" class="card-link">Reply</a>
        <a href="#" class="card-link">Share</a>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../components/layouts/Search";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Search
  },
  computed: {
    ...mapGetters({
      managers: "filteredManagers"
    })
  },
  methods: {
    ...mapActions({
      fetchManagers: "fetchManagers"
    }),
    SingleManagerPage(id) {
      this.$router.push({
        name: "manager",
        params: { id }
      });
    },
    AddManagerPage() {
      this.$router.push({
        name: "addManager"
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.fetchManagers());
  }
};
</script>

<style >
.card .card-body .message {
  padding-left: 80px;
}
img {
  height: 100px;
  width: 100px;
}

.card .card-body .actions {
  margin-top: 5px;
}
</style>