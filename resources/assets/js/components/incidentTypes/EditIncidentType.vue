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
                                Edit type
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
                                    <input type="text" class="form-control" v-model="type.name" />
                                    <small v-show="!validations.name.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.name.text }}
                                    </small>
                                </div>
                                <button @click="editIncidentType(type)" type="button" 
                                    class="btn btn-success">
                                    Submit
                                </button>
                            </form>
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
                type: {
                    id: this.$route.params.incidentTypeId,
                    name: ''
                },
                HF: HELPERS,
                show_form: true,
                validations: {
                    id: {
                        is_valid: true,
                        text: ''
                    },
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
            incidentType() {
                return this.$store.getters.getIncidentType;
            },
            incidentTypeLoadStatus() {
                return this.$store.getters.getIncidentTypeLoadStatus;
            },
            updateIncidentTypeLoadStatus() {
                return this.$store.getters.getUpdateIncidentTypeLoadStatus;
            },
            updateIncidentTypeResult() {
                return this.$store.getters.getUpdateIncidentTypeResult;
            }
        },
        watch: {
            updateIncidentTypeLoadStatus: function() {
                let vm = this;
                if(vm.updateIncidentTypeLoadStatus == 3 && vm.updateIncidentTypeResult.success == 0) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updateIncidentTypeResult.message, 
                        'danger'
                    );
                } else if(vm.updateIncidentTypeLoadStatus == 2 && vm.updateIncidentTypeResult.success == 1) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updateIncidentTypeResult.message, 
                        'success'
                    );
                } 
            },
            incidentTypeLoadStatus: function(val) {
                let vm = this;
                if(val == 2) {
                    vm.type.name = vm.incidentType.name;
                }
            }
        },
        mounted() {

        },
        created() {
            this.$store.dispatch('getIncidentType', {
                id: this.$route.params.incidentTypeId
            });
        },
        methods: {
            editIncidentType(data) {
                if(this.validateIncidentType(data)) {
                    this.$store.dispatch('updateIncidentType', data);
                }
            },
            validateIncidentType(type) {
                let validIncidentType = true;
                let validations = this.validations;

                if(!type.id) {
                    validIncidentType = false;
                    validations.id.is_valid = false;
                    validations.id.text = "id can not be empty";
                }

                if(!type.name) {
                    validIncidentType = false;
                    validations.name.is_valid = false;
                    validations.name.text = "name can not be empty";
                }

                return validIncidentType;
            }
        }
    }
</script>
