<style scoped>
    
</style>
<template>
    <div class="content">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header card-header-icon card-header-success">
                            <div class="card-icon">
                                <i class="material-icons">ballot</i>
                            </div>
                        </div>
                        <div class="card-body">
                            <h4 class="card-title">
                                Edit Election <br>
                                <small>
                                    {{ state + "[" + type + "]" }}
                                </small>
                            </h4>
                            <form v-show="show_form">
                                <div class="form-group">
                                    <label for="">
                                        Title
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <input v-model="uElection.title" type="text" class="form-control" />
                                    <small v-show="!validations.title.is_valid" 
                                        class="form-text text-muted text-danger">
                                        {{ validations.title.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label>
                                        Date
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <input v-model="uElection.date" type="text" 
                                        class="form-control" placeholder="yyyy-mm-dd" />
                                    <small v-show="!validations.date.is_valid" 
                                        class="form-text text-muted text-danger">
                                        {{ validations.date.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">Registered Voters</label>
                                    <input type="text" class="form-control" v-model="uElection.registered_voters" />
                                    <small v-show="!validations.registered_voters.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.registered_voters.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">Accredited Voters</label>
                                    <input type="text" class="form-control" v-model="uElection.accredited_voters" />
                                    <small v-show="!validations.accredited_voters.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.accredited_voters.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">Votes Cast</label>
                                    <input type="text" class="form-control" v-model="uElection.votes_cast" />
                                    <small v-show="!validations.votes_cast.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.votes_cast.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">Valid Votes</label>
                                    <input type="text" class="form-control" v-model="uElection.valid_votes" />
                                    <small v-show="!validations.valid_votes.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.valid_votes.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">Rejected Voters</label>
                                    <input type="text" class="form-control" v-model="uElection.rejected_votes" />
                                    <small v-show="!validations.rejected_votes.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.rejected_votes.text }}
                                    </small>
                                </div>

                                <button @click="updateElection(uElection)" type="button" class="btn btn-success">Submit</button>
                            </form>
                        </div>
                        <div class="card-footer"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { HELPERS } from '../../helpers.js';

    export default {
        data() {
            return {
                state: '',
                type: '',
                uElection: {
                    id: '',
                    title: '',
                    registered_voters: '',
                    accredited_voters: '',
                    votes_cast: '',
                    valid_votes: '',
                    rejected_votes: '',
                    date: ''
                },
                HF: HELPERS,
                show_form: true,
                validations: {
                    title: {
                        is_valid: true,
                        text: ''
                    },
                    registered_voters: {
                        is_valid: true,
                        text: ''
                    },
                    accredited_voters: {
                        is_valid: true,
                        text: ''
                    },
                    votes_cast: {
                        is_valid: true,
                        text: ''
                    },
                    valid_votes: {
                        is_valid: true,
                        text: ''
                    },
                    rejected_votes: {
                        is_valid: true,
                        text: ''
                    },
                    date: {
                        is_valid: true,
                        text: ''
                    }
                }
            }
        },
        computed: {
            election() {
                return this.$store.getters.getElection;
            },
            electionLoadStatus() {
                return this.$store.getters.getElectionLoadStatus;
            },
            user() {
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            },
            updateElectionLoadStatus() {
                return this.$store.getters.getUpdateElectionLoadStatus;
            },
            updateElectionResult() {
                return this.$store.getters.getUpdateElectionResult;
            }
        },
        watch: {
            updateElectionLoadStatus: function() {
                let vm = this;
                if(vm.updateElectionLoadStatus == 3 && vm.updateElectionResult.success == 0) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updateElectionResult.message, 
                        'danger'
                    );
                } else if(vm.updateElectionLoadStatus == 2 && vm.updateElectionResult.success == 1) {
                    //vm.show_form = false;
                    //vm.clearElectionForm();
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updateElectionResult.message, 
                        'success'
                    );
                } 
            },

            electionLoadStatus: function(val) {
                if(val == 2) {
                    this.uElection.id = this.election.id;
                    this.uElection.title = this.election.title;
                    this.uElection.registered_voters = (this.election.registered_voters !== "Not Available") ? this.election.registered_voters : '';
                    this.uElection.accredited_voters = (this.election.accredited_voters !== "Not Available") ? this.election.accredited_voters : '';
                    this.uElection.votes_cast = (this.election.votes_cast !== "Not Available") ? this.election.votes_cast : '';
                    this.uElection.valid_votes = (this.election.valid_votes !== "Not Available") ? this.election.valid_votes : '';
                    this.uElection.rejected_votes = (this.election.rejected_votes !== "Not Available") ? this.election.rejected_votes : '';
                    this.uElection.date = this.election.date;
                    this.state = this.election.state.name;
                    this.type = this.election.election_type_name;
                }
            }
        },
        created() {
            this.$store.dispatch('getElection', {
                id: this.$route.params.electionId
            });
        },
        mounted() {

        },
        methods: {
            updateElection(data) {
                if(this.validateElection(data)) {
                    this.$store.dispatch('updateElection', data);
                }
            },
            validateElection(uElection) {
                let validElection = true;
                let validations = this.validations;

                if(!uElection.title) {
                    validElection = false;
                    validations.title.is_valid = false;
                    validations.title.text = "enter a title for the election";
                }

                if(!uElection.date) {
                    validElection = false;
                    validations.date.is_valid = false;
                    validations.date.text = "election date can not be empty";
                }

                return validElection;
            }
        }
    }
</script>
