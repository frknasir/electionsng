<style scoped>
    #action-btn {
        position: relative;
        right: 20px;
        z-index: 4;
    }

    #action-btn .btn {
        position: fixed;
        right: 30px;
        bottom: 10%;
    }
</style>
<template>
    <div class="content">
        <div class="container">

            <div v-if="userLoadStatus == 2 && user != {}" id="action-btn">
                <router-link class="btn btn-success btn-fab btn-lg btn-round" 
                    :to="'/registrationAreas/'+$route.params.localGovernmentId+'/add'">
                    <i class="material-icons">add</i>
                </router-link>
            </div>

            <div class="card">
                <div class="card-header card-header-text card-header-success">
                    <div class="card-text">
                        <h4 class="card-title">
                            {{ localGovernment.name }} <br />
                            <small>
                                Registration Areas
                            </small>
                        </h4>
                    </div>
                </div>
                <div class="card-body">
                    <action-loader class="text-center" :loading='registrationAreasLoadStatus == 1' 
                        :color="'#4caf50'"></action-loader>
                    <div class="row">
                        <div v-for="registrationArea in registrationAreas" v-bind:key="registrationArea.id" class="col-md-4">
                            <div class="card">
                                <div class="card-header card-header-success">
                                    <h4 class="card-title">{{ registrationArea.name }}</h4>
                                    <p class="category">
                                        Lat: <span class="badge badge-pill badge-info">{{ registrationArea.latitude }}</span> 
                                        Lng: <span class="badge badge-pill badge-info">{{ registrationArea.longitude }}</span>
                                    </p>
                                </div>
                                <div class="card-body">
                                    <table class="table table-borderless">
                                        <td>
                                            <router-link :to="'/pollingUnits/'+registrationArea.id">
                                                Polling Units
                                            </router-link>
                                        </td>
                                        <td>{{ registrationArea.pu_count }}</td>
                                    </table>
                                </div>
                                <div class="card-footer">
                                    <div v-if="userLoadStatus == 2 && user != {} && permittedToMakeChanges == true">
                                        <router-link class="btn btn-just-icon btn-warning" 
                                            :to="'/registrationAreas/'+registrationArea.local_government_id+'/edit/'+registrationArea.id">
                                            <i class="material-icons">create</i>
                                        </router-link>
                                        <button @click="deleteRegistrationArea(registrationArea.id)" 
                                            class="btn btn-just-icon btn-danger">
                                            <i class="material-icons">cancel</i>
                                        </button>
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
    import { HELPERS } from '../../helpers.js';
    import ActionLoader from 'vue-spinner/src/ScaleLoader.vue';

    export default {
        components: {
            ActionLoader
        },
        data() {
            return {
                HF: HELPERS,
                permittedToMakeChanges: false
            }
        },
        computed: {
            registrationAreas() {
                return this.$store.getters.getRegistrationAreas;
            },
            registrationAreasLoadStatus() {
                return this.$store.getters.getRegistrationAreasLoadStatus;
            },
            user() {
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            },
            localGovernment() {
                return this.$store.getters.getLocalGovernment;
            },
            localGovernmentLoadStatus() {
                return this.$store.getters.getLocalGovernmentLoadStatus;
            },
            deleteRegistrationAreaLoadStatus() {
                return this.$store.getters.getDeleteRegistrationAreaLoadStatus;
            },
            deleteRegistrationAreaResult() {
                return this.$store.getters.getDeleteRegistrationAreaResult;
            }
        },
        created() {
            this.$store.dispatch('getRegistrationAreas',{
                    id: this.$route.params.localGovernmentId
                }
            );

            this.$store.dispatch('getLocalGovernment', {
                id: this.$route.params.localGovernmentId
            });

            if(this.userLoadStatus == 2) {
                this.permittedToMakeChanges = this.HF.authorise(
                    this.user.roles, 
                    this.$route.meta.permittedToMakeChanges
                );
            }
        },
        mounted() {

        },
        watch: {
            registrationAreasLoadStatus: function(val) {
                if(val == 2) {
                    
                }
            },
            deleteRegistrationAreaLoadStatus: function() {
                let vm = this;
                
                if(vm.deleteRegistrationAreaLoadStatus == 3 && vm.deleteRegistrationAreaResult.success == 0) {
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.deleteRegistrationAreaResult.message, 
                        'danger'
                    );
                } else if(vm.deleteRegistrationAreaLoadStatus == 2 && vm.deleteRegistrationAreaResult.success == 1) {
                    //reload registration areas
                    this.$store.dispatch('getRegistrationAreas', {
                            id: this.$route.params.localGovernmentId
                        }
                    );
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.deleteRegistrationAreaResult.message, 
                        'success'
                    );
                } 
            },
            userLoadStatus: function(val) {
                if(val == 2) {
                    this.permittedToMakeChanges = this.HF.authorise(
                        this.user.roles, 
                        this.$route.meta.permittedToMakeChanges
                    );
                }
            }
        },
        methods: {
            deleteRegistrationArea(id) {
                if(confirm('Are you sure?')) {
                    this.$store.dispatch('deleteRegistrationArea', {
                        id: id
                    });
                }
            }
        }
    }
</script>
