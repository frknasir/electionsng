<style scoped>
    /*#pagination {
        position: fixed;
        top: 10%;
        right: 30px;
        z-index: 4;
    }*/
</style>

<template>
    <div class="container py-2 px-5">
        <!-- pagination -->
        <div class="col-md-6 mr-auto ml-auto">
            <div id="pagination">
                <div class="card">
                    <div class="card-body text-center">
                        <button @click="getLiveUpdates(luPagination.prev_page_url)" class="btn btn-just-icon" v-bind:class="[{disabled: !luPagination.prev_page_url}]">
                            <i class="material-icons">chevron_left</i>
                        </button>
                        <label>
                            showing to {{ luPagination.to }} of {{ luPagination.total }} updates
                        </label>
                        <button @click="getLiveUpdates(luPagination.next_page_url)" class="btn btn-just-icon" v-bind:class="[{disabled: !luPagination.next_page_url}]">
                            <i class="material-icons">chevron_right</i>                        
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Loader -->
        <action-loader class="text-center" :loading='liveUpdatesLoadStatus == 1' 
            :color="'#4caf50'"></action-loader>
        
        <!-- timeline item 1 -->
        <div v-for="(liveUpdate, index) in liveUpdates" v-bind:key="liveUpdate.id" class="row no-gutters">
            <div v-if="index % 2 == 0"  class="col-sm"> <!--spacer--> </div>
            <!-- timeline item 1 center dot -->
            <div v-if="index % 2 == 0" class="col-sm-1 text-center flex-column d-none d-sm-flex">
                <div class="row h-50">
                    <div class="col">&nbsp;</div>
                    <div class="col">&nbsp;</div>
                </div>
                <h5 class="m-2">
                    <span class="badge badge-pill bg-light border">&nbsp;</span>
                </h5>
                <div class="row h-50">
                    <div class="col border-right">&nbsp;</div>
                    <div class="col">&nbsp;</div>
                </div>
            </div>
            <!-- timeline item 1 event content -->
            <div class="col-sm py-2">
                <div class="card">
                    <div class="card-body">
                        <div class="float-right text-muted small">
                            {{ moment(liveUpdate.created_at, 'DD MMM YYYY H:m:s').format('lll') }}
                        </div>
                        <h4 class="card-title text-muted">
                            {{ liveUpdate.title }} <br />
                            <small>
                                {{ 
                                    liveUpdate.location_type + ": " +
                                    (
                                        liveUpdate.location.name || liveUpdate.location.code
                                    ) 
                                }}
                            </small>
                        </h4>
                        <div v-html="liveUpdate.description" class="card-text"></div>
                        <div v-if="moment(liveUpdate.updated_at, 'DD MMM YYYY H:m:s').isValid()" class="stats small">
                            <i class="material-icons">flag</i> 
                            <span class="updated_at">Edited</span>
                        </div>
                        <div v-if="userLoadStatus == 2 && user != {} && permittedToMakeChanges == true">
                            <router-link class="btn btn-sm btn-just-icon btn-warning" 
                                :to="'/election/'+election.id+'/liveUpdates/edit/'+liveUpdate.id">
                                <i class="material-icons">create</i>
                            </router-link>
                            <button @click="deleteLiveUpdate(liveUpdate.id)" class="btn btn-sm btn-just-icon btn-danger">
                                <i class="material-icons">clear</i>
                            </button>
                        </div>
                    </div> 
                </div>
            </div>
            <div v-if="index % 2 == 1" class="col-sm-1 text-center flex-column d-none d-sm-flex">
                <div class="row h-50">
                    <div class="col border-right">&nbsp;</div>
                    <div class="col">&nbsp;</div>
                </div>
                <h5 class="m-2">
                    <span class="badge badge-pill bg-success">&nbsp;</span>
                </h5>
                <div class="row h-50">
                    <div class="col border-right">&nbsp;</div>
                    <div class="col">&nbsp;</div>
                </div>
            </div>
            <div v-if="index % 2 == 1" class="col-sm"> <!--spacer--></div>
        </div>
        <!--/row-->
        <!-- pagination -->
        <div class="col-md-6 mr-auto ml-auto">
            <div id="pagination">
                <div class="card">
                    <div class="card-body text-center">
                        <button @click="getLiveUpdates(luPagination.prev_page_url)" class="btn btn-just-icon" v-bind:class="[{disabled: !luPagination.prev_page_url}]">
                            <i class="material-icons">chevron_left</i>
                        </button>
                        <label>
                            showing to {{ luPagination.to }} of {{ luPagination.total }} updates
                        </label>
                        <button @click="getLiveUpdates(luPagination.next_page_url)" class="btn btn-just-icon" v-bind:class="[{disabled: !luPagination.next_page_url}]">
                            <i class="material-icons">chevron_right</i>                        
                        </button>
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
                moment: window.moment,
                location_filter: null,
                HF: HELPERS,
                permittedToMakeChanges: false
            }
        },
        computed: {
            election() {
                return this.$store.getters.getElection;
            },
            electionLoadStatus() {
                return this.$store.getters.getElectionLoadStatus;
            },
            liveUpdates() {
                return this.$store.getters.getLiveUpdates;
            },
            liveUpdatesLoadStatus() {
                return this.$store.getters.getLiveUpdatesLoadStatus;
            },
            luPagination() {
                return this.$store.getters.getLUPagination;
            },
            deleteLiveUpdateLoadStatus() {
                return this.$store.getters.getDeleteLiveUpdateLoadStatus;
            },
            deleteLiveUpdateResult() {
                return this.$store.getters.getDeleteLiveUpdateResult;
            },
            user() {
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            }
        },
        watch: {
            deleteLiveUpdateLoadStatus: function() {
                let vm = this; 
                
                if(vm.deleteLiveUpdateLoadStatus == 3 && vm.deleteLiveUpdateResult.success == 0) {
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.deleteLiveUpdateResult.message, 
                        'danger'
                    );
                } else if(vm.deleteLiveUpdateLoadStatus == 2 && vm.deleteLiveUpdateResult.success == 1) {
                    //reload updates
                    this.$store.dispatch('getElectionLiveUpdates', {
                        id: this.$route.params.id,
                        url: null,
                        limit: 10
                    });
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.deleteLiveUpdateResult.message, 
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
        mounted() {

        },
        created() {
            this.$store.dispatch('getElectionLiveUpdates', {
                id: this.$route.params.id,
                url: null,
                limit: 10
            });

            if(this.userLoadStatus == 2) {
                this.permittedToMakeChanges = this.HF.authorise(
                    this.user.roles, 
                    this.$route.meta.permittedToMakeChanges
                );
            }
        },
        methods: {
            getLiveUpdates(url) {
                this.$store.dispatch('getElectionLiveUpdates', {
                    id: this.$route.params.id,
                    url: url,
                    limit: 10
                });
            },
            deleteLiveUpdate(data) {
                if(confirm("are you sure?")){
                    this.$store.dispatch('deleteLiveUpdate', {
                        id: data
                    });
                }
            }
        }
    }
</script>
