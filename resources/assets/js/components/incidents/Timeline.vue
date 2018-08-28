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
                    <button @click="getIncidents(iPagination.prev_page_url)" class="btn btn-just-icon" v-bind:class="[{disabled: !iPagination.prev_page_url}]">
                        <i class="material-icons">chevron_left</i>
                    </button>
                    <label>
                        showing to {{ iPagination.to }} of {{ iPagination.total }} updates
                    </label>
                    <button @click="getIncidents(iPagination.next_page_url)" class="btn btn-just-icon" v-bind:class="[{disabled: !iPagination.next_page_url}]">
                        <i class="material-icons">chevron_right</i>                        
                    </button>
                </div>
            </div>
        </div>

        <!-- timeline item 1 -->
        <div v-for="incident in incidents" v-bind:key="incident.id" class="row no-gutters">
            <div v-if="incident.id % 2 == 0"  class="col-sm"> <!--spacer--> </div>
            <!-- timeline item 1 center dot -->
            <div v-if="incident.id % 2 == 0" class="col-sm-1 text-center flex-column d-none d-sm-flex">
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
                            {{ moment(incident.created_at, 'DD MMM YYYY H:m:s').format('lll') }}
                        </div>
                        <h4 class="card-title text-muted">
                            {{ incident.title }} <br />
                            <small>
                                {{ 
                                    incident.location_type + ": " +
                                    (
                                        incident.location.name || incident.location.code
                                    ) 
                                }}
                            </small> <br>
                            <span class="badge badge-warning">
                                {{
                                    incident.incident_type_name
                                }}
                            </span>
                        </h4>
                        <p class="card-text">
                            {{ incident.description }}
                        </p>
                        <div v-if="moment(incident.updated_at, 'DD MMM YYYY H:m:s').isValid()" class="stats small">
                            <i class="material-icons">flag</i> 
                            <span class="updated_at">Edited</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="incident.id % 2 == 1" class="col-sm-1 text-center flex-column d-none d-sm-flex">
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
            <div v-if="incident.id % 2 == 1" class="col-sm"> <!--spacer--></div>
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
            incidents() {
                return this.$store.getters.getIncidents;
            },
            incidentsLoadStatus() {
                return this.$store.getters.getIncidentsLoadStatus;
            },
            iPagination() {
                return this.$store.getters.getIPagination;
            }
        },
        watch: {
        },
        mounted() {

        },
        created() {
            this.$store.dispatch('getElectionIncidents', {
                id: this.$route.params.id,
                url: null,
                limit: 10
            });
        },
        methods: {
            getIncidents(url) {
                this.$store.dispatch('getElectionIncidents', {
                    id: this.$route.params.id,
                    url: url,
                    limit: 10
                });
            },
        }
    }
</script>
