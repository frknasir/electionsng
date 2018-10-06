<style scoped>
    /*
	Max width before this PARTICULAR table gets nasty. 
    This query will take effect for any screen smaller 
    than 760px and also iPads specifically.
	*/
	@media
    only screen 
    and (max-width: 760px), (min-device-width: 768px) 
    and (max-device-width: 1024px)  {

		/* Force table to not be like tables anymore */
		table, thead, tbody, th, td, tr {
			display: block;
		}

		/* Hide table headers (but not display: none;, for accessibility) */
		thead tr {
			position: absolute;
			top: -9999px;
			left: -9999px;
		}

		td:before {
			/* Now like a table header */
			position: relative;
			/* Top/left values mimic padding */
			top: 0;
			left: 6px;
			width: 45%;
			padding-right: 50px;
			white-space: nowrap;
		}

		/*
		Label the data
        You could also use a data-* attribute and content 
        for this. That way "bloats" the HTML, this way 
        means you need to keep HTML and CSS in sync. 
        Lea Verou has a clever way to handle with text-shadow.
		*/
		td:nth-of-type(1):before { content: "Id: "; }
		td:nth-of-type(2):before { content: "Party: "; }
		td:nth-of-type(3):before { content: "Candidate: "; }
		td:nth-of-type(4):before { content: "Votes: "; } 
        td:nth-of-type(5):before { content: "Actions: "; }
	}
