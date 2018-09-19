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
                                Edit Party
                            </div>
                        </div>
                        <div class="card-body">
                            <form v-show="show_form">
                                <div class="form-group">
                                    <label for="">
                                        initials
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <input type="text" class="form-control" v-model="party.initials" />
                                    <small v-show="!validations.initials.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.initials.text }}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <label for="">
                                        name
                                        <sup>
                                            <i class="fa fa-asterisk small" style="color:red"></i>
                                        </sup>
                                    </label>
                                    <input type="text" class="form-control" v-model="party.name" />
                                    <small v-show="!validations.name.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.name.text }}
                                    </small>
                                </div>
                                <button @click="editPoliticalParty(party)" type="button" 
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
                party: {
                    id: this.$route.params.politicalPartyId,
                    name: '',
                    initials: ''
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
                    initials: {
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
            politicalParty() {
                return this.$store.getters.getPoliticalParty;
            },
            politicalPartyLoadStatus() {
                return this.$store.getters.getPoliticalPartyLoadStatus;
            },
            updatePoliticalPartyLoadStatus() {
                return this.$store.getters.getUpdatePoliticalPartyLoadStatus;
            },
            updatePoliticalPartyResult() {
                return this.$store.getters.getUpdatePoliticalPartyResult;
            }
        },
        watch: {
            updatePoliticalPartyLoadStatus: function() {
                let vm = this;
                if(vm.updatePoliticalPartyLoadStatus == 3 && vm.updatePoliticalPartyResult.success == 0) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updatePoliticalPartyResult.message, 
                        'danger'
                    );
                } else if(vm.updatePoliticalPartyLoadStatus == 2 && vm.updatePoliticalPartyResult.success == 1) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.updatePoliticalPartyResult.message, 
                        'success'
                    );
                } 
            },
            politicalPartyLoadStatus: function(val) {
                let vm = this;
                if(val == 2) {
                    vm.party.name = vm.politicalParty.name;
                    vm.party.initials = vm.politicalParty.initials;
                }
            }
        },
        mounted() {

        },
        created() {
            this.$store.dispatch('getPoliticalParty', {
                id: this.$route.params.politicalPartyId
            });
        },
        methods: {
            editPoliticalParty(data) {
                if(this.validatePoliticalParty(data)) {
                    this.$store.dispatch('updatePoliticalParty', data);
                }
            },
            validatePoliticalParty(party) {
                let validPoliticalParty = true;
                let validations = this.validations;

                if(!party.id) {
                    validPoliticalParty = false;
                    validations.id.is_valid = false;
                    validations.id.text = "id can not be empty";
                }

                if(!party.name) {
                    validPoliticalParty = false;
                    validations.name.is_valid = false;
                    validations.name.text = "name can not be empty";
                }

                if(!party.initials) {
                    validPoliticalParty = false;
                    validations.initials.is_valid = false;
                    validations.initials.text = "initials can not be empty";
                }

                return validPoliticalParty;
            }
        }
    }
</script>
