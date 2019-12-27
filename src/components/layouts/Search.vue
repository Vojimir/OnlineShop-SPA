<template>
  <form class="form-inline mt-2 mt-md-0 justify-content-center">
    <input
      class="form-control mr-sm-2"
      type="text"
      placeholder="Search"
      aria-label="Search"
      @input="setSearchTerm({term :$event.target.value})"
    />
    
  </form>
</template>

<script>
import {mapMutations} from 'vuex' 
export default {
  name: "Search",
  // data() {
  //   return {
  //     search: ''
  //   }
  // },
  methods: {
    ...mapMutations({
      setSearchTerm: "setSearchTerm"
    })
  }
};
</script>