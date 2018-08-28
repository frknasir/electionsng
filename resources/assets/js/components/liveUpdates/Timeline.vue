<style scoped>
    
</style>

<template>
    <div class="container py-2 px-5">
        <!-- pagination -->
        <div id="pagination" class="mt-2 text-center">
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
        <!-- timeline item 2 -->
        <!--<div class="row no-gutters">
            <div class="col-sm py-2">
                <div class="card border-success shadow">
                    <div class="card-body">
                        <div class="float-right text-success small">Jan 10th 2019 8:30 AM</div>
                        <h4 class="card-title text-success">Day 2 Sessions</h4>
                        <p class="card-text">Sign-up for the lessons and speakers that coincide with your course syllabus. Meet and greet with instructors.</p>
                        <button class="btn btn-sm btn-outline-secondary" type="button" data-target="#t22_details" data-toggle="collapse">Show Details ▼</button>
                        <div class="collapse border" id="t22_details">
                            <div class="p-2 text-monospace">
                                <div>08:30 - 09:00 Breakfast in CR 2A</div>
                                <div>09:00 - 10:30 Live sessions in CR 3</div>
                                <div>10:30 - 10:45 Break</div>
                                <div>10:45 - 12:00 Live sessions in CR 3</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-1 text-center flex-column d-none d-sm-flex">
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
            <div class="col-sm"> <!--spacer--> <!--</div>-->
        <!--</div>-->
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
                url: null
            });

            this.$store.dispatch('getElection', {
                id: this.$route.params.id
            });
        },
        methods: {
            getLiveUpdates(url) {
                this.$store.dispatch('getElectionLiveUpdates', {
                    id: this.$route.params.id,
                    url: url
                });
            }
        }
    }
</script>
