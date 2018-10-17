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
                                {{ localGovernment.name }} <br>
                                New Registration Area
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
                                    <input type="text" class="form-control" v-model="registrationArea.name" />
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
                                    <input type="text" class="form-control" v-model="registrationArea.latitude" />
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
                                    <input type="text" class="form-control" v-model="registrationArea.longitude" />
                                    <small v-show="!validations.longitude.is_valid" 
                                        class="form-text text-muted text-danger">
                                        {{ validations.longitude.text }}
                                    </small>
                                </div>
                                <button v-if="addRegistrationAreaLoadStatus != 1" @click="addRegistrationArea(registrationArea)" type="button" 
                                    class="btn btn-success">
                                    Submit
                                </button>
                                <action-loader class="text-left" :loading='addRegistrationAreaLoadStatus == 1' 
                                    :color="'#4caf50'"></action-loader>
                            </form>
                            <div v-show="!show_form" class="alert alert-success" role="alert">
                                {{ addRegistrationAreaResult.message }}
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
    import ActionLoader from 'vue-spinner/src/ClipLoader.vue';

    export default {
        components: {
            ActionLoader
        },
        data() {
            return {
                registrationArea: {
                    name: '',
                    local_government_id: '',
                    latitude: '',
                    longitude: ''
                },
                HF: HELPERS,
                show_form: true,
                validations: {
                    name: {
                        is_valid: true,
                        text: ''
                    },
                    local_government_id: {
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
            addRegistrationAreaLoadStatus() {
                return this.$store.getters.getAddRegistrationAreaLoadStatus;
            },
            addRegistrationAreaResult() {
                return this.$store.getters.getAddRegistrationAreaResult;
            },
            localGovernment() {
                return this.$store.getters.getLocalGovernment;
            },
            localGovernmentLoadStatus() {
                return this.$store.getters.getLocalGovernmentLoadStatus;
            }
        },
        watch: {
            addRegistrationAreaLoadStatus: function() {
                let vm = this;
                if(vm.addRegistrationAreaLoadStatus == 3 && vm.addRegistrationAreaResult.success == 0) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.addRegistrationAreaResult.message, 
                        'danger'
                    );
                } else if(vm.addRegistrationAreaLoadStatus == 2 && vm.addRegistrationAreaResult.success == 1) {
                    vm.show_form = false;
                    vm.clearRegistrationAreaForm();
                } 
            },
            localGovernmentLoadStatus: function(val) {
                let vm = this;
                if(val == 2) {
                    vm.registrationArea.local_government_id = vm.localGovernment.id;
                }
            }
        },
        mounted() {

        },
        created() {
            this.$store.dispatch('getLocalGovernment', {
                id: this.$route.params.localGovernmentId
            });
        },
        methods: {
            addRegistrationArea(data) {
                if(this.validateRegistrationArea(data)) {
                    this.$store.dispatch('addRegistrationArea', data);
                }
            },
            addAnother() {
                this.$store.commit('setAddRegistrationAreaResult', {});
                this.$store.commit('setAddRegistrationAreaLoadStatus', 0);
                this.show_form = true;
            },
            validateRegistrationArea(ra) {
                let validRegistrationArea = true;
                let validations = this.validations;

                if(!ra.local_government_id) {
                    validRegistrationArea = false;
                    validations.local_government_id.is_valid = false;
                    validations.local_government_id.text = "lg id can not be empty";
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
            },
            clearRegistrationAreaForm() {
                this.registrationArea.name = '';
                this.registrationArea.latitude = '';
                this.registrationArea.longitude = '';

                this.validations = {
                    name: {
                        is_valid: true,
                        text: ''
                    },
                    local_government_id: {
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
