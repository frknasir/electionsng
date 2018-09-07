<style scoped>
    #pagination {
        position: fixed;
        top: 10%;
        right: 30px;
        z-index: 4;
    }
</style>

<template>
    <div class="container py-2 px-5">
        <!-- pagination -->
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
        
        <!-- timeline item 1 -->
        <div v-for="liveUpdate in liveUpdates" v-bind:key="liveUpdate.id" class="row no-gutters">
            <div v-if="liveUpdate.id % 2 == 0"  class="col-sm"> <!--spacer--> </div>
            <!-- timeline item 1 center dot -->
            <div v-if="liveUpdate.id % 2 == 0" class="col-sm-1 text-center flex-column d-none d-sm-flex">
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
                        <p class="card-text">
                            {{ liveUpdate.description }}
                        </p>
                        <div v-if="moment(liveUpdate.updated_at, 'DD MMM YYYY H:m:s').isValid()" class="stats small">
                            <i class="material-icons">flag</i> 
                            <span class="updated_at">Edited</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="liveUpdate.id % 2 == 1" class="col-sm-1 text-center flex-column d-none d-sm-flex">
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
            <div v-if="liveUpdate.id % 2 == 1" class="col-sm"> <!--spacer--></div>
        </div>
        <!--/row-->
    </div>
</template>

<script>
    export default {
        props: [],
        data() {
            return {
                moment: window.moment,
                location_filter: null
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
            }
        },
        watch: {
        },
        mounted() {

        },
        created() {
            this.$store.dispatch('getElectionLiveUpdates', {
                id: this.$route.params.id,
                url: null,
                limit: 10
            });
        },
        methods: {
            getLiveUpdates(url) {
                this.$store.dispatch('getElectionLiveUpdates', {
                    id: this.$route.params.id,
                    url: url,
                    limit: 10
                });
            }
        }
    }
</script>
