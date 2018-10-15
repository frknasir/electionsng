<style scoped>
    #map {
        width: 100%;
        height: 400px;
    }
</style>
<template>
    <div class="card">
        <div class="card-header card-header-icon card-header-rose">
            <div class="card-icon">
                <i class="material-icons">layers</i>
            </div>
            <h4 class="card-title">HeatMap</h4>
            <div class="row">
                <div class="col-md-10">
                    <select v-model="type" class="form-control" name="" id="">
                        <option value="updates">Updates</option>
                        <option value="incidents">Incidents</option>
                        <option value="results">Results</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <action-loader class="text-center" :loading='heatMapDataLoadStatus == 1' 
                        :color="'#4caf50'"></action-loader>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div id="map"></div>
        </div>
    </div>
</template>
<script>
    import ActionLoader from 'vue-spinner/src/ScaleLoader.vue';

    export default {
        components: {
            ActionLoader
        },
        data() {
            return {
                type: 'incidents',
                heat: null,
                map: null,
                map_first_init: true
            }
        },
        created() {
            this.$store.dispatch("getHeatMapData", {
                electionId: this.$route.params.id,
                type: this.type
            });
        },
        mounted() {

        },
        computed: {
            election() {
                return this.$store.getters.getElection;
            },
            electionLoadStatus() {
                return this.$store.getters.getElectionLoadStatus;
            },
            heatMapData() {
                return this.$store.getters.getHeatMapData;
            },
            heatMapDataLoadStatus() {
                return this.$store.getters.getHeatMapDataLoadStatus;
            }
        },
        watch: {
            type: function(val) {
                this.$store.dispatch("getHeatMapData", {
                    electionId: this.$route.params.id,
                    type: this.type
                });
            },
            heatMapData: function(val) {
                if(this.map_first_init) {
                    this.initHeatMap(val);
                    this.map_first_init = false;
                } else {
                    this.updateHeatMap(val);
                }
            }
        },
        methods: {
            initHeatMap(data) {
                let vm = this;
                let mapzoom = 12;

                //check if election is presidential. then reduce the zoom
                if(vm.election.election_type_id == 1) {
                    mapzoom = 6
                }

                vm.map = L.map('map').setView([
                    vm.election.state.latitude, 
                    vm.election.state.longitude
                ], mapzoom);

                vm.map.touchZoom.disable();
                vm.map.doubleClickZoom.disable();
                vm.map.scrollWheelZoom.disable();
                vm.map.boxZoom.disable();
                vm.map.keyboard.disable(); 
                $(".leaflet-control-zoom").css("visibility", "hidden");
                $('.leaflet-control-attribution').hide();

                var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                }).addTo(vm.map);

                // https://github.com/Leaflet/Leaflet.heat
                vm.heat = L.heatLayer(
                    data, {radius: 25}
                ).addTo(vm.map);
            },
            updateHeatMap(data) {
                let vm = this;
                //remove current heat layer
                vm.map.removeLayer(vm.heat);

                vm.heat = L.heatLayer(
                    data, {radius: 25}
                ).addTo(vm.map);
            }
        }
    }
</script>
