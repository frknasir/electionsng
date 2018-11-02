<style scoped>

</style>
<template>
    <div class="card">
        <div class="card-header card-header-icon card-header-rose">
            <div class="card-icon">
                <i class="material-icons">insert_chart</i>
            </div>
            <h4 class="card-title">Locations With Most Incidents
                <small></small>
            </h4>
        </div>
        <div class="card-body">
            <column-chart :messages="{empty: 'No data'}" :data="url+'/election/'+election.id+'/viz/location/mostIncidents'"
            height="460px"></column-chart>
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
