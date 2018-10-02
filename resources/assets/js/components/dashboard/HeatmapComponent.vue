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
                <i class="material-icons">layerst</i>
            </div>
            <h4 class="card-title"> HeatMap
                <small>
                    <select v-model="type" class="form-control" name="" id="">
                        <option value="updates">Updates</option>
                        <option value="incidents">Incidents</option>
                        <option value="results">Results</option>
                    </select>
                </small>
            </h4>
        </div>
        <div class="card-body">
            <div id="map"></div>
        </div>
    </div>
</template>
<script>
    export default {
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
                vm.map = L.map('map').setView([
                    vm.election.state.latitude, 
                    vm.election.state.longitude
                ], 12);

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
