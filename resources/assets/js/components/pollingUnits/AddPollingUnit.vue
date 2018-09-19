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
                                {{ registrationArea.name }} <br>
                                New Polling Unit
                            </div>
                        </div>
                        <div class="card-body">
                            <form v-show="show_form">
                                <div class="form-group">
                                    <label for="">
                                        Code
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <input type="text" class="form-control" v-model="pollingUnit.code" />
                                    <small v-show="!validations.code.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.code.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">
                                        Description
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <input type="text" class="form-control" v-model="pollingUnit.description" />
                                    <small v-show="!validations.description.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.description.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">
                                        Latitude
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <input type="text" class="form-control" v-model="pollingUnit.latitude" />
                                    <small v-show="!validations.latitude.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.latitude.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">
                                        Longitude
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <input type="text" class="form-control" v-model="pollingUnit.longitude" />
                                    <small v-show="!validations.longitude.is_valid" 
                                        class="form-text text-muted text-danger">
                                        {{ validations.longitude.text }}
                                    </small>
                                </div>
                                <button @click="addPollingUnit(pollingUnit)" type="button" 
                                    class="btn btn-success">
                                    Submit
                                </button>
                            </form>
                            <div v-show="!show_form" class="alert alert-success" role="alert">
                                {{ addPollingUnitResult.message }}
                                <a @click="addAnother()" class="alert-link">
                                    &nbsp;Add Another registration Area
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
                pollingUnit: {
                    code: '',
                    description: '',
                    registration_area_id: '',
                    latitude: '',
                    longitude: ''
                },
                HF: HELPERS,
                show_form: true,
                validations: {
                    code: {
                        is_valid: true,
                        text: ''
                    },
                    description: {
                        is_valid: true,
                        text: ''
                    },
                    registration_area_id: {
                        is_valid: true,
                        text: ''
                    },
                    latitude: {
                        is_valid: true,
                        text: ''
                    },
                    longitude: {
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
            addPollingUnitLoadStatus() {
                return this.$store.getters.getAddPollingUnitLoadStatus;
            },
            addPollingUnitResult() {
                return this.$store.getters.getAddPollingUnitResult;
            },
            registrationArea() {
                return this.$store.getters.getRegistrationArea;
            },
            registrationAreaLoadStatus() {
                return this.$store.getters.getRegistrationAreaLoadStatus;
            }
        },
        watch: {
            addPollingUnitLoadStatus: function() {
                let vm = this;
                if(vm.addPollingUnitLoadStatus == 3 && vm.addPollingUnitResult.success == 0) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.addPollingUnitResult.message, 
                        'danger'
                    );
                } else if(vm.addPollingUnitLoadStatus == 2 && vm.addPollingUnitResult.success == 1) {
                    vm.show_form = false;
                    vm.clearPollingUnitForm();
                } 
            },
            registrationAreaLoadStatus: function(val) {
                let vm = this;
                if(val == 2) {
                    vm.pollingUnit.registration_area_id = vm.registrationArea.id;
                }
            }
        },
        mounted() {

        },
        created() {
            this.$store.dispatch('getRegistrationArea', {
                id: this.$route.params.registrationId
            });
        },
        methods: {
            addPollingUnit(data) {
                if(this.validatePollingUnit(data)) {
                    this.$store.dispatch('addPollingUnit', data);
                }
            },
            addAnother() {
                this.$store.commit('setAddPollingUnitResult', {});
                this.$store.commit('setAddPollingUnitLoadStatus', 0);
                this.show_form = true;
            },
            validatePollingUnit(ra) {
                let validPollingUnit = true;
                let validations = this.validations;

                if(!ra.registration_area_id) {
                    validPollingUnit = false;
                    validations.registration_area_id.is_valid = false;
                    validations.registration_area_id.text = "ra id can not be empty";
                }

                if(!ra.code) {
                    validPollingUnit = false;
                    validations.code.is_valid = false;
                    validations.code.text = "code can not be empty";
                }

                if(!ra.description) {
                    validPollingUnit = false;
                    validations.description.is_valid = false;
                    validations.description.text = "description can not be empty";
                }

                if(!ra.latitude) {
                    validPollingUnit = false;
                    validations.latitude.is_valid = false;
                    validations.latitude.text = "latitude can not be empty";
                }

                if(!ra.longitude) {
                    validPollingUnit = false;
                    validations.longitude.is_valid = false;
                    validations.longitude.text = "longitude can not be empty";
                }

                return validPollingUnit;
            },
            clearPollingUnitForm() {
                this.pollingUnit.code = '';
                this.pollingUnit.description = '';
                this.pollingUnit.latitude = '';
                this.pollingUnit.longitude = '';

                this.validations = {
                    code: {
                        is_valid: true,
                        text: ''
                    },
                    description: {
                        is_valid: true,
                        text: ''
                    },
                    registration_area_id: {
                        is_valid: true,
                        text: ''
                    },
                    latitude: {
                        is_valid: true,
                        text: ''
                    },
                    longitude: {
                        is_valid: true,
                        text: ''
                    }
                }
            }
        }
    }
</script>
