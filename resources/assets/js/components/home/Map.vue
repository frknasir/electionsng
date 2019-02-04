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
                                <tr>
                                    <td class="text-center">1</td>
                                    <td>Kaduna</td>
                                    <td>10</td>
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
                mapData: {
                    "NG-AB": 760,
                    "NG-AD": 550,
                    "NG-AK": 120,
                    "NG-BA": 1300,
                    "NG-BE": 540,
                    "NG-BO": 690,
                    "NG-BY": 200,
                    "NG-CR": 200,
                    "NG-DE": 600,
                    "NG-EB": 300,
                    "NG-ED": 2920,
                }
            };
        },
        computed: {

        },
        created() {

        },
        mounted() {
            this.$nextTick(()=>{
                this.initMap();
            });
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

