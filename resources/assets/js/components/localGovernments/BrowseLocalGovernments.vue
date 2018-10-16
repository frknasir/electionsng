<style scoped>

</style>
<template>
    <div class="content">
        <div class="container">
            <div class="card">
                <div class="card-header card-header-text card-header-success">
                    <div class="card-text">
                        <h4 class="card-title">
                            {{ state }} <br />
                            <small>
                                Local Governments
                            </small>
                        </h4>
                    </div>
                </div>
                <div class="card-body">
                    <action-loader class="text-center" :loading='localGovernmentsLoadStatus == 1' 
                        :color="'#4caf50'"></action-loader>

                    <div class="row">
                        <div v-for="localGovernment in localGovernments" v-bind:key="localGovernment.id" class="col-md-4">
                            <div class="card">
                                <div class="card-header card-header-success">
                                    <h4 class="card-title">{{ localGovernment.name }}</h4>
                                    <p class="category">
                                        Lat: <span class="badge badge-pill badge-info">{{ localGovernment.latitude }}</span> 
                                        Lng: <span class="badge badge-pill badge-info">{{ localGovernment.longitude }}</span>
                                    </p>
                                </div>
                                <div class="card-body">
                                    <table class="table table-borderless">
                                        <tr>
                                            <td>
                                                <router-link :to="'/registrationAreas/'+localGovernment.id">
                                                    Registration Areas
                                                </router-link>
                                            </td>
                                            <td>{{ localGovernment.ra_count }}</td>
                                        </tr>
                                        <tr>
                                            <td>Polling Units </td>
                                            <td>{{ localGovernment.pu_count }}</td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="card-footer">
                                    <div v-if="userLoadStatus == 2 && user != {}">
                                        <router-link class="btn btn-block btn-warning" 
                                            :to="'/localGovernments/'+localGovernment.state_id+'/edit/'+localGovernment.id">
                                            <i class="material-icons">create</i>
                                            Edit
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import ActionLoader from 'vue-spinner/src/ScaleLoader.vue';

    export default {
        components: {
            ActionLoader
        },
        data() {
            return {
                state: ''
            }
        },
        computed: {
            localGovernments() {
                return this.$store.getters.getLocalGovernments;
            },
            localGovernmentsLoadStatus() {
                return this.$store.getters.getLocalGovernmentsLoadStatus;
            },
            user() {
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            }
        },
        created() {
            this.$store.dispatch(
                'getLocalGovernments',
                {
                    id: this.$route.params.stateId
                }
            );
        },
        mounted() {

        },
        watch: {
            localGovernmentsLoadStatus: function(val) {
                if(val == 2) {
                    this.state = this.localGovernments[0].state_name;
                }
            }
        }
    }
</script>
