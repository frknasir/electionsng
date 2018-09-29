<style scoped>

</style>
<template>
    <div class="card">
        <div class="card-header card-header-icon card-header-rose">
            <div class="card-icon">
                <i class="material-icons">insert_chart</i>
            </div>
            <h4 class="card-title">Locations With Most Updates
                <small>- Bar Chart</small>
            </h4>
        </div>
        <div class="card-body">
            <div id="barChart" class="ct-chart"></div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    series: [
                        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
                        [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
                    ]
                }
            }
        },
        created() {

        },
        mounted() {
            let vm = this;

            vm.$nextTick(function() {
                vm.initBarChart(vm.data, vm.height);
            })
        },
        computed: {

        },
        methods: {
            initBarChart(data, height) {
                var data = data;

                var optionsbarChart = {
                    seriesBarDistance: 10,
                    axisX: {
                        showGrid: false
                    },
                    height: height
                };

                var responsiveOptionsBarChart = [
                    ['screen and (max-width: 640px)', {
                        seriesBarDistance: 5,
                        axisX: {
                            labelInterpolationFnc: function(value) {
                                return value[0];
                            }
                        }
                    }]
                ];

                var barChart = Chartist.Bar('#barChart', data, optionsbarChart, responsiveOptionsBarChart);

                //start animation for the Emails Subscription Chart
                md.startAnimationForBarChart(barChart);
            }
        }
    }
</script>
