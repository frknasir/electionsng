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
            <bar-chart :messages="{empty: 'No data'}" :data="'/api/v1/election/'+election.id+'/viz/finalResults'"
            height="460px" :refresh="60"></bar-chart>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                
            }
        },
        created() {

        },
        mounted() {

        },
        computed: {
            election() {
                return this.$store.getters.getElection;
            }
        },
        methods: {

        }
    }
</script>
