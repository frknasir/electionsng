<style scoped>

</style>
<template>
    <bar-chart title="Locations With Most Incidents" :data="data" height="460px"></bar-chart>
</template>
<script>
    import BarChart from '../global/BarChart.vue';

    export default {
        components: {
            BarChart
        },
        data() {
            return {
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    series: [
                        [42, 43, 20, 70, 53, 43, 26, 34, 68, 10, 56, 85]
                    ]
                }
            }
        },
        created() {

        },
        mounted() {

        },
        computed: {

        },
        methods: {

        }
    }
</script>
