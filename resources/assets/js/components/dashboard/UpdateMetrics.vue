<style scoped>

</style>
<template>
    <div class="card">
        <div class="card-header card-header-icon card-header-warning">
            <div class="card-icon">
                <i class="material-icons">insert_chart</i>
            </div>
            <h4 class="card-title">Locations With Most Updates
                <small></small>
            </h4>
        </div>
        <div class="card-body">
            <line-chart :messages="{empty: 'No data'}" :data="url+'/election/'+election.id+'/viz/location/mostUpdates'" 
            height="460px"></line-chart>
        </div>
    </div>
</template>
<script>
    import { CONFIG } from '../../config.js';

    export default {
        data() {
            return {
                url: CONFIG.API_URL
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
