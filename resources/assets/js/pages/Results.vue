<style scoped>

</style>
<template>
    <div class="content">
        <div class="container-fluid">
            
            <div class="card card-nav-tabs">
                <div class="card-header card-header-success">
                    <!-- colors: "header-primary", "header-info", "header-success", "header-warning", "header-danger" -->
                    <div class="nav-tabs-navigation">
                        <div class="nav-tabs-wrapper">
                            <ul class="nav nav-tabs" data-tabs="tabs">
                                <li class="nav-item">
                                    <a class="nav-link active" href="#browse-results" data-toggle="tab">
                                        Browse Results
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="card-body ">
                    <div class="tab-content">
                        <div class="tab-pane active" id="browse-results">
                            <browse-results :election_id="''"></browse-results>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="card card-stats">
                        <div class="card-header card-header-warning card-header-icon">
                            <div class="card-icon">
                                <i class="material-icons">ballot</i>
                            </div>
                            <p class="card-category">State</p>
                            <h3 class="card-title">2/184</h3>
                        </div>
                        <div class="card-footer">
                            <div class="stats">
                                <i class="material-icons text-danger">warning</i>
                                Results collected from State level
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="card card-stats">
                        <div class="card-header card-header-rose card-header-icon">
                            <div class="card-icon">
                                <i class="material-icons">ballot</i>
                            </div>
                            <p class="card-category">Local Gov</p>
                            <h3 class="card-title">75/344</h3>
                        </div>
                        <div class="card-footer">
                            <div class="stats">
                                <i class="material-icons text-danger">warning</i>
                                Results collected from LG level
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
                            <p class="card-category">Reg. Area</p>
                            <h3 class="card-title">24/40</h3>
                        </div>
                        <div class="card-footer">
                            <div class="stats">
                                <i class="material-icons text-danger">warning</i>
                                Results collected from LG level
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
                            <p class="card-category">P. Unit</p>
                            <h3 class="card-title">24/50</h3>
                        </div>
                        <div class="card-footer">
                            <div class="stats">
                                <i class="material-icons text-danger">warning</i> 
                                Just Updated
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import BrowseResults from '../components/results/BrowseResults.vue';

    export default {
        components: {
            BrowseResults
        },
        created() {
            this.$store.dispatch('getCollationStats', {
                election_id: this.election.id
            });
        },
        computed: {
            election() {
                return this.$store.getters.getElection;
            },
            collationStats() {
                return this.$store.getters.getCollationStats;
            },
            collationStatsLoadStatus() {
                return this.$store.getters.getCollationStatsLoadStatus;
            }
        }
    }
</script>
