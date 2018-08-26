<style>

</style>
<template>
    <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top">
        <div class="container-fluid">
          <div class="navbar-wrapper">
            <a class="navbar-brand text-capitalize" href="#pablo">
              {{ election.title + ": " + $route.name || '...loading...' }}
            </a>
          </div>
          <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
            <span class="sr-only">Toggle navigation</span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span class="navbar-toggler-icon icon-bar"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="#pablo">
                  <i class="material-icons">notifications</i> Notifications
                </a>
              </li>
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
        
      }
    },
    computed: {
      election() {
          return this.$store.getters.getElection;
      },
      electionLoadStatus() {
          return this.$store.getters.getElectionLoadStatus;
      }
    },
    mounted() {

    },
    created() {
      this.$store.dispatch('getElection', {
          id: this.$route.params.id
      });
    }
}
</script>


