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
                                    <input v-model="picture.election_id" type="text" class="form-control" disabled />
                                    <small class="form-text text-muted">{{ election.title + "["+ election.id + "]" }}</small>
                                </div>
                                <div class="form-group">
                                    <label for="">
                                        Title
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <input type="text" class="form-control" v-model="pic.title" />
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
                                <button @click="editPicture(pic)" type="button" class="btn btn-success">Submit</button>
                            </form>
                            <div v-show="!show_form" class="alert alert-success" role="alert">
                                {{ updatePictureResult.message }}
                                <a @click="addAnother()" class="alert-link">
                                    &nbsp;Add Another pic
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

    export default {
        data() {
            return {
                pic: {
                    id: this.$route.params.pictureId,
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
            updatePictureLoadStatus() {
                return this.$store.getters.getUpdatePictureLoadStatus;
            },
            updatePictureResult() {
                return this.$store.getters.getUpdatePictureResult;
            },
            picture() {
                return this.$store.getters.getPicture;
            },
            pictureLoadStatus() {
                return this.$store.getters.getPictureLoadStatus;
            }
        },
        watch: {
            updatePictureLoadStatus: function() {
                let vm = this;
                if(vm.updatePictureLoadStatus == 3 && vm.updatePictureResult.success == 0) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updatePictureResult.message, 
                        'danger'
                    );
                } else if(vm.updatePictureLoadStatus == 2 && vm.updatePictureResult.success == 1) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updatePictureResult.message, 
                        'success'
                    );
                } 
            },
            pictureLoadStatus: function() {
                let vm = this;
                if(vm.pictureLoadStatus == 2) {
                    vm.pic.title = vm.picture.title,
                    vm.description_editor.setData(vm.picture.description);
                    vm.location_name = vm.picture.location.name || vm.picture.location.code;
                    vm.location_type = vm.picture.location_type;
                }
            }
        },
        created() {
            this.$store.dispatch('getPicture', {
                id: this.$route.params.pictureId
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
            editPicture(data) {
                data.description = this.description_editor.getData();
                
                if(this.validatePicture(data)) {
                    this.$store.dispatch('updatePicture', data);
                }
            },
            validatePicture(pic) {
                let validPicture = true;
                let validations = this.validations;

                if(!pic.id) {
                    validPicture = false;
                    validations.id.is_valid = false;
                    validations.title.text = "id can not be empty";
                }

                if(!pic.title) {
                    validPicture = false;
                    validations.title.is_valid = false;
                    validations.title.text = "title can not be empty";
                }

                if(!pic.description) {
                    validPicture = false;
                    validations.description.is_valid = false;
                    validations.description.text = "description can not be empty";
                }

                return validPicture;
            },
            clearPictureForm() {
                this.pic.id = '',
                this.pic.title = '',
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