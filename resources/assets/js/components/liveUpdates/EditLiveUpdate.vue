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
                                    <input v-model="liveUpdate.election_id" type="text" class="form-control" disabled />
                                    <small class="form-text text-muted">{{ election.title + "["+ election.id + "]" }}</small>
                                </div>
                                <div class="form-group">
                                    <label for="">
                                        Title
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <input type="text" class="form-control" v-model="update.title" />
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
                                <button v-if="updateLiveUpdateLoadStatus != 1" @click="editLiveUpdate(update)" type="button" 
                                    class="btn btn-success">Submit</button>
                                <action-loader class="text-left" :loading='updateLiveUpdateLoadStatus == 1' 
                                    :color="'#4caf50'"></action-loader>
                            </form>
                            <div v-show="!show_form" class="alert alert-success" role="alert">
                                {{ updateLiveUpdateResult.message }}
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
                update: {
                    id: this.$route.params.liveUpdateId,
                    title: '',
                    description: ''
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
            updateLiveUpdateLoadStatus() {
                return this.$store.getters.getUpdateLiveUpdateLoadStatus;
            },
            updateLiveUpdateResult() {
                return this.$store.getters.getUpdateLiveUpdateResult;
            },
            liveUpdate() {
                return this.$store.getters.getLiveUpdate;
            },
            liveUpdateLoadStatus() {
                return this.$store.getters.getLiveUpdateLoadStatus;
            }
        },
        watch: {
            updateLiveUpdateLoadStatus: function() {
                let vm = this;
                if(vm.updateLiveUpdateLoadStatus == 3 && vm.updateLiveUpdateResult.success == 0) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updateLiveUpdateResult.message, 
                        'danger'
                    );
                } else if(vm.updateLiveUpdateLoadStatus == 2 && vm.updateLiveUpdateResult.success == 1) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updateLiveUpdateResult.message, 
                        'success'
                    );
                } 
            },
            liveUpdateLoadStatus: function() {
                let vm = this;
                if(vm.liveUpdateLoadStatus == 2) {
                    vm.update.title = vm.liveUpdate.title,
                    vm.description_editor.setData(vm.liveUpdate.description);
                    vm.location_name = vm.liveUpdate.location.name || vm.liveUpdate.location.code;
                    vm.location_type = vm.liveUpdate.location_type;
                }
            }
        },
        created() {
            this.$store.dispatch('getLiveUpdate', {
                id: this.$route.params.liveUpdateId
            });
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
            editLiveUpdate(data) {
                data.description = this.description_editor.getData();
                
                if(this.validateLiveUpdate(data)) {
                    this.$store.dispatch('updateLiveUpdate', data);
                }
            },
            validateLiveUpdate(update) {
                let validLiveUpdate = true;
                let validations = this.validations;

                if(!update.id) {
                    validLiveUpdate = false;
                    validations.id.is_valid = false;
                    validations.title.text = "id can not be empty";
                }

                if(!update.title) {
                    validLiveUpdate = false;
                    validations.title.is_valid = false;
                    validations.title.text = "title can not be empty";
                }

                if(!update.description) {
                    validLiveUpdate = false;
                    validations.description.is_valid = false;
                    validations.description.text = "description can not be empty";
                }

                return validLiveUpdate;
            },
            clearLiveUpdateForm() {
                this.update.id = '',
                this.update.title = '',
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
                    }
                }
            }
        }
    }
</script>