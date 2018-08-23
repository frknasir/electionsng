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
                <div class="card-header card-header-danger">
                    Featured  
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Cras justo odio</li>
                    <li class="list-group-item">Dapibus ac facilisis in</li>
                    <li class="list-group-item">Vestibulum at eros</li>
                </ul>
                <div class="card-footer">
                    <button @click="closeInfoWindow" class="btn btn-danger btn-sm">
                        <i class="material-icons">
                            cancel
                        </i>
                        close
                    </button>
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
        props: [
            'luPagination',
            'liveUpdates'
        ],
        data() {
            return {
                map: null,
                liveUpdate: {

                },
                info_window_active: false,
                map_z_index: 1,
                markers: []
            }
        },
        mounted() {
            this.initMap();
        },
        created() {
            
        },
        methods: {
            initMap() {
                this.map = L.map('map').setView([9.0765, 7.3986], 8);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(this.map);

                //var marker = L.marker([9.0765, 7.3986]).addTo(mymap);

                //marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

                /*var popup = L.popup()
                    .setLatLng([51.5, -0.09])
                    .setContent("I am a standalone popup.")
                    .openOn(mymap);*/
                //marker.on('click', this.openInfoWindow);
                this.buildMarkers(this.map);
            },
            openInfoWindow() {
                this.info_window_active = true;
            },
            closeInfoWindow() {
                this.info_window_active = false;
            },
            onMarkerClicked(e) {
                alert('marker clicked at '+e.latlng.toString());
            },
            buildMarkers(map) {
                let vm = this;

                for(let i = 0; i < vm.liveUpdates.length; i++) {
                    let liveUpdate = vm.liveUpdates[i];
                    console.log(liveUpdate.location.latitude);
                    let marker = L.marker([
                        liveUpdate.location.latitude,
                        liveUpdate.location.longitude
                    ]).addTo(map);
                    marker.on('click', vm.openInfoWindow);

                    vm.markers.push(marker);
                }
            },
            clearMarkers() {

            },
            getLiveUpdates(url) {
                this.$store.dispatch('getElectionLiveUpdates', {
                    id: this.$route.params.id,
                    url: null
                })
            }
        }
    }
</script>
