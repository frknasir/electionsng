<style scoped>
    #map {
        width: 100%;
        height: 400px;
    }
</style>
<template>
    <div class="content">
        <div class="container-fluid">

            <div class="card">
                <div class="card-header card-header-icon card-header-rose">
                    <div class="card-icon">
                        <i class="material-icons">layerst</i>
                    </div>
                    <h4 class="card-title"> Live Results
                        <small>- Heat Map</small>
                    </h4>
                </div>
                <div class="card-body">
                    <div id="map"></div>
                </div>
            </div>

            <!-- Election metrics Card -->
            <election-metrics></election-metrics>
            <!-- End Election metrics Card -->

            <!-- Update Metrics -->
            <update-metrics></update-metrics>
            <!-- /Update Metrics -->

            <!-- Incident Metrics -->
            <incident-metrics></incident-metrics>
            <!-- /Incident Metrics -->

            <!-- Final Result Metrics -->
            <result-metrics></result-metrics>
            <!-- /Final Result Metrics -->
        </div>
    </div>
</template>
<script>
    import ElectionMetrics from '../components/dashboard/ElectionMetrics.vue';
    import UpdateMetrics from '../components/dashboard/UpdateMetrics.vue';
    import IncidentMetrics from '../components/dashboard/IncidentMetrics.vue';
    import ResultMetrics from '../components/dashboard/ResultMetrics.vue';

    export default {
        components: {
            ElectionMetrics,
            UpdateMetrics,
            IncidentMetrics,
            ResultMetrics
        },
        data() {
            return {
                
            }
        },
        created() {
            this.$store.dispatch("getElection", {
                id: this.$route.params.id
            });
        },
        mounted() {
            let vm = this;

        },
        computed: {
            election() {
                return this.$store.getters.getElection;
            },
            electionLoadStatus() {
                return this.$store.getters.getElectionLoadStatus;
            }
        },
        watch: {
            electionLoadStatus: function(val) {
                if(val === 2) {
                    this.initHeatMap();
                }
            }
        },
        methods: {
            initHeatMap() {
                let vm = this;
                var map = L.map('map').setView([
                    vm.election.state.latitude, 
                    vm.election.state.longitude
                ], 12);

                map.touchZoom.disable();
                map.doubleClickZoom.disable();
                map.scrollWheelZoom.disable();
                map.boxZoom.disable();
                map.keyboard.disable();
                $(".leaflet-control-zoom").css("visibility", "hidden");
                $('.leaflet-control-attribution').hide();

                var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                }).addTo(map);

                // https://github.com/Leaflet/Leaflet.heat
                var heat = L.heatLayer([
                    [5.13, 7.37, 1235],
                    [5.13, 7.37, 1445],
                    [5.13, 7.37, 124],
                    [5.13, 7.37, 1458],
                    [5.13, 7.37, 1245],
                    [5.13, 7.37, 1255],
                    [5.13, 7.37, 1455],
                    [5.13, 7.37, 1425],
                    [5.13, 7.37, 1245],
                    [5.13, 7.37, 1254]
                ], {radius: 25}).addTo(map);
            }
        }
    }
</script>
