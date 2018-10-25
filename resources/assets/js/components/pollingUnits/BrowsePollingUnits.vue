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
                    :to="'/pollingUnits/'+$route.params.registrationId+'/add'">
                    <i class="material-icons">add</i>
                </router-link>
            </div>

            <div class="card">
                <div class="card-header card-header-text card-header-success">
                    <div class="card-text">
                        <h4 class="card-title">
                            {{ registrationArea.name }} <br />
                            <small>
                                Polling Units
                            </small>
                        </h4>
                    </div>
                </div>
                <div class="card-body">
                    <action-loader class="text-center" :loading='pollingUnitsLoadStatus == 1' 
                        :color="'#4caf50'"></action-loader>

                    <div class="row">
                        <div v-for="pollingUnit in pollingUnits" v-bind:key="pollingUnit.id" class="col-md-4">
                            <div class="card">
                                <div class="card-header card-header-success">
                                    <h4 class="card-title">{{ pollingUnit.code }}</h4>
                                    <p class="category">
                                        Lat: <span class="badge badge-pill badge-info">{{ pollingUnit.latitude }}</span> 
                                        Lng: <span class="badge badge-pill badge-info">{{ pollingUnit.longitude }}</span>
                                    </p>
                                </div>
                                <div class="card-body">
                                    <p>
                                        {{ pollingUnit.description }}
                                    </p>
                                </div>
                                <div class="card-footer">
                                    <div v-if="userLoadStatus == 2 && user != {} && permittedToMakeChanges == true">
                                        <router-link class="btn btn-just-icon btn-warning" 
                                            :to="'/pollingUnits/'+pollingUnit.registration_area_id+'/edit/'+pollingUnit.id">
                                            <i class="material-icons">create</i>
                                        </router-link>
                                        <button @click="deletePollingUnit(pollingUnit.id)" class="btn btn-just-icon btn-danger">
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
            pollingUnits() {
                return this.$store.getters.getPollingUnits;
            },
            pollingUnitsLoadStatus() {
                return this.$store.getters.getPollingUnitsLoadStatus;
            },
            user() {
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            },
            deletePollingUnitLoadStatus() {
                return this.$store.getters.getDeletePollingUnitLoadStatus;
            },
            deletePollingUnitResult() {
                return this.$store.getters.getDeletePollingUnitResult;
            },
            registrationArea() {
                return this.$store.getters.getRegistrationArea;
            }
        },
        created() {
            this.$store.dispatch(
                'getPollingUnits', {
                    id: this.$route.params.registrationId
                }
            );

            this.$store.dispatch('getRegistrationArea',{
                    id: this.$route.params.registrationId
                }
            );

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
            deletePollingUnitLoadStatus: function() {
                let vm = this;
                
                if(vm.deletePollingUnitLoadStatus == 3 && vm.deletePollingUnitResult.success == 0) {
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.deletePollingUnitResult.message, 
                        'danger'
                    );
                } else if(vm.deletePollingUnitLoadStatus == 2 && vm.deletePollingUnitResult.success == 1) {
                    //reload polling Units
                    this.$store.dispatch(
                        'getPollingUnits', {
                            id: this.$route.params.registrationId
                        }
                    );
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.deletePollingUnitResult.message, 
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
            deletePollingUnit(id) {
                if(confirm('Are you sure?')) {
                    this.$store.dispatch('deletePollingUnit', {
                        id: id
                    });
                }
            }
        }
    }
</script>
