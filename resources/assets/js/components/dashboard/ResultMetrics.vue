<style scoped>

</style>
<template>
    <div class="card">
        <div class="card-header card-header-icon card-header-rose">
            <div class="card-icon">
                <i class="material-icons">insert_chart</i>
            </div>
            <h4 class="card-title">Final Results
                <small>- Bar Chart</small>
            </h4>
        </div>
        <div class="card-body">
            <bar-chart :messages="{empty: 'No data'}" :data="chartData"></bar-chart>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                chartData: [["APC", 4], ["PDP", 2], ["APGA", 10], ["SDP", 5], ["SSD", 3]]
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
