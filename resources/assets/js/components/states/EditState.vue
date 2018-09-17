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
                                {{ state.name }}
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
                                    <input type="text" class="form-control" v-model="st.latitude" />
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
                                    <input type="text" class="form-control" v-model="st.longitude" />
                                    <small v-show="!validations.longitude.is_valid" 
                                        class="form-text text-muted text-danger">
                                        {{ validations.longitude.text }}
                                    </small>
                                </div>
                                <button @click="editState(st)" type="button" 
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
                st: {
                    id: this.$route.params.stateId,
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
            state() {
                return this.$store.getters.getState;
            },
            stateLoadStatus() {
                return this.$store.getters.getStateLoadStatus;
            },
            updateStateLoadStatus() {
                return this.$store.getters.getUpdateStateLoadStatus;
            },
            updateStateResult() {
                return this.$store.getters.getUpdateStateResult;
            }
        },
        watch: {
            updateStateLoadStatus: function() {
                let vm = this;
                if(vm.updateStateLoadStatus == 3 && vm.updateStateResult.success == 0) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updateStateResult.message, 
                        'danger'
                    );
                } else if(vm.updateStateLoadStatus == 2 && vm.updateStateResult.success == 1) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updateStateResult.message, 
                        'success'
                    );
                } 
            },
            stateLoadStatus: function() {
                let vm = this;
                if(vm.stateLoadStatus == 2) {
                    vm.st.latitude = vm.state.latitude;
                    vm.st.longitude = vm.state.longitude;
                }
            }
        },
        mounted() {

        },
        created() {
            this.$store.dispatch('getState', {
                id: this.$route.params.stateId
            });
        },
        methods: {
            editState(data) {
                if(this.validateState(data)) {
                    this.$store.dispatch('updateState', data);
                }
            },
            validateState(st) {
                let validState = true;
                let validations = this.validations;

                if(!st.id) {
                    validState = false;
                    validations.id.is_valid = false;
                    validations.id.text = "id can not be empty";
                }

                if(!st.latitude) {
                    validState = false;
                    validations.latitude.is_valid = false;
                    validations.latitude.text = "latitude can not be empty";
                }

                if(!st.longitude) {
                    validState = false;
                    validations.longitude.is_valid = false;
                    validations.longitude.text = "longitude can not be empty";
                }

                return validState;
            }
        }
    }
</script>
