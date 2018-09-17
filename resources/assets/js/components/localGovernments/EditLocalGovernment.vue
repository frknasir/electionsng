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
                                {{ localGovernment.name }}
                            </div>
                        </div>
                        <div class="card-body">
                            <form v-show="show_form">
                                <div class="form-group">
                                    <label for="">
                                        Latitude
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <input type="text" class="form-control" v-model="lg.latitude" />
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
                                    <input type="text" class="form-control" v-model="lg.longitude" />
                                    <small v-show="!validations.longitude.is_valid" 
                                        class="form-text text-muted text-danger">
                                        {{ validations.longitude.text }}
                                    </small>
                                </div>
                                <button @click="editLocalGovernment(lg)" type="button" 
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
                lg: {
                    id: this.$route.params.localGovernmentId,
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
            localGovernment() {
                return this.$store.getters.getLocalGovernment;
            },
            localGovernmentLoadStatus() {
                return this.$store.getters.getLocalGovernmentLoadStatus;
            },
            updateLocalGovernmentLoadStatus() {
                return this.$store.getters.getUpdateLocalGovernmentLoadStatus;
            },
            updateLocalGovernmentResult() {
                return this.$store.getters.getUpdateLocalGovernmentResult;
            }
        },
        watch: {
            updateLocalGovernmentLoadStatus: function() {
                let vm = this;
                if(vm.updateLocalGovernmentLoadStatus == 3 && vm.updateLocalGovernmentResult.success == 0) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updateLocalGovernmentResult.message, 
                        'danger'
                    );
                } else if(vm.updateLocalGovernmentLoadStatus == 2 && vm.updateLocalGovernmentResult.success == 1) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updateLocalGovernmentResult.message, 
                        'success'
                    );
                } 
            },
            localGovernmentLoadStatus: function(val) {
                let vm = this;
                if(val == 2) {
                    vm.lg.latitude = vm.localGovernment.latitude;
                    vm.lg.longitude = vm.localGovernment.longitude;
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
            editLocalGovernment(data) {
                if(this.validateLocalGovernment(data)) {
                    this.$store.dispatch('updateLocalGovernment', data);
                }
            },
            validateLocalGovernment(lg) {
                let validLocalGovernment = true;
                let validations = this.validations;

                if(!lg.id) {
                    validLocalGovernment = false;
                    validations.id.is_valid = false;
                    validations.id.text = "id can not be empty";
                }

                if(!lg.latitude) {
                    validLocalGovernment = false;
                    validations.latitude.is_valid = false;
                    validations.latitude.text = "latitude can not be empty";
                }

                if(!lg.longitude) {
                    validLocalGovernment = false;
                    validations.longitude.is_valid = false;
                    validations.longitude.text = "longitude can not be empty";
                }

                return validLocalGovernment;
            }
        }
    }
</script>
