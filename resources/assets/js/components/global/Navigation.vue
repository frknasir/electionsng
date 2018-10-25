<style>
</style>
<template>
    <nav class="navbar navbar-expand-lg navbar-absolute bg-success">
        <div class="container-fluid">
          <router-link class="btn btn-link btn-white"
              v-if="$routerHistory.hasPrevious()"
              :to="{ path: $routerHistory.previous().path }">
              <i class="material-icons">arrow_back</i>
          </router-link>
          <div v-if="electionLoadStatus != 1" class="navbar-wrapper">
            <a v-if="$route.meta.isElectionPage" class="navbar-text">
              {{ election.title }}
            </a>
            <a v-else class="navbar-text">
              {{ $route.name }}
            </a>
          </div>
          <action-loader class="text-left" :loading='electionLoadStatus == 1' 
            :color="'#ffffff'"></action-loader>
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
  import ActionLoader from 'vue-spinner/src/ClipLoader.vue';

  export default {
    components: {
      ActionLoader
    },
    data() {
      return {
        title: null 
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
      electionLoadStatus: function(val) {
        if(val == 2) {
          this.title = this.election.title.substring(0, 19) + "... ";
        }
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
