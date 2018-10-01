<style scoped>

</style>
<template>
    <div class="card">
        <div class="card-header card-header-icon card-header-warning">
            <div class="card-icon">
                <i class="material-icons">insert_chart</i>
            </div>
            <h4 class="card-title">Locations With Most Updates
                <small>- Bar Chart</small>
            </h4>
        </div>
        <div class="card-body">
            <line-chart :data="chartData" :download="true"></line-chart>
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
