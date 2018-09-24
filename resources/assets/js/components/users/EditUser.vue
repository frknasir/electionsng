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
                                    <input type="text" class="form-control" v-model="user.name" />
                                    <small v-show="!validations.name.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.name.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">
                                        email
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <input type="email" class="form-control" v-model="user.email" />
                                    <small v-show="!validations.email.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.email.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">
                                        password
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <input type="text" class="form-control" v-model="user.password" />
                                    <small v-show="!validations.password.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.password.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">
                                        password
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <input type="text" class="form-control" v-model="cpassword" />
                                    <small v-show="!validations.cpassword.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.cpassword.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">
                                        role
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <select class="form-control" v-model="user.role_id">
                                        <option v-for="role in roles" v-bind:key="role.id" :value="role.id">
                                            {{ role.name }}
                                        </option>
                                    </select>
                                    <small v-show="!validations.role_id.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.role_id.text }}
                                    </small>
                                </div>
                                <button @click="addUser(user)" user="button" 
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
                usr: {
                    id: this.$route.params.userId,
                    name: '',
                    email: '',
                    role_id: '',
                    active: ''
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
                    email: {
                        is_valid: true,
                        text: ''
                    },
                    role_id: {
                        is_valid: true,
                        text: ''
                    },
                    active: {
                        is_valid: true,
                        text: ''
                    }
                }
            }
        },
        computed: {
            authUser() {
                return this.$store.getters.getUser;
            },
            authUserLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            },
            user() {
                return this.$store.getAUser;
            },
            userLoadStatus() {
                return this.$store.getAUserLoadStatus;
            },
            updateUserLoadStatus() {
                return this.$store.getters.getUpdateUserLoadStatus;
            },
            updateUserResult() {
                return this.$store.getters.getUpdateUserResult;
            }
        },
        watch: {
            updateUserLoadStatus: function() {
                let vm = this;
                if(vm.updateUserLoadStatus == 3 && vm.updateUserResult.success == 0) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updateUserResult.message, 
                        'danger'
                    );
                } else if(vm.updateUserLoadStatus == 2 && vm.updateUserResult.success == 1) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updateUserResult.message, 
                        'success'
                    );
                } 
            },
            updateUserLoadStatus: function(val) {
                let vm = this;
                if(val == 2) {
                    vm.type.name = vm.user.name;
                    vm.usr.email = vm.user.email;
                    vm.usr.role_id = vm.user.role_id;
                    vm.usr.active = vm.user.active;
                }
            }
        },
        mounted() {

        },
        created() {
            this.$store.dispatch('getAUser', {
                id: this.$route.params.userId
            });
        },
        methods: {
            edituser(data) {
                if(this.validateuser(data)) {
                    this.$store.dispatch('updateuser', data);
                }
            },
            validateuser(type) {
                let validuser = true;
                let validations = this.validations;

                if(!type.id) {
                    validuser = false;
                    validations.id.is_valid = false;
                    validations.id.text = "id can not be empty";
                }

                if(!type.name) {
                    validuser = false;
                    validations.name.is_valid = false;
                    validations.name.text = "name can not be empty";
                }

                return validuser;
            }
        }
    }
</script>
