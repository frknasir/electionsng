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

            <div v-if="userLoadStatus == 2 && user != {} && permittedToMakeChanges == true" id="action-btn">
                <router-link class="btn btn-success btn-fab btn-lg btn-round" 
                    :to="'/politicalParties/add'">
                    <i class="material-icons">add</i>
                </router-link>
            </div>

            <div class="card">
                <div class="card-header card-header-text card-header-success">
                    <div class="card-text">
                        <h4 class="card-title">
                            Political Parties
                        </h4>
                    </div>
                </div>
                <div class="card-body">
                    <action-loader class="text-center" :loading='politicalPartiesLoadStatus == 1' 
                        :color="'#4caf50'"></action-loader>

                    <div class="row">
                        <div v-for="politicalParty in politicalParties" v-bind:key="politicalParty.id" class="col-md-4">
                            <div class="card">
                                <div class="card-header card-header-success">
                                    <h4 class="card-title">{{ politicalParty.initials }}</h4>
                                </div>
                                <div class="card-body text-center">
                                    <h4>{{ politicalParty.name }}</h4>
                                </div>
                                <div class="card-footer">
                                    <div v-if="userLoadStatus == 2 && user != {} && permittedToMakeChanges == true">
                                        <router-link class="btn btn-just-icon btn-warning" 
                                            :to="'/politicalParties/edit/'+politicalParty.id">
                                            <i class="material-icons">create</i>
                                        </router-link>
                                        <button @click="deletePoliticalParty(politicalParty.id)" class="btn btn-just-icon btn-danger">
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
            politicalParties() { 
                return this.$store.getters.getPoliticalParties;
            },
            politicalPartiesLoadStatus() {
                return this.$store.getters.getPoliticalPartiesLoadStatus;
            },
            user() {
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            },
            deletePoliticalPartyLoadStatus() {
                return this.$store.getters.getDeletePoliticalPartyLoadStatus;
            },
            deletePoliticalPartyResult() {
                return this.$store.getters.getDeletePoliticalPartyResult;
            },
            registrationArea() {
                return this.$store.getters.getRegistrationArea;
            }
        },
        created() {
            this.$store.dispatch('getPoliticalParties');

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
            deletePoliticalPartyLoadStatus: function() {
                let vm = this;
                
                if(vm.deletePoliticalPartyLoadStatus == 3 && vm.deletePoliticalPartyResult.success == 0) {
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.deletePoliticalPartyResult.message, 
                        'danger'
                    );
                } else if(vm.deletePoliticalPartyLoadStatus == 2 && vm.deletePoliticalPartyResult.success == 1) {
                    //reload political Parties
                    this.$store.dispatch('getPoliticalParties');
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.deletePoliticalPartyResult.message, 
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
            deletePoliticalParty(id) {
                if(confirm('Are you sure?')) {
                    this.$store.dispatch('deletePoliticalParty', {
                        id: id
                    });
                }
            }
        }
    }
</script>
