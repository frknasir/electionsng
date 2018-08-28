<style scoped>
    #map {
        position:absolute;
        width: 100%;
        height: 89%;
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
</style>
<template>
    <div>
        <div class="wrapper-full-page" id="map"></div>
        <!--info window-->
        <div v-show="info_window_active" id="info-window" class="col-md-4">
            <div class="card card-nav-tabs">
                <div class="card-header card-header-success">
                    <h4 class="card-title"></h4>
                    <p class="category"></p> 
                </div>
                <div class="card-body">

                </div>
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
            <div class="btn-group dropup">
                <button type="button" class="btn btn-success">
                    {{ filter_btn_label }}
                    <span class="badge badge-default">
                        {{ luPagination.total }}
                    </span>
                </button>
                <button type="button" class="btn btn-success dropdown-toggle" 
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="sr-only">Toggle Dropdown</span>
                </button>
                <div class="dropdown-menu dropdown-success">
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
    export default {
        props: [],
        data() {
            return {
                map: null,
                liveUpdate: {},
                info_window_active: false,
                markers: null,
                map_first_init: true,
                location_filter: null,
                filter_btn_label: "Filter By"
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
            electionLoadStatus: function() {
                if(this.electionLoadStatus == 2 && this.map_first_init) {
                    this.initMap();
                    this.map_first_init = false;
                }
            },
            liveUpdates: function() {
                if(this.liveUpdatesLoadStatus == 2 && !this.map_first_init) {
                    this.clearMarkers();
                    this.buildMarkers(this.map);
                }
            },
            location_filter: function() {
                if(this.location_filter === "all") {
                    this.$store.dispatch('getElectionLiveUpdates', {
                        id: this.$route.params.id,
                        url: null
                    });
                } else {
                    this.$store.dispatch('filterUpdatesBy', {
                        electionId: this.$route.params.id,
                        locationType: this.location_filter,
                        url: null
                    });
                }
            }
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
            initMap() {
                let vm = this;

                vm.map = L.map('map').setView(
                    [
                        vm.election.state.latitude, 
                        vm.election.state.longitude
                    ], 8
                );

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(vm.map);

                vm.buildMarkers(vm.map);
            },
            openInfoWindow(liveUpdate) {
                let info_window = $("#info-window");
                info_window.find(".card-title").text(liveUpdate.title);
                info_window.find(".category").text(
                    liveUpdate.location_type + ": " +
                    (liveUpdate.location.name || liveUpdate.location.code)
                );
                info_window.find(".card-body").text(liveUpdate.description);

                info_window.find(".stats .created_at").text(
                    moment(liveUpdate.created_at, 'DD MMM YYYY H:m:s').format('lll')
                );

                if(moment(liveUpdate.updated_at, 'DD MMM YYYY H:m:s').isValid()) {
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
                
                for(let i = 0; i < vm.liveUpdates.length; i++) {
                    let liveUpdate = vm.liveUpdates[i];
                    let icon = new L.Icon.Default();
                    icon.options.shadowSize = [0,0];
                    let marker = L.marker([
                        liveUpdate.location.latitude,
                        liveUpdate.location.longitude
                    ], {
                        icon : icon
                    }).addTo(map);

                    marker.id = liveUpdate.id;

                    marker.on('click', function() {
                        let liveUpdate = vm.searchLiveUpdates(this.id);
                        vm.openInfoWindow(liveUpdate);
                    });

                    marker.bindPopup(liveUpdate.location.name || liveUpdate.location.code);
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
                        this.filter_btn_label = "State Updates";
                        break;

                    case "localGovernment":
                        this.filter_btn_label = "LG Updates";
                        break;

                    case "registrationArea":
                        this.filter_btn_label = "RA Updates";
                        break;

                    case "pollingUnit":
                        this.filter_btn_label = "PU Updates";
                        break;
                
                    default:
                        break;
                }
            },
            getLiveUpdates(url) {
                if(this.location_filter && this.location_filter !== "all") {
                    this.$store.dispatch('filterUpdatesBy', {
                        electionId: this.$route.params.id,
                        locationType: this.location_filter,
                        url: url
                    });
                } else {
                    this.$store.dispatch('getElectionLiveUpdates', {
                        id: this.$route.params.id,
                        url: url
                    });
                }
            },
            searchLiveUpdates(id) {
                let vm = this;
                for (let i = 0; i < vm.liveUpdates.length; i++) {
                    if (vm.liveUpdates[i].id === id) {
                        return vm.liveUpdates[i];
                    }
                }
            }
        }
    }
</script>
