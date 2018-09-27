<style scoped>

</style>
<template>
    <div class="content">
        <div class="container-fluid">
            <!-- Election metrics Card -->
            <election-metrics></election-metrics>
            <!-- End Election metrics Card -->

            <!-- Update Metrics -->
            <update-metrics></update-metrics>
            <!-- /Update Metrics -->

            <!-- Incident Metrics -->
            <incident-metrics></incident-metrics>
            <!-- /Incident Metrics -->

            <!-- Result Metrics -->
            <result-metrics></result-metrics>
            <!-- /Result Metrics -->
            
        </div>
    </div>
</template>
<script>
    import ElectionMetrics from '../components/dashboard/ElectionMetrics.vue';
    import UpdateMetrics from '../components/dashboard/UpdateMetrics.vue';
    import IncidentMetrics from '../components/dashboard/IncidentMetrics.vue';
    import ResultMetrics from '../components/dashboard/ResultMetrics.vue';

    export default {
        components: {
            ElectionMetrics,
            UpdateMetrics,
            IncidentMetrics,
            ResultMetrics
        },
        computed: {
            election() {
                return this.$store.getters.getElection;
            },
            electionLoadStatus() {
                return this.$store.getters.getElectionLoadStatus;
            }
        }
    }
</script>
