<style scoped>
    #map {
        position: fixed;
        width: 100%;
        height: 100vh;
        z-index: 1;
    }

    #info-window {
        position: fixed;
        bottom:0;
        right:0;
        z-index: 4;
    }

    #filter-by-location {
        position: fixed;
        right:30px;
        top:12%;
        z-index: 3;
    }

    #filter-by-location .dropdown-menu .dropdown-item:hover {
        background-color: darkseagreen;
    }
</style>
<template>
    <div>
        <div id="map"></div>

        <!--info window-->
        <div v-show="info_window_active" id="info-window" class="col-md-4">
            <div class="card card-nav-tabs">
                <div class="card-header card-header-success">
                    <h4 class="card-title"></h4>
                    <p class="category"></p> 
                    <span id="incident-type" class="badge badge-warning"></span>
                    <br>
                    <div v-if="userLoadStatus == 2 && user != {} && permittedToMakeChanges == true">
                        <router-link class="btn btn-just-icon btn-sm btn-warning" 
                            :to="'/election/'+election.id+'/incidents/edit/'+incident.id">
                            <i class="material-icons">create</i>
                        </router-link>
                        <button @click="deleteIncident(incident.id)" class="btn btn-just-icon btn-sm btn-danger">
                            <i class="material-icons">clear</i>
                        </button>
                    </div>
                </div>
                <div v-html="info_desc" class="card-body"></div>
                <div class="card-footer">
                    <ul class="list-inline">
                        <li class="list-inline-item">
                            <button @click="closeInfoWindow" class="btn btn-success btn-sm">
                                <i class="material-icons">
                                    cancel
                                </i>
                                close
                            </button>
                        </li>
                        <li class="list-inline-item">
                            <div class="stats">
                                <i class="material-icons">access_time</i> 
                                <span class="created_at"></span>
                            </div>
                        </li>
                        <li class="list-inline-item">
                            <div class="stats">
                                <i class="material-icons">flag</i> 
                                <span class="updated_at"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Filter dropdown -->
        <!-- Split dropup button -->
        <div id="filter-by-location">
            <div class="btn-group">
                <button type="button" class="btn btn-success">
                    {{ filter_btn_label }} 
                    <span v-if="incidentsLoadStatus != 1" class="badge badge-default">
                        {{ iPagination.total }}
                    </span>
                    <action-loader :loading='incidentsLoadStatus == 1' 
                        :color="'#ffffff'"></action-loader>
                </button>
                <button type="button" class="btn btn-success dropdown-toggle" 
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="sr-only">Toggle Dropdown</span>
                </button>
                <div class="dropdown-menu">
                    <a @click="setLocationFilter('all')" class="dropdown-item">
                        All
                    </a>
                    <a v-if="election.election_type_id == 1" @click="setLocationFilter('state')" 
                        class="dropdown-item">
                        State
                    </a>
                    <a @click="setLocationFilter('localGovernment')" class="dropdown-item">
                        Local Government
                    </a>
                    <a @click="setLocationFilter('registrationArea')" class="dropdown-item">
                        Registration Area
                    </a>
                    <a @click="setLocationFilter('pollingUnit')" class="dropdown-item">
                        Polling Unit
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item disabled">Filter By Location</a>
                </div>
            </div>
        </div>
        <!-- End Filter dropdown -->
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
                map: null,
                incident: {
                    id: ''
                },
                info_window_active: false,
                markers: null,
                map_first_init: true,
                location_filter: null,
                filter_btn_label: "Filter By",
                info_desc: '',
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
            incidents() {
                return this.$store.getters.getIncidents;
            },
            incidentsLoadStatus() {
                return this.$store.getters.getIncidentsLoadStatus;
            },
            iPagination() {
                return this.$store.getters.getIPagination;
            },
            deleteIncidentLoadStatus() {
                return this.$store.getters.getDeleteIncidentLoadStatus;
            },
            deleteIncidentResult() {
                return this.$store.getters.getDeleteIncidentResult;
            },
            user() {
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            }
        },
        watch: {
            incidents: function() {
                if(this.map_first_init) {
                    this.initMap();
                    this.map_first_init = false;
                }

                if(this.incidentsLoadStatus == 2 && !this.map_first_init) {
                    this.clearMarkers();
                    this.buildMarkers(this.map);
                }
            },
            location_filter: function() {
                if(this.location_filter === "all") {
                    this.$store.dispatch('getElectionIncidents', {
                        id: this.$route.params.id,
                        url: null,
                        limit: null
                    });
                } else {
                    this.$store.dispatch('filterIncidentsBy', {
                        electionId: this.$route.params.id,
                        locationType: this.location_filter,
                        url: null,
                        limit: null
                    });
                }
            },
            deleteIncidentLoadStatus: function() {
                let vm = this;
                
                if(vm.deleteIncidentLoadStatus == 3 && vm.deleteIncidentResult.success == 0) {
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.deleteIncidentResult.message, 
                        'danger'
                    );
                } else if(vm.deleteIncidentLoadStatus == 2 && vm.deleteIncidentResult.success == 1) {
                    //reload updates
                    this.closeInfoWindow();
                    this.$store.dispatch('getElectionIncidents', {
                        id: this.$route.params.id,
                        url: null,
                        limit: null
                    });
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.deleteIncidentResult.message, 
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
            this.$store.dispatch('getElectionIncidents', {
                id: this.$route.params.id,
                url: null,
                limit: null
            });

            if(this.userLoadStatus == 2) {
                this.permittedToMakeChanges = this.HF.authorise(
                    this.user.roles, 
                    this.$route.meta.permittedToMakeChanges
                );
            }
        },
        methods: {
            initMap() {
                let vm = this;
                let mapzoom = 9;

                //check if election is presidential. then reduce the zoom
                if(vm.election.election_type_id == 1) {
                    mapzoom = 6
                }

                vm.map = L.map('map').setView([
                    vm.election.state.latitude, 
                    vm.election.state.longitude
                ], mapzoom);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(vm.map);

                vm.buildMarkers(vm.map);
            },
            openInfoWindow(incident) {
                let info_window = $("#info-window");
                this.incident.id = incident.id;
                info_window.find(".card-title").text(incident.title);
                info_window.find(".category").text(
                    incident.location_type + ": " +
                    (incident.location.name || incident.location.code)
                );
                info_window.find("#incident-type").text(incident.incident_type_name);
                //info_window.find(".card-body").text(incident.description);
                this.info_desc = incident.description;

                info_window.find(".stats .created_at").text(
                    moment(incident.created_at, 'DD MMM YYYY H:m:s').format('lll')
                );

                if(moment(incident.updated_at, 'DD MMM YYYY H:m:s').isValid()) {
                    info_window.find(".stats .updated_at").text("Edited");
                }

                this.info_window_active = true;
            },
            closeInfoWindow() {
                this.info_window_active = false;
            },
            buildMarkers(map) {
                let vm = this;
                vm.markers = L.markerClusterGroup({ chunkedLoading: true });

                for(let i = 0; i < vm.incidents.length; i++) {
                    let incident = vm.incidents[i];
                    let icon = new L.Icon.Default();
                    icon.options.shadowSize = [0,0];
                    let marker = L.marker([
                        incident.location.latitude,
                        incident.location.longitude
                    ], {
                        icon : icon
                    });

                    marker.id = incident.id;

                    marker.on('click', function() {
                        let incident = vm.searchIncidents(this.id);
                        vm.openInfoWindow(incident);
                    });

                    marker.bindPopup(incident.location.name || incident.location.code);
                        //.openPopup();

                    vm.markers.addLayer(marker);
                }

                map.addLayer(vm.markers);
            },
            clearMarkers() {
                let vm = this;
                vm.map.removeLayer(vm.markers);                
            },
            setLocationFilter(location_filter) {
                this.location_filter = location_filter;

                switch (this.location_filter) {
                    case "all":
                        this.filter_btn_label = "Filter By";
                        break;

                    case "state":
                        this.filter_btn_label = "State Incidents";
                        break;

                    case "localGovernment":
                        this.filter_btn_label = "LG Incidents";
                        break;

                    case "registrationArea":
                        this.filter_btn_label = "RA Incidents";
                        break;

                    case "pollingUnit":
                        this.filter_btn_label = "PU Incidents";
                        break;
                
                    default:
                        break;
                }
            },
            getIncidents(url) {
                if(this.location_filter && this.location_filter !== "all") {
                    this.$store.dispatch('filterIncidentsBy', {
                        electionId: this.$route.params.id,
                        locationType: this.location_filter,
                        url: url,
                        limit: null
                    });
                } else {
                    this.$store.dispatch('getElectionIncidents', {
                        id: this.$route.params.id,
                        url: url,
                        limit: null
                    });
                }
            },
            searchIncidents(id) {
                let vm = this;
                for (let i = 0; i < vm.incidents.length; i++) {
                    if (vm.incidents[i].id === id) {
                        return vm.incidents[i];
                    }
                }
            },
            deleteIncident(data) {
                if(confirm("are you sure?")){
                    this.$store.dispatch('deleteIncident', {
                        id: data
                    });
                }
            }
        }
    }
</script>
