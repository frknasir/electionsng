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
                                    <th class="text-center"># of Elections</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(x, index) in stateElectionsCount" :key="index">
                                    <td class="text-center">{{ x.id }}</td>
                                    <td>{{ x.name }}</td>
                                    <td class="text-center">{{ x.elections_count }}</td>
                                </tr>
                            </tbody>
                            <div id="pagination-btn">
                                <nav aria-label="Page navigation ml-auto mr-auto">
                                    <ul class="pagination text-black">
                                        <li class="page-item" v-bind:class="[{disabled: !pagination.prev_page_url}]">
                                            <a @click="loadStateElectionsCount(pagination.prev_page_url)" class="page-link" tabindex="-1">Previous</a>
                                        </li>
                                        <li class="page-item" v-bind:class="[{disabled: !pagination.next_page_url}]">
                                            <a @click="loadStateElectionsCount(pagination.next_page_url)" class="page-link">Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
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
                mapData: {},
                mapInitialized: false
            };
        },
        computed: {
            stateElectionsCount() {
                return this.$store.getters.getStateElectionsCount;
            },

            stateElectionsCountLoadStatus() {
                return this.$store.getters.getStateElectionsCountLoadStatus;
            },

            pagination() {
                return this.$store.getters.getSECPagination;
            },
        },
        created() {
            this.$store.dispatch('loadStateElectionsCount', {
                url: null
            });
        },
        watch: {
            stateElectionsCountLoadStatus: function(val) {
                if(val == 2) {
                    this.stateElectionsCount.forEach(sec => {
                        this.mapData["NG-"+sec.code] = sec.elections_count * 100;
                    });

                    this.$nextTick(() => {
                        if(!this.mapInitialized) {
                            this.initMap();
                        }
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

                this.mapInitialized = true;
            },
            loadStateElectionsCount: function(url) {
                this.$store.dispatch('loadStateElectionsCount', {
                    url: url
                });
            }
        }
    }
</script>

