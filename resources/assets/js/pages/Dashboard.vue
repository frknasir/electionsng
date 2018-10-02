<style scoped>
    
</style>
<template> 
    <div class="content">
        <div class="container-fluid">

            <!-- HeatMap -->
            <heatmap-component></heatmap-component>
            <!-- /HeatMap -->

            <!-- Election metrics Card -->
            <election-metrics></election-metrics>
            <!-- End Election metrics Card -->

            <!-- Update Metrics -->
            <update-metrics></update-metrics>
            <!-- /Update Metrics -->

            <!-- Incident Metrics -->
            <incident-metrics></incident-metrics>
            <!-- /Incident Metrics -->

            <!-- Final Result Metrics -->
            <result-metrics></result-metrics>
            <!-- /Final Result Metrics -->
        </div>
    </div>
</template>
<script>
    import HeatmapComponent from '../components/dashboard/HeatmapComponent.vue';
    import ElectionMetrics from '../components/dashboard/ElectionMetrics.vue';
    import UpdateMetrics from '../components/dashboard/UpdateMetrics.vue';
    import IncidentMetrics from '../components/dashboard/IncidentMetrics.vue';
    import ResultMetrics from '../components/dashboard/ResultMetrics.vue';

    export default {
        components: {
            HeatmapComponent,
            ElectionMetrics,
            UpdateMetrics,
            IncidentMetrics,
            ResultMetrics
        },
        data() {
            return {
                
            }
        },
        created() {
            this.$store.dispatch("getElection", {
                id: this.$route.params.id
            });
        },
        mounted() {

        },
        computed: {
            election() {
                return this.$store.getters.getElection;
            },
            electionLoadStatus() {
                return this.$store.getters.getElectionLoadStatus;
            }
        },
        methods: {
            
        }
    }
</script>
