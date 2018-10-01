<style scoped>

</style>
<template>
    <div class="card">
        <div class="card-header card-header-icon card-header-success">
            <div class="card-icon">
                <i class="material-icons">insert_chart</i>
            </div>
            <h4 class="card-title">Charts
                <small></small>
            </h4>
        </div>
        <div class="card-body">
            <bar-chart :messages="{empty: 'No data'}" :data="chartData"></bar-chart>
        </div>
    </div>
</template>
<script>
    export default {
        props: [
            'chartdata'
        ],
        data() {
            return {
                chartData: this.chartdata
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
