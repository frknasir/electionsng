<style scoped>

</style>
<template>
    <bar-chart title="Final Results From INEC" :data="data" height="460px"></bar-chart>
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
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    series: [
                        [5, 3, 3, 7, 3, 4, 6, 4, 5, 6, 7, 8],
                        [4, 3, 0, 8, 4, 3, 3, 6, 3, 4, 6, 6]
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
