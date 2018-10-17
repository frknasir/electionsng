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
                                {{ pollingUnit.code }}
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
                                    <input type="text" class="form-control" v-model="pu.code" />
                                    <small v-show="!validations.code.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.code.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">
                                        description
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <input type="text" class="form-control" v-model="pu.description" />
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
                                    <input type="text" class="form-control" v-model="pu.latitude" />
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
                                    <input type="text" class="form-control" v-model="pu.longitude" />
                                    <small v-show="!validations.longitude.is_valid" 
                                        class="form-text text-muted text-danger">
                                        {{ validations.longitude.text }}
                                    </small>
                                </div>
                                <button v-if="updatePollingUnitLoadStatus != 1" @click="editPollingUnit(pu)" type="button" 
                                    class="btn btn-success">
                                    Submit
                                </button>
                                <action-loader class="text-left" :loading='updatePollingUnitLoadStatus == 1' 
                                    :color="'#4caf50'"></action-loader>
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
    import ActionLoader from 'vue-spinner/src/ClipLoader.vue';

    export default {
        components: {
            ActionLoader
        },
        data() {
            return { 
                pu: {
                    id: this.$route.params.pollingUnitId,
                    code: '',
                    description: '',
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
                    code: {
                        is_valid: true,
                        text: ''
                    },
                    description: {
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
            pollingUnit() {
                return this.$store.getters.getPollingUnit;
            },
            pollingUnitLoadStatus() {
                return this.$store.getters.getPollingUnitLoadStatus;
            },
            updatePollingUnitLoadStatus() {
                return this.$store.getters.getUpdatePollingUnitLoadStatus;
            },
            updatePollingUnitResult() {
                return this.$store.getters.getUpdatePollingUnitResult;
            }
        },
        watch: {
            updatePollingUnitLoadStatus: function() {
                let vm = this;
                if(vm.updatePollingUnitLoadStatus == 3 && vm.updatePollingUnitResult.success == 0) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updatePollingUnitResult.message, 
                        'danger'
                    );
                } else if(vm.updatePollingUnitLoadStatus == 2 && vm.updatePollingUnitResult.success == 1) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updatePollingUnitResult.message, 
                        'success'
                    );
                } 
            },
            pollingUnitLoadStatus: function(val) {
                let vm = this;
                if(val == 2) {
                    vm.pu.code = vm.pollingUnit.code;
                    vm.pu.description = vm.pollingUnit.description;
                    vm.pu.latitude = vm.pollingUnit.latitude;
                    vm.pu.longitude = vm.pollingUnit.longitude;
                }
            }
        },
        mounted() {

        },
        created() {
            this.$store.dispatch('getPollingUnit', {
                id: this.$route.params.pollingUnitId
            });
        },
        methods: {
            editPollingUnit(data) {
                if(this.validatePollingUnit(data)) {
                    this.$store.dispatch('updatePollingUnit', data);
                }
            },
            validatePollingUnit(ra) {
                let validPollingUnit = true;
                let validations = this.validations;

                if(!ra.id) {
                    validPollingUnit = false;
                    validations.id.is_valid = false;
                    validations.id.text = "id can not be empty";
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
            }
        }
    }
</script>
