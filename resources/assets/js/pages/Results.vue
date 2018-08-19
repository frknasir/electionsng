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
                                <li class="nav-item">
                                    <a class="nav-link" href="#final-results" data-toggle="tab">
                                        Final Results
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
                        <div class="tab-pane" id="final-results">
                            <final-results :election_id="''"></final-results>                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import BrowseResults from '../components/results/BrowseResults.vue';
    import FinalResults from '../components/results/FinalResults.vue';

    export default {
        components: {
            BrowseResults,
            FinalResults
        }
    }
</script>
