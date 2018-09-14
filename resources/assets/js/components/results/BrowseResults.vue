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
                    <th>Id</th>
                    <th>Party</th>
                    <th>Candidate</th>
                    <th>Votes</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(result,index) in results" v-bind:key="result.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ result.party }}</td>
                    <td>{{ result.candidate_name }}</td>
                    <td>{{ result.votes }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        mounted() {
        },
        created() {
            this.$store.dispatch('getFinalResults', {
                id: this.$route.params.id
            });
        },
        data() {
            return {
                location_type: null,
                state_slct: null,
                lg_slct: null,
                ra_slct: null,
                pu_slct: null
            }
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
        },
        computed: {
            election() {
                return this.$store.getters.getElection;
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
            }
        }
    }
</script>