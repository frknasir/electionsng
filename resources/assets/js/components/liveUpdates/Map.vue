<style>
    #map {
        position:absolute;
        width: 100%;
        height: 89%;
    }

    #info-window {
        position: fixed;
        bottom:0;
        right:0;
        z-index: 2;
    }

    #pagination {
        position: fixed;
        right:30px;
        top:10%;
        z-index: 3;
    }
</style>
<template>
    <div>
        <div class="wrapper-full-page" :style="{'z-index': map_z_index }" id="map"></div>

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
                                <span class="created_at">added 4 minutes ago</span>
                            </div>
                        </li>
                        <li class="list-inline-item">
                            <div class="stats">
                                <i class="material-icons">access_time</i> 
                                <span class="updated_at">updated 4 minutes ago</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- pagination -->
        <div id="pagination">
            <button @click="getLiveUpdates(luPagination.prev_page_url)" class="btn btn-just-icon" v-bind:class="[{disabled: !luPagination.prev_page_url}]">
                <i class="material-icons">chevron_left</i>
            </button>
            <label for="">{{ luPagination.to }}/{{ luPagination.total }}</label>
            <button @click="getLiveUpdates(luPagination.next_page_url)" class="btn btn-just-icon" v-bind:class="[{disabled: !luPagination.next_page_url}]">
                <i class="material-icons">chevron_right</i>                        
            </button>
        </div>

        <!-- Fixed -->
        <div class="fixed-plugin">
            <div class="dropdown show-dropdown">
                <a href="#" data-toggle="dropdown">
                    <i class="fa fa-cog fa-2x"> </i>
                </a>
                <ul class="dropdown-menu">
                    <li class="header-title">Filter by:</li>

                    <li class="adjustments-line">
                        <a href="javascript:void(0)" class="switch-trigger">
                            <p>State</p>
                            <label class="ml-auto">
                                <div class="form-check form-check-radio form-check-inline">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="radio" 
                                        name="location-filter" id="state" 
                                        value="option1"> 
                                        <span class="circle">
                                            <span class="check"></span>
                                        </span>
                                    </label>
                                </div>
                            </label>
                            <div class="clearfix"></div>
                        </a>
                    </li>

                    <li class="adjustments-line">
                        <a href="javascript:void(0)" class="switch-trigger">
                            <p>Local Government</p>
                            <label class="switch-mini ml-auto">
                                <div class="form-check form-check-radio form-check-inline">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="radio" 
                                        name="location-filter" id="localg" 
                                        value="option2"> 
                                        <span class="circle">
                                            <span class="check"></span>
                                        </span>
                                    </label>
                                </div>
                            </label>
                            <div class="clearfix"></div>
                        </a>
                    </li>

                    <li class="adjustments-line">
                        <a href="javascript:void(0)" class="switch-trigger">
                            <p>Registration Area</p>
                            <label class="switch-mini ml-auto">
                                <div class="form-check form-check-radio form-check-inline">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="radio" 
                                        name="location-filter" id="ra" 
                                        value="option3"> 
                                        <span class="circle">
                                            <span class="check"></span>
                                        </span>
                                    </label>
                                </div>
                            </label>
                            <div class="clearfix"></div>
                        </a>
                    </li>

                    <li class="adjustments-line">
                        <a href="javascript:void(0)" class="switch-trigger">
                            <p>Polling Unit</p>
                            <label class="switch-mini ml-auto">
                                <div class="form-check form-check-radio form-check-inline">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="radio" 
                                        name="location-filter" id="pu" 
                                        value="option3"> 
                                        <span class="circle">
                                            <span class="check"></span>
                                        </span>
                                    </label>
                                </div>
                            </label>
                            <div class="clearfix"></div>
                        </a>
                    </li>


                    <li class="header-title">Thank you for 95 shares!</li>
                    <li class="button-container text-center">
                        <button id="twitter" class="btn btn-round btn-twitter"><i class="fa fa-twitter"></i> &middot; 45</button>
                        <button id="facebook" class="btn btn-round btn-facebook"><i class="fa fa-facebook-f"></i> &middot; 50</button>
                        <br>
                        <br>
                    </li>
                </ul>
            </div>
        </div> 
    </div>
</template>
<script>
    export default {
        props: [],
        data() {
            return {
                map: null,
                liveUpdate: {

                },
                info_window_active: false,
                map_z_index: 1,
                markers: [],
                map_first_init: true
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
                info_window.find(".category").text(liveUpdate.location.name);
                info_window.find(".card-body").text(liveUpdate.description);

                let created_at = new Date(liveUpdate.created_at.date);
                created_at = ""+created_at.getFullYear()+
                    ("0" + (created_at.getMonth() + 1)).slice(-2)+
                    ("0" + created_at.getDate()).slice(-2);
                info_window.find(".stats .created_at").text( "added "+
                    moment(
                        created_at, 
                        "YYYYMMDD"
                    ).fromNow()
                );

                let updated_at = new Date(liveUpdate.updated_at.date);
                updated_at = ""+updated_at.getFullYear()+
                    ("0" + (updated_at.getMonth() + 1)).slice(-2)+
                    ("0" + updated_at.getDate()).slice(-2);
                info_window.find(".stats .updated_at").text( "updated "+
                    moment(
                        updated_at, 
                        "YYYYMMDD"
                    ).fromNow()
                );


                this.info_window_active = true;
            },
            closeInfoWindow() {
                this.info_window_active = false;
            },
            buildMarkers(map) {
                let vm = this;

                for(let i = 0; i < vm.liveUpdates.length; i++) {
                    let liveUpdate = vm.liveUpdates[i];
                    let marker = L.marker([
                        liveUpdate.location.latitude,
                        liveUpdate.location.longitude
                    ]).addTo(map);

                    marker.id = liveUpdate.id;

                    marker.on('click', function() {
                        let liveUpdate = vm.searchLiveUpdates(this.id);
                        vm.openInfoWindow(liveUpdate);
                    });

                    vm.markers.push(marker);
                }
            },
            clearMarkers() {
                let vm = this;
                vm.markers.forEach(function(marker, index) {
                    if(marker) {
                        vm.map.removeLayer(marker);
                    }
                })
            },
            getLiveUpdates(url) {
                this.$store.dispatch('getElectionLiveUpdates', {
                    id: this.$route.params.id,
                    url: url
                })
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