</style>
<template>
    <div>
        <div id="toolbar">
            <div v-if="election.election_type_id == 1" class="form-check form-check-radio form-check-inline">
                <label class="form-check-label">
                    <input class="form-check-input" type="radio" 
                        name="pu-location_type"  
                        value="state" v-model="location_type"> State
                    <span class="circle">
                        <span class="check"></span>
                    </span>
                </label>
            </div>
            <div class="form-check form-check-radio form-check-inline">
                <label class="form-check-label">
                    <input class="form-check-input" type="radio" 
                        name="pu-location_type"  
                        value="lg" v-model="location_type"> Local Government
                    <span class="circle">
                        <span class="check"></span>
                    </span>
                </label>
            </div>
            <div class="form-check form-check-radio form-check-inline disabled">
                <label class="form-check-label">
                    <input class="form-check-input" type="radio" 
                        name="pu-location_type" 
                        value="ra" v-model="location_type"> Registration Area
                    <span class="circle">
                        <span class="check"></span>
                    </span>
                </label>
            </div>
            <div class="form-check form-check-radio form-check-inline disabled">
                <label class="form-check-label">
                    <input class="form-check-input" type="radio" 
                        name="pu-location_type" 
                        value="pu" v-model="location_type"> Polling Unit
                    <span class="circle">
                        <span class="check"></span>
                    </span>
                </label>
            </div>
        </div>
        <div class="mb-3">
            <form>
                <div class="form-row">
                    <div v-show="election.election_type_id == 1 && (location_type === 'state' || location_type === 'lg' || location_type === 'ra' || location_type === 'pu')" 
                        class="col">
                        <label for="state">State</label>
                        <select v-model="state_slct" class="form-control">
                            <option class="disabled" disabled>choose state</option>
                            <option v-for="state in states" v-bind:key="state.id" :value="state.id">
                                {{ state.name }}
                            </option>
                        </select>
                    </div>
                    <div v-show="location_type === 'lg' || location_type === 'ra' || location_type === 'pu'" 
                        class="col">
                        <label for="lg">Local Government</label>
                        <select v-model="lg_slct" class="form-control">
                            <option class="disabled" disabled>choose Local Government</option>
                            <option v-for="lg in localGovernments" v-bind:key="lg.id" :value="lg.id">
                                {{ lg.name }}
                            </option>
                        </select>
                    </div>
                    <div v-show="location_type === 'ra' || location_type === 'pu'"
                        class="col">
                        <label for="ra">Registration Area</label>
                        <select v-model="ra_slct" class="form-control">
                            <option class="disabled" disabled>choose Registration Area</option>
                            <option v-for="ra in registrationAreas" v-bind:key="ra.id" :value="ra.id">
                                {{ ra.name }}
                            </option>
                        </select>
                    </div>
                    <div v-show="location_type === 'pu'" class="col">
                        <label for="pu">Polling Unit</label>
                        <select v-model="pu_slct" class="form-control">
                            <option v-for="pu in pollingUnits" v-bind:key="pu.id" :value="pu.id">
                                {{ pu.code }}
                            </option>
                        </select>
                    </div>
                </div>
                <button @click="getResults(location_type)" v-show="location_type !== null" 
                    type="button" class="btn btn-success">
                    Get Results
                </button>
            </form>
        </div>
        <div class="text-center">
            <h2 class="title title-modern">{{ forr.location_type + forr.location_name }}</h2>
        </div>
        <table id="final-results-dt" class="table table-success table-striped table-bordered">
            <thead>
                <tr>
                    <th role="columnheader">Id</th>
                    <th role="columnheader">Party</th>
                    <th role="columnheader">Candidate</th>
                    <th role="columnheader">Votes</th>
                    <th role="columnheader" v-if="userLoadStatus == 2 && user != {}">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(result,index) in results" v-bind:key="result.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ result.party }}</td>
                    <td>{{ result.candidate_name }}</td>
                    <td>{{ result.votes }}</td>
                    <td v-if="userLoadStatus == 2 && user != {}" class="td-actions">
                        <button v-if="result.votes !== 'Not Available'" rel="tooltip" class="btn btn-success" 
                            data-toggle="modal" data-target="#updateResultModal" 
                            :data-id="result.id" :data-votes="result.votes" 
                            :data-party="result.party">
                            <i class="material-icons">edit</i>
                        </button>
                        <button v-else rel="tooltip" class="btn btn-success" 
                            data-toggle="modal" data-target="#addResultModal"
                            :data-locationid="result.location_id" :data-locationtype="result.location_type" 
                            :data-partyid="result.party_id" :data-party="result.party">
                            <i class="material-icons">add</i>
                        </button>
                        <button @click="deleteResult(result.id)" type="button" rel="tooltip" class="btn btn-danger">
                            <i class="material-icons">close</i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <bar-chart height="460px" :title="forr.location_name" xtitle="Candidates" 
        ytitle="Votes" :messages="{empty: 'No data'}" :data="chartData"></bar-chart>
    
        <!-- Add Result Modal -->
        <!-- Modal -->
        <div class="modal fade" id="addResultModal" tabindex="-1" role="dialog" 
            aria-labelledby="addResultModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="updateResultModalLabel">
                            Add Result <br>
                            <small>
                                {{ forr.location_type + forr.location_name }}
                            </small>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label>Political Party</label>
                                <input type="text" class="form-control" 
                                    id="add-result-party" disabled>
                            </div>
                            <div class="form-group">
                                <label>Votes</label>
                                <input v-model="new_result.votes" type="number" class="form-control" 
                                    id="add-result-votes" placeholder="votes">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button @click="addResult(new_result)" type="button" class="btn btn-primary">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /End Add Result Modal -->

        <!-- Update Result Modal -->
        <div class="modal fade" id="updateResultModal" tabindex="-1" role="dialog" 
            aria-labelledby="updateResultModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="updateResultModalLabel">
                            Update Result <br>
                            <small>
                                {{ forr.location_type + forr.location_name }}
                            </small>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label>Political Party</label>
                                <input type="text" class="form-control" 
                                    id="update-result-party" disabled>
                            </div>
                            <div class="form-group">
                                <label>Votes</label>
                                <input v-model="edit_result.votes" type="number" class="form-control" 
                                    id="update-result-votes" placeholder="votes">
                            </div>
                            <input v-model="edit_result.id" type="hidden" id="update-result-id">
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button @click="updateResult(edit_result)" type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /End Result Modal -->
    
    
    
    </div>
