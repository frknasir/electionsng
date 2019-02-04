<style scoped>

</style>
<template>
    <div>
        <!-- Markup -->
        <div class="card ">
            <div class="card-body ">
                <div class="row">
                    <div class="col-md-6">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="text-center">#</th>
                                    <th>State</th>
                                    <th># of Elections</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(x, index) in stateElectionsCount" :key="index">
                                    <td class="text-center">{{ index + 1 }}</td>
                                    <td>{{ x.name }}</td>
                                    <td>{{ x.elections_count }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-md-6">
                        <div id="worldMap" class="map map-big"></div>
                    </div>
                </div>
            </div>  
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                mapData: {}
            };
        },
        computed: {
            stateElectionsCount() {
                return this.$store.getters.getStateElectionsCount;
            },

            stateElectionsCountLoadStatus() {
                return this.$store.getters.getStateElectionsCountLoadStatus;
            }
        },
        created() {
            this.$store.dispatch('loadStateElectionsCount');
        },
        watch: {
            stateElectionsCountLoadStatus: function(val) {
                if(val == 2) {
                    this.stateElectionsCount.forEach(sec => {
                        this.mapData["NG-"+sec.code] = sec.elections_count * 100;
                    });

                    this.$nextTick(() => {
                        this.initMap();
                    });
                }
            }
        },
        mounted() {
            
        },
        methods: {
            initMap: function() {
                $('#worldMap').vectorMap({
                    map: 'Nigeria',
                    backgroundColor: "transparent",
                    zoomOnScroll: false,
                    regionStyle: {
                        initial: {
                            fill: '#e4e4e4',
                            "fill-opacity": 0.9,
                            stroke: 'none',
                            "stroke-width": 0,
                            "stroke-opacity": 0
                        }
                    },

                    series: {
                        regions: [{
                            values: this.mapData,
                            scale: ["#AAAAAA","#444444"],
                            normalizeFunction: 'polynomial'
                        }]
                    },
                });
            }
        }
    }
</script>

