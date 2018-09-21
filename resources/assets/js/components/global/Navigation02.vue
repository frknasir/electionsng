<style>
</style>
<template>
    <nav class="navbar navbar-expand-lg navbar-absolute navbar-light">
        <div class="container-fluid">
          <router-link class="btn btn-link"
              v-if="$routerHistory.hasPrevious()"
              :to="{ path: $routerHistory.previous().path }">
              <i class="material-icons">arrow_back</i>
          </router-link>
          <div class="navbar-wrapper">
            <a class="navbar-brand text-capitalize" href="#pablo">
              {{ title + ": " + $route.name }}
            </a>
          </div>
          <button class="navbar-toggler" type="button" 
            data-toggle="collapse" data-target="#navbar_nav" aria-controls="navbar_nav" 
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="sr-only">Toggle navigation</span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span class="navbar-toggler-icon icon-bar"></span>
          </button>
          <div id="navbar_nav" class="collapse navbar-collapse justify-content-end">
            <ul class="navbar-nav">
              
              <!-- your navbar here -->
            </ul>
          </div>
        </div>
    </nav>
</template>
<script>
export default {
  data() {
    return {
      title: "...loading"
    };
  },
  computed: {
    election() {
      return this.$store.getters.getElection;
    },
    electionLoadStatus() {
      return this.$store.getters.getElectionLoadStatus;
    }
  },
  watch: {
    election: function() {
      this.title = this.election.title.substring(0, 19) + "... ";
    }
  },
  mounted() {},
  created() {
    this.$store.dispatch("getElection", {
      id: this.$route.params.id
    });
  }
};
</script> 
