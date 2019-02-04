<style scoped>

</style>
<template>
    <div>
        <div class="card card-stats mx-auto">
            <div class="card-header card-header-warning card-header-icon">
                <div class="card-icon">
                <i class="material-icons">group</i>
                </div>
                <p class="card-category">Total Elections</p>
                <h3 class="card-title">{{ metrics.elections }}</h3>
            </div>
            <div class="card-footer">
                <div class="stats">
                    <a>all elections</a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="card card-stats">
                <div class="card-header card-header-rose card-header-icon">
                    <div class="card-icon">
                    <i class="material-icons">group</i>
                    </div>
                    <p class="card-category">Incidents</p>
                    <h3 class="card-title">{{ metrics.incidents }}</h3>
                </div>
                <div class="card-footer">
                    <div class="stats">
                        <a>total # of incidents</a>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="card card-stats">
                <div class="card-header card-header-success card-header-icon">
                    <div class="card-icon">
                    <i class="material-icons">ballot</i>
                    </div>
                    <p class="card-category">Updates</p>
                    <h3 class="card-title">{{ metrics.updates }}</h3>
                </div>
                <div class="card-footer">
                    <div class="stats">
                        <a>total # of updates</a>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                    <div class="card-icon">
                    <i class="material-icons">group</i>
                    </div>
                    <p class="card-category">Polling Pictures</p>
                    <h3 class="card-title">{{ metrics.pictures }}</h3>
                </div>
                <div class="card-footer">
                    <div class="stats">
                        <a>total # of pictures</a>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="card card-stats">
                <div class="card-header card-header-info card-header-icon">
                    <div class="card-icon">
                    <i class="material-icons">ballot</i>
                    </div>
                    <p class="card-category">Volunteers</p>
                    <h3 class="card-title">{{ metrics.users }}</h3>
                </div>
                <div class="card-footer">
                    <div class="stats">
                        <a>total # of volunteers</a>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            };
        },
        computed: {
            metrics() {
                return this.$store.getters.getMetrics;
            },
            metricsLoadStatus() {
                return this.$store.getters.getMetricsLoadStatus;
            }
        },
        created() {
            this.$store.dispatch("loadMetrics");
        }
    }
</script>

