<style scoped>

</style>
<template>
    <div class="card">
        <div class="card-header card-header-icon card-header-rose">
            <div class="card-icon">
                <i class="material-icons">insert_chart</i>
            </div>
            <h4 class="card-title">Locations With Most Incidents
                <small>- Bar Chart</small>
            </h4>
        </div>
        <div class="card-body">
            <column-chart :data="chartData"></column-chart>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                chartData: [["Jan", 4], ["Feb", 2], ["Mar", 10], ["Apr", 5], ["May", 3]]
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
