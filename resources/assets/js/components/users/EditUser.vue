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
                                Edit User
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
                                    <input type="text" class="form-control" v-model="usr.name" />
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
                                    <input type="email" class="form-control" v-model="usr.email" />
                                    <small v-show="!validations.email.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.email.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">
                                        role
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <select class="form-control" v-model="usr.role_id">
                                        <option v-for="role in roles" v-bind:key="role.id" :value="role.id">
                                            {{ role.name }}
                                        </option>
                                    </select>
                                    <small v-show="!validations.role_id.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.role_id.text }}
                                    </small>
                                </div>
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="checkbox" v-model="usr.active" value="1"> Is User Active?
                                        <span class="form-check-sign">
                                            <span class="check"></span>
                                        </span>
                                    </label>
                                </div>
                                <small v-show="!validations.active.is_valid" class="form-text text-muted text-danger">
                                    {{ validations.active.text }}
                                </small>
                                <button v-if="updateUserLoadStatus != 1" @click="editUser(usr)" user="button" 
                                    class="btn btn-success">
                                    Submit
                                </button>
                                <action-loader class="text-left" :loading='updateUserLoadStatus == 1' 
                                    :color="'#4caf50'"></action-loader>
                            </form>
                        </div>
                    </div>
                </div>


                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header card-header-text card-header-success">
                            <div class="card-text">
                                {{ user.name }} <br >
                                <small>
                                    Password Change
                                </small>
                            </div>
                        </div>
                        <div class="card-body">
                            <form v-show="show_form">
                                <div class="form-group">
                                    <label for="">
                                        password
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <input type="text" class="form-control" v-model="changePassword.password" />
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
                                <button v-if="changeUserPasswordLoadStatus != 1" @click="changeUserPassword(changePassword)" user="button" 
                                    class="btn btn-success">
                                    Submit
                                </button>
                                <action-loader class="text-left" :loading='changeUserPasswordLoadStatus == 1' 
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
                usr: {
                    id: this.$route.params.userId,
                    name: '',
                    email: '',
                    role_id: '',
                    active: ''
                },
                changePassword: {
                    id: this.$route.params.userId,
                    password: ''
                },
                cpassword: '',
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
                    },
                    password: {
                        is_valid: true, 
                        text: ''
                    },
                    cpassword: {
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
                return this.$store.getters.getAUser;
            },
            userLoadStatus() {
                return this.$store.getters.getAUserLoadStatus;
            },
            roles() {
                return this.$store.getters.getRoles;
            },
            rolesLoadStatus() {
                return this.$store.getters.rolesLoadStatus;
            },
            updateUserLoadStatus() {
                return this.$store.getters.getUpdateUserLoadStatus;
            },
            updateUserResult() {
                return this.$store.getters.getUpdateUserResult;
            },
            changeUserPasswordLoadStatus() {
                return this.$store.getters.getChangeUserPasswordLoadStatus;
            },
            changeUserPasswordResult() {
                return this.$store.getters.getChangeUserPasswordResult;
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
            changeUserPasswordLoadStatus: function() {
                let vm = this;
                if(vm.changeUserPasswordResult === 3 && vm.changeUserPasswordResult.success == 0) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top',
                        'center',
                        vm.changeUserPasswordResult.message,
                        'danger'
                    );
                } else if(vm.changeUserPasswordLoadStatus == 2 && vm.changeUserPasswordResult.success == 1) {
                    vm.changePassword.password = '';
                    vm.cpassword = '';
                    
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top',
                        'center',
                        vm.changeUserPasswordResult.message,
                        'success'
                    );
                }
            },
            userLoadStatus: function(val) {
                let vm = this;
                if(val == 2) {
                    vm.usr.name = vm.user.name;
                    vm.usr.email = vm.user.email;
                    vm.usr.role_id = vm.user.role_id;
                    vm.usr.active = vm.user.active;
                }
            }
        },
        mounted() {

        },
        created() {
            this.$store.dispatch('getRoles');

            this.$store.dispatch('getAUser', {
                id: this.$route.params.userId
            });
        },
        methods: {
            editUser(data) {

                if(!this.usr.active) {
                    data.active = 0;
                }

                if(this.validateUser(data)) {
                    this.$store.dispatch('updateUser', data);
                }
            },
            changeUserPassword(data) {
                if(this.validatePasswordChange(data)) {
                    this.$store.dispatch('changeUserPassword', data);
                }
            },
            validateUser(user) {
                let validUser = true;
                let validations = this.validations;

                if(!user.id) {
                    validUser = false;
                    validations.id.is_valid = false;
                    validations.id.text = "id can not be empty";
                }

                if(!user.name) {
                    validUser = false;
                    validations.name.is_valid = false;
                    validations.name.text = "name can not be empty";
                }

                if(!user.email) {
                    validUser = false;
                    validations.email.is_valid = false;
                    validations.email.text = "email can not be empty";
                }

                if(!user.role_id) {
                    validUser = false;
                    validations.role_id.is_valid = false;
                    validations.role_id.text = "role can not be empty";
                }
                
                return validUser;
            },
            validatePasswordChange(data) {
                let valid = true;
                let validations = this.validations;

                if(!data.id) {
                    valid = false;
                    validations.id.is_valid = false;
                    validations.id.text = "id can not be empty";
                }

                if(!data.password) {
                    valid = false;
                    validations.password.is_valid = false;
                    validations.password.text = "password can not be empty";
                }

                if(!this.cpassword) {
                    valid = false;
                    validations.cpassword.is_valid = false;
                    validations.cpassword.text = "password confirmation can not be empty";
                }

                if(data.password !== this.cpassword) {
                    valid = false;
                    validations.cpassword.is_valid = false;
                    validations.cpassword.text = "passwords do not match";
                }

                return valid;
            }
        }
    }
</script>