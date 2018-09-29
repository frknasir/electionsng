<style scoped>

</style>
<template>
    <div>
        <div class="card card-stats mx-auto">
            <div class="card-header card-header-warning card-header-icon">
                <div class="card-icon">
                <i class="material-icons">group</i>
                </div>
                <p class="card-category">Registered Voters</p>
                <h3 class="card-title">{{ election.registered_voters }}</h3>
            </div>
            <div class="card-footer">
                <div class="stats">
                    <a>From INEC</a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                    <div class="card-icon">
                    <i class="material-icons">group</i>
                    </div>
                    <p class="card-category">Accredited</p>
                    <h3 class="card-title">{{ election.accredited_voters }}</h3>
                </div>
                <div class="card-footer">
                    <div class="stats">
                        <a>From INEC</a>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="card card-stats">
                <div class="card-header card-header-rose card-header-icon">
                    <div class="card-icon">
                    <i class="material-icons">group</i>
                    </div>
                    <p class="card-category">Votes Cast</p>
                    <h3 class="card-title">{{ election.votes_cast }}</h3>
                </div>
                <div class="card-footer">
                    <div class="stats">
                        <a>From INEC</a>
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
                    <p class="card-category">Valid Votes</p>
                    <h3 class="card-title">{{ election.valid_votes }}</h3>
                </div>
                <div class="card-footer">
                    <div class="stats">
                        <a>From INEC</a>
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
                    <p class="card-category">Rejected Votes</p>
                    <h3 class="card-title">{{ election.rejected_votes }}</h3>
                </div>
                <div class="card-footer">
                    <div class="stats">
                        <a>From INEC</a>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
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

