<style scoped>

</style>
<template>
    <bar-chart title="Locations With Most Updates" :data="data" height="460px"></bar-chart>
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
                        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
                        [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695],
                        [34, 345, 543, 432, 566, 343, 231, 456, 433, 123, 467, 234]
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
