<style scoped>
    
</style>
<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header card-header-icon card-header-success">
                            <div class="card-icon">
                                <i class="material-icons">person_add</i>
                            </div>
                        </div>
                        <div class="card-body">
                            <form v-show="show_form">
                                <div class="form-group">
                                    <label for="">
                                        Political Party
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <select v-model="candidt.political_party_id" class="form-control">
                                        <option v-for="party in politicalParties" v-bind:key="party.id" :value="party.id">
                                            {{ party.name + " ["+party.initials+"]" }}
                                        </option>
                                    </select>
                                    <small v-show="!validations.political_party_id.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.political_party_id.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">
                                        Election
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <input v-model="candidt.election_id" type="text" class="form-control" disabled />
                                    <small class="form-text text-muted">{{ election.title + "["+ election.id + "]" }}</small>
                                </div>
                                <div class="form-group">
                                    <label for="">
                                        Aspirant
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <input type="text" class="form-control" v-model="candidt.aspirant" />
                                    <small v-show="!validations.aspirant.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.aspirant.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">Deputy</label>
                                    <input type="text" class="form-control" v-model="candidt.deputy" />
                                    <small v-show="!validations.deputy.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.deputy.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="bio-editor">
                                        Biography
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <textarea id="bio-editor" cols="30" rows="10"></textarea>
                                    <small v-show="!validations.bio.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.bio.text }}
                                    </small>
                                </div>

                                <button @click="updateCandidate(candidt)" type="submit" class="btn btn-success">Submit</button>
                            </form>
                            <div v-show="!show_form" class="alert alert-success" role="alert">
                                {{ updateCandidateResult.message }}
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

    export default {
        data() {
            return {
                candidt: {
                    id: this.$route.params.candidateId,
                    political_party_id: '',
                    election_id: '',
                    aspirant: '',
                    deputy: '',
                    bio: ''
                },
                bio_editor: null,
                HF: HELPERS,
                show_form: true,
                validations: {
                    political_party_id: {
                        is_valid: true,
                        text: ''
                    },
                    election_id: {
                        is_valid: true,
                        text: ''
                    },
                    aspirant: {
                        is_valid: true,
                        text: ''
                    },
                    deputy: {
                        is_valid: true,
                        text: ''
                    },
                    bio: {
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
            politicalParties() {
                return this.$store.getters.getPoliticalParties;
            },
            politicalPartiesLoadStatus() {
                return this.$store.getters.getPoliticalPartiesLoadStatus;
            },
            user() {
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            },
            candidate() {
                return this.$store.getters.getCandidate;
            },
            candidateLoadStatus() {
                return this.$store.getters.getCandidateLoadStatus;
            },
            updateCandidateLoadStatus() {
                return this.$store.getters.getUpdateCandidateLoadStatus;
            },
            updateCandidateResult() {
                return this.$store.getters.getUpdateCandidateResult;
            }
        },
        watch: {
            updateCandidateLoadStatus: function() {
                let vm = this;
                if(vm.updateCandidateLoadStatus == 3 && vm.updateCandidateResult.success == 0) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updateCandidateResult.message, 
                        'danger'
                    );
                } else if(vm.updateCandidateLoadStatus == 2 && vm.updateCandidateResult.success == 1) {
                    //vm.show_form = false;
                    //vm.clearCandidateForm();
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updateCandidateResult.message, 
                        'success'
                    );
                } 
            },
            candidateLoadStatus: function() {
                let vm = this;
                if(vm.candidateLoadStatus == 2) {
                    vm.candidt.political_party_id = vm.candidate.party_id;
                    vm.candidt.election_id = vm.candidate.election_id;
                    vm.candidt.aspirant = vm.candidate.aspirant;
                    vm.candidt.deputy = vm.candidate.deputy;
                    vm.bio_editor.setData(vm.candidate.bio);
                }
            }
        },
        created() {
            this.$store.dispatch('getPoliticalParties');
            this.$store.dispatch('getCandidate', {
                id: this.$route.params.candidateId
            });
        },
        mounted() {
            this.initClassicEditor();
        },
        methods: {
            initClassicEditor() {
                let vm = this;
                ClassicEditor
                    .create( document.querySelector( '#bio-editor' ) )
                    .then( editor => {
                        vm.bio_editor = editor;
                    } )
                    .catch( error => {
                        console.error( error );
                    } );
            },
            updateCandidate(data) {
                data.political_party_id = this.candidt.political_party_id;
                data.election_id = this.election.id;
                data.bio = this.bio_editor.getData();

                if(this.validateCandidate(data)) {
                    this.$store.dispatch('updateCandidate', data);
                }
            },
            validateCandidate(candidate) {
                let validCandidate = true;
                let validations = this.validations;

                if(!candidate.political_party_id) {
                    validCandidate = false;
                    validations.political_party_id.is_valid = false;
                    validations.political_party_id.text = "select a political party";
                    console.log(candidate.political_party_id);
                }

                if(!candidate.election_id) {
                    validCandidate = false;
                    validations.election_id.is_valid = false;
                    validations.election_id.text = "select an election";
                }

                if(!candidate.aspirant) {
                    validCandidate = false;
                    validations.aspirant.is_valid = false;
                    validations.aspirant.text = "enter aspirant's name";
                }

                if(!candidate.bio) {
                    validCandidate = false;
                    validations.bio.is_valid = false;
                    validations.bio.text = "candidate's bio can not be empty";
                }

                return validCandidate;
            },
            clearCandidateForm() {
                this.candidate.political_party_id = '';
                this.candidate.election_id = '';
                this.candidate.aspirant = '';
                this.candidate.deputy = '';
                this.bio_editor.setData('');

                this.validations = {
                    political_party_id: {
                        is_valid: true,
                        text: ''
                    },
                    election_id: {
                        is_valid: true,
                        text: ''
                    },
                    aspirant: {
                        is_valid: true,
                        text: ''
                    },
                    deputy: {
                        is_valid: true,
                        text: ''
                    },
                    bio: {
                        is_valid: true,
                        text: ''
                    }
                }
            }
        }
    }
</script>
