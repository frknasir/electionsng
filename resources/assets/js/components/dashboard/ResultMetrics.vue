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
            <bar-chart :messages="{empty: 'No data'}" :data="url+'/election/'+election.id+'/viz/finalResults'"
            height="460px"></bar-chart>
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
