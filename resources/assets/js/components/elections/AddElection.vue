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
                            <h4 class="card-title">Add Election</h4>
                            <form v-show="show_form">
                                <div class="form-group">
                                    <label for="">
                                        Election Type
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <select v-model="election.election_type_id" class="form-control">
                                        <option v-for="type in electionTypes" v-bind:key="type.id" :value="type.id">
                                            {{ type.name }}
                                        </option>
                                    </select>
                                    <small v-show="!validations.election_type_id.is_valid" 
                                        class="form-text text-muted text-danger">
                                        {{ validations.election_type_id.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">
                                        Electoral Area
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <select v-model="election.state_id" class="form-control">
                                        <option v-for="state in states" v-bind:key="state.id" :value="state.id">
                                            {{ state.name }}
                                        </option>
                                    </select>
                                    <small v-show="!validations.state_id.is_valid"
                                        class="form-text text-muted text-danger">
                                        {{ validations.state_id.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">
                                        Title
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <input v-model="election.title" type="text" class="form-control" />
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
                                    <input v-model="election.date" type="text" 
                                        class="form-control" placeholder="yyyy-mm-dd" />
                                    <small v-show="!validations.date.is_valid" 
                                        class="form-text text-muted text-danger">
                                        {{ validations.date.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">Registered Voters</label>
                                    <input type="text" class="form-control" v-model="election.registered_voters" />
                                    <small v-show="!validations.registered_voters.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.registered_voters.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">Accredited Voters</label>
                                    <input type="text" class="form-control" v-model="election.accredited_voters" />
                                    <small v-show="!validations.accredited_voters.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.accredited_voters.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">Votes Cast</label>
                                    <input type="text" class="form-control" v-model="election.votes_cast" />
                                    <small v-show="!validations.votes_cast.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.votes_cast.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">Valid Votes</label>
                                    <input type="text" class="form-control" v-model="election.valid_votes" />
                                    <small v-show="!validations.valid_votes.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.valid_votes.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">Rejected Voters</label>
                                    <input type="text" class="form-control" v-model="election.rejected_votes" />
                                    <small v-show="!validations.rejected_votes.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.rejected_votes.text }}
                                    </small>
                                </div>

                                <button v-if="addElectionLoadStatus != 1" @click="addElection(election)" type="button" 
                                    class="btn btn-success">Submit</button>

                                <action-loader class="text-left" :loading='addElectionLoadStatus == 1' 
                                    :color="'#4caf50'"></action-loader>
                            </form>
                            <div v-show="!show_form" class="alert alert-success" role="alert">
                                {{ addElectionResult.message }}
                                <a @click="addAnother()" class="alert-link">
                                    &nbsp;Add Another election
                                </a>
                            </div>
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
    import ActionLoader from 'vue-spinner/src/ClipLoader.vue';

    export default {
        components: {
            ActionLoader
        },
        data() {
            return {
                election: {
                    title: '',
                    election_type_id: '',
                    state_id: '',
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
                    election_type_id: {
                        is_valid: true,
                        text: ''
                    },
                    state_id: {
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
            electionTypes() {
                return this.$store.getters.getElectionTypes;
            },
            electionTypesLoadStatus() {
                return this.$store.getters.getElectionTypesLoadStatus;
            },
            states() {
                return this.$store.getters.getStates;
            },
            statesLoadStatus() {
                return this.$store.getters.getStatesLoadStatus;
            },
            user() {
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            },
            addElectionLoadStatus() {
                return this.$store.getters.getAddElectionLoadStatus;
            },
            addElectionResult() {
                return this.$store.getters.getAddElectionResult;
            }
        },
        watch: {
            addElectionLoadStatus: function() {
                let vm = this;
                if(vm.addElectionLoadStatus == 3 && vm.addElectionResult.success == 0) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.addElectionResult.message, 
                        'danger'
                    );
                } else if(vm.addElectionLoadStatus == 2 && vm.addElectionResult.success == 1) {
                    vm.show_form = false;
                    vm.clearElectionForm();
                } 
            }
        },
        created() {
            this.$store.dispatch('getElectionTypes');
            this.$store.dispatch('getStates');
        },
        mounted() {

        },
        methods: {
            addElection(data) {
                if(this.validateElection(data)) {
                    this.$store.dispatch('addElection', data);
                }
            },
            addAnother() {
                this.addElectionResult.result = 0;
                this.addElectionResult.message = '';
                this.show_form = true;
            },
            validateElection(election) {
                let validElection = true;
                let validations = this.validations;

                if(!election.title) {
                    validElection = false;
                    validations.title.is_valid = false;
                    validations.title.text = "enter a title for the election";
                }

                if(!election.election_type_id) {
                    validElection = false;
                    validations.election_type_id.is_valid = false;
                    validations.election_type_id.text = "select an election type";
                }

                if(!election.state_id) {
                    validElection = false;
                    validations.state_id.is_valid = false;
                    validations.state_id.text = "select an electoral area";
                }

                if(!election.date) {
                    validElection = false;
                    validations.date.is_valid = false;
                    validations.date.text = "Election date can not be empty";
                }

                return validElection;
            },
            clearElectionForm() {
                this.title = '';
                this.election_type_id = '';
                this.state_id = '';
                this.registered_voters = '';
                this.accredited_voters = '';
                this.votes_cast = '';
                this.valid_votes = '';
                this.rejected_votes = '';
                this.date = '';

                this.validations = {
                    title: {
                        is_valid: true,
                        text: ''
                    },
                    election_type_id: {
                        is_valid: true,
                        text: ''
                    },
                    state_id: {
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
        }
    }
</script>
