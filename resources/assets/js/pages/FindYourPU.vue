<style scoped>
    #map {
        position: fixed;
        width: 100%;
        height: 100vh;
        margin-top: 0px;
        z-index: 1;
    }

    .map-box {
        display: flex;
        flex-direction: column;
    }

    #search-window {
        position: fixed;
        bottom:0;
        right:0;
        z-index: 1000;
    }

    #action-btn {
        position: relative;
        right: 20px;
        z-index: 6;
    }

    #action-btn .btn {
        position: fixed;
        right: 30px;
        bottom: 10%;
    }
</style>
<template>
    <div>
        <br><br><br>
        <div id="map"></div>

        <div v-show="!search_window_active" id="action-btn">
            <button @click="toggleSearchWindow" class="btn btn-success btn-fab btn-lg btn-round">
                <i class="material-icons">search</i>
            </button>
        </div>

        <!-- info window -->
        <div id="search-window" v-show="search_window_active" class="col-md-6">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">
                        Select Location
                    </h4>
                    <div class="category">
                        <div class="form-check form-check-radio form-check-inline">
                            <label class="form-check-label">
                                <input class="form-check-input" type="radio" 
                                    name="pu-location_type"  
                                    value="state" v-model="location_type"> State
                                <span class="circle">
                                    <span class="check"></span>
                                </span>
                            </label>
                        </div>
                        <div class="form-check form-check-radio form-check-inline">
                            <label class="form-check-label">
                                <input class="form-check-input" type="radio" 
                                    name="pu-location_type"  
                                    value="localGovernment" v-model="location_type"> Local Government
                                <span class="circle">
                                    <span class="check"></span>
                                </span>
                            </label>
                        </div>
                        <div class="form-check form-check-radio form-check-inline">
                            <label class="form-check-label">
                                <input class="form-check-input" type="radio" 
                                    name="pu-location_type" 
                                    value="registrationArea" v-model="location_type"> Registration Area
                                <span class="circle">
                                    <span class="check"></span>
                                </span>
                            </label>
                        </div>
                        <div class="form-check form-check-radio form-check-inline">
                            <label class="form-check-label">
                                <input class="form-check-input" type="radio" 
                                    name="pu-location_type" 
                                    value="pollingUnit" v-model="location_type"> Polling Unit
                                <span class="circle">
                                    <span class="check"></span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="form-row">
                        <div v-show="location_type === 'state' || location_type === 'localGovernment' || location_type === 'registrationArea' || location_type === 'pollingUnit'" class="col">
                            <label for="state">State</label>
                            <select v-model="state_slct" class="form-control">
                                <option class="disabled" disabled>choose state</option>
                                <option v-for="state in states" v-bind:key="state.id" 
                                :value="state.id + ' ' + state.latitude + ' ' + state.longitude">
                                    {{ state.name }}
                                </option>
                            </select>
                        </div>
                        <div v-show="location_type === 'localGovernment' || location_type === 'registrationArea' || location_type === 'pollingUnit'" class="col">
                            <label for="lg">Local Government</label>
                            <select v-model="lg_slct" class="form-control">
                                <option class="disabled" disabled>choose Local Government</option>
                                <option v-for="lg in localGovernments" v-bind:key="lg.id" 
                                :value="lg.id + ' ' + lg.latitude + ' ' + lg.longitude">
                                    {{ lg.name }}
                                </option>
                            </select>
                        </div>
                        <div v-show="location_type === 'registrationArea' || location_type === 'pollingUnit'" class="col">
                            <label for="ra">Registration Area</label>
                            <select v-model="ra_slct" class="form-control">
                                <option class="disabled" disabled>choose Registration Area</option>
                                <option v-for="ra in registrationAreas" v-bind:key="ra.id" 
                                :value="ra.id + ' ' + ra.latitude + ' ' + ra.longitude">
                                    {{ ra.name }}
                                </option>
                            </select>
                        </div>
                        <div v-show="location_type === 'pollingUnit'" class="col">
                            <label for="pu">Polling Unit</label>
                            <select v-model="pu_slct" class="form-control">
                                <option v-for="pu in pollingUnits" v-bind:key="pu.id" 
                                :value="pu.id + ' ' + pu.latitude + ' ' + pu.longitude">
                                    {{ pu.code }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <button @click="reloadMap(location_type)" v-show="location_type !== null" 
                        type="button" class="btn btn-success">
                        <i class="material-icons">location_on</i>
                        Show on Map
                    </button>
                    <button @click="toggleSearchWindow" class="btn btn-danger">
                        <i class="material-icons">cancel</i>
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { HELPERS } from '../helpers.js';
    import ActionLoader from 'vue-spinner/src/ScaleLoader.vue';

    export default {
        components: {
            ActionLoader
        },
        data() {
            return {
                map: null,
                search_window_active: false,
                markerGroup: null,
                location_type: null,
                state_slct: null,
                lg_slct: null,
                ra_slct: null,
                pu_slct: null,
                HF: HELPERS
            }
        },
        computed: {
            user() {
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            },
            states() {
                return this.$store.getters.getStates;
            },
            statesLoadStatus() {
                return this.$store.getters.getStatesLoadStatus;
            },
            localGovernments() {
                return this.$store.getters.getLocalGovernments;
            },
            localGovernmentsLoadStatus() {
                return this.$store.getters.getLocalGovernmentsLoadStatus;
            },
            registrationAreas() {
                return this.$store.getters.getRegistrationAreas;
            },
            registrationAreasLoadStatus() {
                return this.$store.getters.getRegistrationAreasLoadStatus;
            },
            pollingUnits() {
                return this.$store.getters.getPollingUnits;
            },
            pollingUnitsLoadStatus() {
                return this.$store.getters.getPollingUnitsLoadStatus;
            }
        },
        watch: {
            location_type: function() {
                this.$store.dispatch('getStates');
            },

            state_slct: function() {
                this.$store.dispatch('getLocalGovernments', {
                    id: this.state_slct.split(" ")[0]
                });
            },

            lg_slct: function() {
                this.$store.dispatch('getRegistrationAreas', {
                    id: this.lg_slct.split(" ")[0]
                });
            },

            ra_slct: function() {
                this.$store.dispatch('getPollingUnits', {
                    id: this.ra_slct.split(" ")[0]
                })
            }
        },
        mounted() {
            this.initMap();
        },
        created() {

        },
        methods: {
            initMap() {
                let vm = this;
                let mapzoom = 6;

                vm.map = L.map('map').setView([
                    9.0765, 
                    7.3986
                ], mapzoom);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(vm.map);

                vm.markerGroup = L.layerGroup().addTo(vm.map);
            },
            toggleSearchWindow() {
                this.search_window_active = !this.search_window_active;
            },
            reloadMap(location_type) {
                let lat_lng = '';
                let lat = '';
                let lng = '';

                if(location_type == 'state') {
                    lat_lng = this.state_slct.split(" ");
                } else if(location_type == 'localGovernment') {
                    lat_lng = this.lg_slct.split(" ");
                } else if(location_type == 'registrationArea') {
                    lat_lng = this.ra_slct.split(" ");
                } else if(location_type == 'pollingUnit') {
                    lat_lng = this.pu_slct.split(" ");
                }

                lat = lat_lng[1];
                lng = lat_lng[2];

                //remove layers
                this.map.removeLayer(this.markerGroup);

                //recreate
                this.markerGroup = L.layerGroup().addTo(this.map);

                //create a marker with the new coordinates
                let icon = new L.Icon.Default();
                icon.options.shadowSize = [0,0];
                let marker = L.marker([
                    lat,
                    lng
                ], {
                    icon : icon
                });

                //add the marker to the map
                marker.bindPopup(lat + "N, " + lng + "E").openPopup();
                marker.addTo(this.markerGroup);

                //pan to new position on the map
                this.map.panTo(new L.LatLng(lat, lng));
            }
        }
    }
</script>
