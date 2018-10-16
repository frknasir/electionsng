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
                                    <select v-model="inci.incident_type_id" class="form-control">
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
                                    <input type="text" class="form-control" v-model="inci.title" />
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
                                    </label>
                                    <input type="text" class="form-control" v-model="location_name" disabled/>
                                    <small class="form-text text-muted text-info">
                                        {{ location_type }}
                                    </small>
                                </div>
                                <button v-if="updateIncidentLoadStatus != 1" 
                                    @click="editIncident(inci)" type="button" 
                                    class="btn btn-success">Submit</button>

                                <action-loader class="text-left" :loading='updateIncidentLoadStatus == 1' 
                                    :color="'#4caf50'"></action-loader>
                            </form>
                            <div v-show="!show_form" class="alert alert-success" role="alert">
                                {{ updateIncidentResult.message }}
                                <a @click="addAnother()" class="alert-link">
                                    &nbsp;Add Another inci
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
                inci: {
                    id: this.$route.params.incidentId,
                    title: '',
                    description: '',
                    incident_type_id: ''
                },
                location_name: '',
                location_type: '',
                description_editor: null,
                HF: HELPERS,
                show_form: true,
                validations: {
                    id: {
                        is_valid: true,
                        text: ''
                    },
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
            incidentTypes() {
                return this.$store.getters.getIncidentTypes;
            },
            updateIncidentLoadStatus() {
                return this.$store.getters.getUpdateIncidentLoadStatus;
            },
            updateIncidentResult() {
                return this.$store.getters.getUpdateIncidentResult;
            },
            incident() {
                return this.$store.getters.getIncident;
            },
            incidentLoadStatus() {
                return this.$store.getters.getIncidentLoadStatus;
            }
        },
        watch: {
            updateIncidentLoadStatus: function() {
                let vm = this;
                if(vm.updateIncidentLoadStatus == 3 && vm.updateIncidentResult.success == 0) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updateIncidentResult.message, 
                        'danger'
                    );
                } else if(vm.updateIncidentLoadStatus == 2 && vm.updateIncidentResult.success == 1) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updateIncidentResult.message, 
                        'success'
                    );
                } 
            },
            incidentLoadStatus: function() {
                let vm = this;
                if(vm.incidentLoadStatus == 2) {
                    vm.inci.title = vm.incident.title,
                    vm.inci.incident_type_id = vm.incident.incident_type_id;
                    vm.description_editor.setData(vm.incident.description);
                    vm.location_name = vm.incident.location.name || vm.incident.location.code;
                    vm.location_type = vm.incident.location_type;
                }
            }
        },
        created() {
            this.$store.dispatch('getIncident', {
                id: this.$route.params.incidentId
            });

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
            editIncident(data) {
                data.description = this.description_editor.getData();
                
                if(this.validateIncident(data)) {
                    this.$store.dispatch('updateIncident', data);
                }
            },
            validateIncident(inci) {
                let validIncident = true;
                let validations = this.validations;

                if(!inci.id) {
                    validIncident = false;
                    validations.id.is_valid = false;
                    validations.title.text = "id can not be empty";
                }

                if(!inci.title) {
                    validIncident = false;
                    validations.title.is_valid = false;
                    validations.title.text = "title can not be empty";
                }

                if(!inci.description) {
                    validIncident = false;
                    validations.description.is_valid = false;
                    validations.description.text = "description can not be empty";
                }

                if(!inci.incident_type_id) {
                    validIncident = false;
                    validations.incident_type_id.is_valid = false;
                    validations.incident_type_id.text = "incident type can not be empty";
                }

                return validIncident;
            },
            clearIncidentForm() {
                this.inci.id = '',
                this.inci.title = '',
                this.inci.incident_type_id = '';
                this.description_editor.setData('');

                this.validations = {
                    id: {
                        is_valid: true,
                        text: ''
                    },
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
                    }
                }
            }
        }
    }
</script>