<style scoped>

</style>
<template>
    <div class="content">
        <div class="container">
            <div class="card">
                <div class="card-header card-header-text card-header-success">
                    <div class="card-text">
                        <h4 class="card-title">States</h4>
                    </div>
                </div>
                <div class="card-body">
                    <action-loader class="text-center" :loading='statesLoadStatus == 1' 
                        :color="'#4caf50'"></action-loader>

                    <div class="row">
                        <div v-for="state in states" v-bind:key="state.id" class="col-md-4">
                            <div class="card">
                                <div class="card-header card-header-success">
                                    <h4 class="card-title">{{ state.name }}</h4>
                                    <p class="category">
                                        Lat: <span class="badge badge-pill badge-info">{{ state.latitude }}</span> 
                                        Lng: <span class="badge badge-pill badge-info">{{ state.longitude }}</span>
                                    </p>
                                </div>
                                <div class="card-body">
                                    <table class="table table-borderless">
                                        <tr>
                                            <td>
                                                <router-link :to="'/localGovernments/'+state.id">
                                                    Local Governments
                                                </router-link>
                                            </td>
                                            <td>{{ state.lg_count }}</td>
                                        </tr>
                                        <tr>
                                            <td>Registration Areas </td>
                                            <td>{{ state.ra_count }}</td>
                                        </tr>
                                        <tr>
                                            <td>Polling Units </td>
                                            <td>{{ state.pu_count }}</td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="card-footer">
                                    <div v-if="userLoadStatus == 2 && user != {}">
                                        <router-link class="btn btn-block btn-warning" 
                                            :to="'/states/edit/'+state.id">
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

            }
        },
        computed: {
            states() {
                return this.$store.getters.getStates;
            },
            statesLoadStatus() {
                return this.$store.getters.getStatesLoadStatus;
            },
            user() {
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            }
        },
        created() {
            this.$store.dispatch('getStates');
        },
        mounted() {

        }
    }
</script>
