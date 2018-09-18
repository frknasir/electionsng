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
                                {{ registrationArea.name }}
                            </div>
                        </div>
                        <div class="card-body">
                            <form v-show="show_form">
                                <div class="form-group">
                                    <label for="">
                                        Name
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <input type="text" class="form-control" v-model="ra.name" />
                                    <small v-show="!validations.name.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.name.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">
                                        Latitude
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <input type="text" class="form-control" v-model="ra.latitude" />
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
                                    <input type="text" class="form-control" v-model="ra.longitude" />
                                    <small v-show="!validations.longitude.is_valid" 
                                        class="form-text text-muted text-danger">
                                        {{ validations.longitude.text }}
                                    </small>
                                </div>
                                <button @click="editRegistrationArea(ra)" type="button" 
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
                ra: {
                    id: this.$route.params.registrationAreaId,
                    name: '',
                    latitude: '',
                    longitude: ''
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
            registrationArea() {
                return this.$store.getters.getRegistrationArea;
            },
            registrationAreaLoadStatus() {
                return this.$store.getters.getRegistrationAreaLoadStatus;
            },
            updateRegistrationAreaLoadStatus() {
                return this.$store.getters.getUpdateRegistrationAreaLoadStatus;
            },
            updateRegistrationAreaResult() {
                return this.$store.getters.getUpdateRegistrationAreaResult;
            }
        },
        watch: {
            updateRegistrationAreaLoadStatus: function() {
                let vm = this;
                if(vm.updateRegistrationAreaLoadStatus == 3 && vm.updateRegistrationAreaResult.success == 0) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updateRegistrationAreaResult.message, 
                        'danger'
                    );
                } else if(vm.updateRegistrationAreaLoadStatus == 2 && vm.updateRegistrationAreaResult.success == 1) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updateRegistrationAreaResult.message, 
                        'success'
                    );
                } 
            },
            registrationAreaLoadStatus: function(val) {
                let vm = this;
                if(val == 2) {
                    vm.ra.name = vm.registrationArea.name;
                    vm.ra.latitude = vm.registrationArea.latitude;
                    vm.ra.longitude = vm.registrationArea.longitude;
                }
            }
        },
        mounted() {

        },
        created() {
            this.$store.dispatch('getRegistrationArea', {
                id: this.$route.params.registrationAreaId
            });
        },
        methods: {
            editRegistrationArea(data) {
                if(this.validateRegistrationArea(data)) {
                    this.$store.dispatch('updateRegistrationArea', data);
                }
            },
            validateRegistrationArea(ra) {
                let validRegistrationArea = true;
                let validations = this.validations;

                if(!ra.id) {
                    validRegistrationArea = false;
                    validations.id.is_valid = false;
                    validations.id.text = "id can not be empty";
                }

                if(!ra.name) {
                    validRegistrationArea = false;
                    validations.name.is_valid = false;
                    validations.name.text = "name can not be empty";
                }

                if(!ra.latitude) {
                    validRegistrationArea = false;
                    validations.latitude.is_valid = false;
                    validations.latitude.text = "latitude can not be empty";
                }

                if(!ra.longitude) {
                    validRegistrationArea = false;
                    validations.longitude.is_valid = false;
                    validations.longitude.text = "longitude can not be empty";
                }

                return validRegistrationArea;
            }
        }
    }
</script>