</template>
<script>
    import { HELPERS } from '../../helpers.js';

    export default {
        data() {
            return {
                new_result: {
                    candidate_id: '',
                    election_id: this.$route.params.id,
                    location_id: '',
                    location_type: '',
                    votes: ''
                },
                edit_result: {
                    id: '',
                    votes: ''
                },
                HF: HELPERS,
                validations: {
                    id: {
                        is_valid: true,
                        text: ''
                    },
                    candidate_id: {
                        is_valid: true,
                        text: ''
                    },
                    location_id: {
                        is_valid: true,
                        text: ''
                    },
                    location_type: {
                        is_valid: true,
                        text: ''
                    },
                    votes: {
                        is_valid: true,
                        text: ''
                    }
                },
                result_type: 'normal',
                location_type: null,
                state_slct: null,
                lg_slct: null,
                ra_slct: null,
                pu_slct: null,
                chartData: [["APC", 4], ["PDP", 2], ["APGA", 10], ["SDP", 5], ["SSD", 3]]
            }
        },
        mounted() {
            let vm = this;
            vm.$nextTick(function() {
                vm.initUpdateResultModal();
                vm.initAddResultModal();
            })
        },
        created() {
            this.$store.dispatch("getElection", {
                id: this.$route.params.id
            });

            this.$store.dispatch('getFinalResults', {
                id: this.$route.params.id
            });
        },
        watch: {
            location_type: function() {
                if(this.election.election_type_id == 1) {
                    this.$store.dispatch('getStates');
                } else {
                    this.$store.dispatch('getLocalGovernments', {
                        id: this.election.state.id
                    });
                }
            },

            state_slct: function() {
                this.$store.dispatch('getLocalGovernments', {
                    id: this.state_slct
                });
            },

            lg_slct: function() {
                this.$store.dispatch('getRegistrationAreas', {
                    id: this.lg_slct
                });
            },

            ra_slct: function() {
                this.$store.dispatch('getPollingUnits', {
                    id: this.ra_slct
                })
            },

            addResultLoadStatus: function(val) {
                let vm = this;
                if(val == 3 && vm.addResultResponse.success == 0) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.addResultResponse.message, 
                        'danger'
                    );
                } else if(val == 2 && vm.addResultResponse.success == 1) {
                    $('#addResultModal').modal('hide');
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.addResultResponse.message, 
                        'success'
                    );

                    vm.getResults(vm.location_type);
                } 
            },
            
            addFinalResultLoadStatus: function(val) {
                let vm = this;
                if(val == 3 && vm.addFinalResultResponse.success == 0) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.addFinalResultResponse.message, 
                        'danger'
                    );
                } else if(val == 2 && vm.addFinalResultResponse.success == 1) {
                    $('#addFinalResultModal').modal('hide');
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.addFinalResultResponse.message, 
                        'success'
                    );

                    this.$store.dispatch('getFinalResults', {
                        id: this.$route.params.id
                    });
                } 
            },

            updateResultLoadStatus: function() {
                let vm = this;
                if(vm.updateResultLoadStatus == 3 && vm.updateResultResponse.success == 0) {
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updateResultResponse.message, 
                        'danger'
                    );
                } else if(vm.updateResultLoadStatus == 2 && vm.updateResultResponse.success == 1) {
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updateResultResponse.message, 
                        'success'
                    );
                } 
            },

            updateFinalResultStatus: function() {
                let vm = this;
                if(vm.updateFinalResultStatus == 3 && vm.updateFinalResultResponse.success == 0) {
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updateFinalResultResponse.message, 
                        'danger'
                    );
                } else if(vm.updateFinalResultStatus == 2 && vm.updateFinalResultResponse.success == 1) {
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updateFinalResultResponse.message, 
                        'success'
                    );
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
            results() {
                return this.$store.getters.getResults;
            },
            resultsLoadStatus() {
                return this.$store.getters.getResultsLoadStatus;
            },
            forr() {
                return this.$store.getters.getForr;
            },
            states() {
                return this.$store.getters.getStates;
            },
            statesLoadStatus() {
                return this.$store.getters.getStatesLoadStatus;
            },
            localGovernments() {
                return this.$store.getters.getLocalGovernments;
            },
            localGovernmentsLoadStatus() {
                return this.$store.getters.getLocalGovernmentsLoadStatus;
            },
            registrationAreas() {
                return this.$store.getters.getRegistrationAreas;
            },
            registrationAreasLoadStatus() {
                return this.$store.getters.getRegistrationAreasLoadStatus;
            },
            pollingUnits() {
                return this.$store.getters.getPollingUnits;
            },
            pollingUnitsLoadStatus() {
                return this.$store.getters.getPollingUnitsLoadStatus;
            },
            user() {
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            },
            addResultLoadStatus() {
                return this.$store.getters.getAddResultLoadStatus;
            },
            addResultResponse() {
                return this.$store.getters.getAddResultResponse;
            },
            updateResultLoadStatus() {
                return this.$store.getters.getUpdateResultLoadStatus;
            },
            updateResultResponse() {
                return this.$store.getters.getUpdateResultResponse;
            },
            deleteResultResponse() {
                return this.$store.getters.getDeleteResultResponse;
            },
            addFinalResultLoadStatus() {
                return this.$store.getters.getAddFinalResultLoadStatus;
            }
        },
        methods: {
            getResults(location_type) {
                switch (location_type) {
                    case "state":
                        this.$store.dispatch('getStateResults', {
                            electionId: this.election.id,
                            stateId: this.state_slct
                        });
                        break;

                    case "lg":
                        this.$store.dispatch('getLocalGovernmentResults', {
                            electionId: this.election.id,
                            localGovernmentId: this.lg_slct
                        });
                        break;

                    case "ra":
                        this.$store.dispatch('getRegistrationAreaResults', {
                            electionId: this.election.id,
                            registrationAreaId: this.ra_slct
                        });
                        break;

                    case "pu":
                        this.$store.dispatch('getPollingUnitResults', {
                            electionId: this.election.id,
                            pollingUnitId: this.pu_slct
                        });
                        break;
                
                    default:
                        this.$store.dispatch('getFinalResults', {
                            id: this.$route.params.id
                        });
                        break;
                }
            },
            initAddResultModal() {
                let vm = this;
                $('#addResultModal').on('show.bs.modal', function (event) {
                    var button = $(event.relatedTarget) // Button that triggered the modal
                    var location_id = button.data('locationid') // Extract info from data-* attributes
                    var location_type = button.data('locationtype')
                    var party_id = button.data('partyid')
                    var party = button.data('party')
                    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
                    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
                    var modal = $(this)

                    modal.find('#add-result-party').val(party)
                    vm.new_result.candidate_id = party_id;

                    if(!location_id && !location_type) {
                        vm.result_type = 'final';
                    } else {
                        vm.new_result.location_id = location_id;
                        vm.new_result.location_type = location_type;
                    }
                })
            },
            initUpdateResultModal() {
                let vm = this;
                $('#updateResultModal').on('show.bs.modal', function (event) {
                    var button = $(event.relatedTarget) // Button that triggered the modal
                    var id = button.data('id') // Extract info from data-* attributes
                    var votes = button.data('votes')
                    votes = votes.replace(',', '')
                    var party = button.data('party')
                    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
                    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
                    var modal = $(this)

                    modal.find('#update-result-party').val(party)
                    vm.edit_result.id = id;
                    vm.edit_result.votes = parseInt(votes);
                })
            },
            validateResult(result) {
                let validResult = true;
                let validations = this.validations;

                if(!result.candidate_id) {
                    validResult = false;
                    validations.candidate_id.is_valid = false;
                    validations.candidate_id.text = "candidate id can not be empty";
                }

                if(!result.location_id) {
                    validResult = false;
                    validations.location_id.is_valid = false;
                    validations.location_id.text = "location id can not be empty";
                }

                if(!result.location_type) {
                    validResult = false;
                    validations.location_type.is_valid = false;
                    validations.location_type.text = "location type can not be empty";
                }

                if(!result.votes) {
                    validResult = false;
                    validations.location_type.is_valid = false;
                    validations.location_type.text = "votes can not be empty"
                }

                return validResult;
            },
            validateFinalResult(result) {
                let validResult = true;
                let validations = this.validations;

                if(!result.candidate_id) {
                    validResult = false;
                    validations.candidate_id.is_valid = false;
                    validations.candidate_id.text = "candidate id can not be empty";
                }

                if(!result.votes) {
                    validResult = false;
                    validations.location_type.is_valid = false;
                    validations.location_type.text = "votes can not be empty"
                }

                return validResult;
            },
            addResult(result) {
                switch (this.result_type) {
                    case 'normal':
                        if(this.validateResult(result)) {
                            this.$store.dispatch('addResult', result);
                        }
                        break;

                    case 'final':
                        if(this.validateFinalResult(result)) {
                            this.$store.dispatch('addFinalResult', result);
                        }
                        break;
                
                    default:
                        break;
                }
            },
            updateResult(result) {
                if(this.location_type == null) {
                    //this is a final result
                    this.$store.dispatch('updateFinalResult', result)
                } else {
                    //this is not a final result
                    this.$store.dispatch('updateResult', result);
                }
            },
            deleteResult(id) {
                if(this.location_type == null && confirm('are you sure?')) {
                    //this is a final result
                    this.$store.dispatch('deleteFinalResult', id)
                } else if(this.location_type != null && confirm('are you sure?')) {
                    //this is not a final result
                    this.$store.dispatch('deleteResult', id)
                }
            }
        }
    }
</script>