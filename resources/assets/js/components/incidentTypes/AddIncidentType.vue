<style scoped>

</style>
<template>
    <div class="content">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header card-header-text card-header-success">
                            <div class="card-text">
                                New Incident Type
                            </div>
                        </div>
                        <div class="card-body">
                            <form v-show="show_form">
                                <div class="form-group">
                                    <label for="">
                                        name
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <input type="text" class="form-control" v-model="incidentType.name" />
                                    <small v-show="!validations.name.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.name.text }}
                                    </small>
                                </div>
                                <button @click="addIncidentType(incidentType)" type="button" 
                                    class="btn btn-success">
                                    Submit
                                </button>
                            </form>
                            <div v-show="!show_form" class="alert alert-success" role="alert">
                                {{ addIncidentTypeResult.message }}
                                <a @click="addAnother()" class="alert-link">
                                    &nbsp;Add Another type
                                </a>
                            </div>
                        </div>
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
                incidentType: {
                    name: ''
                },
                HF: HELPERS,
                show_form: true,
                validations: {
                    name: {
                        is_valid: true,
                        text: ''
                    }
                }
            }
        },
        computed: {
            user() {
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            },
            addIncidentTypeLoadStatus() {
                return this.$store.getters.getAddIncidentTypeLoadStatus;
            },
            addIncidentTypeResult() {
                return this.$store.getters.getAddIncidentTypeResult;
            }
        },
        watch: {
            addIncidentTypeLoadStatus: function() {
                let vm = this;
                if(vm.addIncidentTypeLoadStatus == 3 && vm.addIncidentTypeResult.success == 0) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.addIncidentTypeResult.message, 
                        'danger'
                    );
                } else if(vm.addIncidentTypeLoadStatus == 2 && vm.addIncidentTypeResult.success == 1) {
                    vm.show_form = false;
                    vm.clearIncidentTypeForm();
                } 
            }
        },
        mounted() {

        },
        created() {

        },
        methods: {
            addIncidentType(data) {
                if(this.validateIncidentType(data)) {
                    this.$store.dispatch('addIncidentType', data);
                }
            },
            addAnother() {
                this.$store.commit('setAddIncidentTypeResult', {});
                this.$store.commit('setAddIncidentTypeLoadStatus', 0);
                this.show_form = true;
            },
            validateIncidentType(type) {
                let validIncidentType = true;
                let validations = this.validations;

                if(!type.name) {
                    validIncidentType = false;
                    validations.name.is_valid = false;
                    validations.name.text = "name can not be empty";
                }

                return validIncidentType;
            },
            clearIncidentTypeForm() {
                this.incidentType.name = '';

                this.validations = {
                    name: {
                        is_valid: true,
                        text: ''
                    }
                }
            }
        }
    }
</script>
