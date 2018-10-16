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
                                <i class="material-icons">sync</i>
                            </div>
                        </div>
                        <div class="card-body">
                            <form v-show="show_form">
                                <div class="form-group">
                                    <label for="">
                                        Election
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <input v-model="incident.election_id" type="text" class="form-control" disabled />
                                    <small class="form-text text-muted">{{ election.title + "["+ election.id + "]" }}</small>
                                </div>
                                <div class="form-group">
                                    <label for="">
                                        Incident Type
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <select v-model="incident.incident_type_id" class="form-control">
                                        <option v-for="type in incidentTypes" v-bind:key="type.id" :value="type.id">
                                            {{ type.name }}
                                        </option>
                                    </select>
                                    <small v-show="!validations.incident_type_id.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.incident_type_id.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">
                                        Title
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <input type="text" class="form-control" v-model="incident.title" />
                                    <small v-show="!validations.title.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.title.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="description-editor">
                                        Description
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <textarea id="description-editor" cols="30" rows="10"></textarea>
                                    <small v-show="!validations.description.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.description.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">
                                        Location
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label><br>
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
                                <small v-show="!validations.location_id.is_valid" class="form-text text-muted text-danger">
                                    {{ validations.location_id.text }}
                                </small>
                                <small v-show="!validations.location_type.is_valid" class="form-text text-muted text-danger">
                                    {{ validations.location_type.text }}
                                </small>

                                <button v-if="addIncidentLoadStatus != 1" @click="addIncident(incident)" type="button" 
                                    class="btn btn-success">Submit</button>
                                <action-loader class="text-left" :loading='addIncidentLoadStatus == 1' 
                                    :color="'#4caf50'"></action-loader>
                            </form>
                            <div v-show="!show_form" class="alert alert-success" role="alert">
                                {{ addIncidentResult.message }}
                                <a @click="addAnother()" class="alert-link">
                                    &nbsp;Add Another Update
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
                incident: {
                    title: '',
                    description: '',
                    incident_type_id: '',
                    election_id: '',
                    location_id: '',
                    location_type: ''
                },
                description_editor: null,
                HF: HELPERS,
                show_form: true,
                validations: {
                    title: {
                        is_valid: true,
                        text: ''
                    },
                    description: {
                        is_valid: true,
                        text: ''
                    },
                    incident_type_id: {
                        is_valid: true,
                        text: ''
                    },
                    election_id: {
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
                    }
                },
                location_type: null,
                state_slct: null,
                lg_slct: null,
                ra_slct: null,
                pu_slct: null
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
            incidentTypes() {
                return this.$store.getters.getIncidentTypes;
            },
            addIncidentLoadStatus() {
                return this.$store.getters.getAddIncidentLoadStatus;
            },
            addIncidentResult() {
                return this.$store.getters.getAddIncidentResult;
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
            }
        },
        watch: {
            addIncidentLoadStatus: function() {
                let vm = this;
                if(vm.addIncidentLoadStatus == 3 && vm.addIncidentResult.success == 0) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.addIncidentResult.message, 
                        'danger'
                    );
                } else if(vm.addIncidentLoadStatus == 2 && vm.addIncidentResult.success == 1) {
                    vm.show_form = false;
                    vm.clearIncidentForm();
                } 
            },
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
            }
        },
        created() {
            this.$store.dispatch('getIncidentTypes');
        },
        mounted() {
            this.initClassicEditor();
        },
        methods: {
            initClassicEditor() {
                let vm = this;
                ClassicEditor
                    .create( document.querySelector( '#description-editor' ) )
                    .then( editor => {
                        vm.description_editor = editor;
                    } )
                    .catch( error => {
                        console.error( error );
                    } );
            },
            addIncident(data) {
                
                switch (this.location_type) {
                    case "state":
                        data.location_id = this.state_slct;
                        data.location_type = "state";
                        break;

                    case "lg":
                        data.location_id = this.lg_slct;
                        data.location_type = "localGovernment";
                        break;

                    case "ra":
                        data.location_id = this.ra_slct;
                        data.location_type = "registrationArea";
                        break;

                    case "pu":
                        data.location_id = this.pu_slct;
                        data.location_type = "pollingUnit";
                        break;
                
                    default:
                        data.location_id = "";
                        data.location_type = "";
                        break;
                }

                data.election_id = this.election.id;
                data.description = this.description_editor.getData();
                if(this.validateIncident(data)) {
                    this.$store.dispatch('addIncident', data);
                }
            },
            addAnother() {
                this.addIncidentResult.result = 0;
                this.addIncidentResult.message = '';
                this.show_form = true;
            },
            validateIncident(incident) {
                let validIncident = true;
                let validations = this.validations;

                if(!incident.title) {
                    validIncident = false;
                    validations.title.is_valid = false;
                    validations.title.text = "title can not be empty";
                }

                if(!incident.description) {
                    validIncident = false;
                    validations.description.is_valid = false;
                    validations.description.text = "description can not be empty";
                }

                if(!incident.incident_type_id) {
                    validIncident = false;
                    validations.incident_type_id.is_valid = false;
                    validations.incident_type_id.text = "incident type can not be empty";
                }

                if(!incident.election_id) {
                    validIncident = false;
                    validations.election_id.is_valid = false;
                    validations.election_id.text = "election can not be empty";
                }

                if(!incident.location_id) {
                    validIncident = false;
                    validations.location_id.is_valid = false;
                    validations.location_id.text = "location id can not be empty";
                }

                if(!incident.location_type) {
                    validIncident = false;
                    validations.location_type.is_valid = false;
                    validations.location_type.text = "location type can not be empty";
                }

                return validIncident;
            },
            clearIncidentForm() {
                this.incident.title = '',
                this.incident.election_id = '',
                this.incident.incident_type_id = '',
                this.incident.location_id = '',
                this.incident.location_type = ''
                this.description_editor.setData('');
                this.location_type = '';

                this.validations = {
                    title: {
                        is_valid: true,
                        text: ''
                    },
                    description: {
                        is_valid: true,
                        text: ''
                    },
                    incident_type_id: {
                        is_valid: true,
                        text: ''
                    },
                    election_id: {
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
                    }
                }
            }
        }
    }
</script>