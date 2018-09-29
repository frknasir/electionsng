<style scoped>

</style>
<template>
    <div class="card">
        <div class="card-header card-header-icon card-header-rose">
            <div class="card-icon">
                <i class="material-icons">insert_chart</i>
            </div>
            <h4 class="card-title">{{ barchart_title }}
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
        props: {
            data: Object,
            title: String,
            height: String,
        },
        data() {
            return {
                barchart_title: this.title
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
