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
                                New Party
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
                                    <input type="text" class="form-control" v-model="politicalParty.initials" />
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
                                    <input type="text" class="form-control" v-model="politicalParty.name" />
                                    <small v-show="!validations.name.is_valid" class="form-text text-muted text-danger">
                                        {{ validations.name.text }}
                                    </small>
                                </div>
                                <button v-if="addPoliticalPartyLoadStatus != 1" @click="addPoliticalParty(politicalParty)" type="button" 
                                    class="btn btn-success">
                                    Submit
                                </button>
                                <action-loader class="text-left" :loading='addPoliticalPartyLoadStatus == 1' 
                                    :color="'#4caf50'"></action-loader>
                            </form>
                            <div v-show="!show_form" class="alert alert-success" role="alert">
                                {{ addPoliticalPartyResult.message }}
                                <a @click="addAnother()" class="alert-link">
                                    &nbsp;Add Another party
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
                politicalParty: {
                    initials: '',
                    name: ''
                },
                HF: HELPERS,
                show_form: true,
                validations: {
                    initials: {
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
            addPoliticalPartyLoadStatus() {
                return this.$store.getters.getAddPoliticalPartyLoadStatus;
            },
            addPoliticalPartyResult() {
                return this.$store.getters.getAddPoliticalPartyResult;
            }
        },
        watch: {
            addPoliticalPartyLoadStatus: function() {
                let vm = this;
                if(vm.addPoliticalPartyLoadStatus == 3 && vm.addPoliticalPartyResult.success == 0) {
                    vm.show_form = true;
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.addPoliticalPartyResult.message, 
                        'danger'
                    );
                } else if(vm.addPoliticalPartyLoadStatus == 2 && vm.addPoliticalPartyResult.success == 1) {
                    vm.show_form = false;
                    vm.clearPoliticalPartyForm();
                } 
            }
        },
        mounted() {

        },
        created() {

        },
        methods: {
            addPoliticalParty(data) {
                if(this.validatePoliticalParty(data)) {
                    this.$store.dispatch('addPoliticalParty', data);
                }
            },
            addAnother() {
                this.$store.commit('setAddPoliticalPartyResult', {});
                this.$store.commit('setAddPoliticalPartyLoadStatus', 0);
                this.show_form = true;
            },
            validatePoliticalParty(party) {
                let validPoliticalParty = true;
                let validations = this.validations;

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
            },
            clearPoliticalPartyForm() {
                this.politicalParty.initials = '';
                this.politicalParty.name = '';

                this.validations = {
                    initials: {
                        is_valid: true,
                        text: ''
                    },
                    name: {
                        is_valid: true,
                        text: ''
                    }
                }
            }
        }
    }
</script>
