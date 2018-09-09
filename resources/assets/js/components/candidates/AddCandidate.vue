<style scoped>
    
</style>
<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header card-header-icon card-header-success">
                            <div class="card-icon">
                                <i class="material-icons">person_add</i>
                            </div>
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="form-group">
                                    <label for="">Political Party</label>
                                    <select class="form-control">
                                        <option v-for="party in politicalParties" v-bind:key="party.id" :value="party.id">
                                            {{ party.name + " ["+party.initials+"]" }}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="">Election</label>
                                    <input type="text" class="form-control" v-bind="election.id" disabled />
                                    <small class="form-text text-muted">{{ election.title }}</small>
                                </div>
                                <div class="form-group">
                                    <label for="">Aspirant</label>
                                    <input type="text" class="form-control" v-bind="candidate.aspirant" />
                                </div>
                                <div class="form-group">
                                    <label for="">Deputy</label>
                                    <input type="text" class="form-control" v-bind="election.id" />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                                </div>
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="checkbox" value="">
                                        Option one is this
                                        <span class="form-check-sign">
                                            <span class="check"></span>
                                        </span>
                                    </label>
                                </div>

                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        <div class="card-footer"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            candidate: {
                political_party_id: '',
                election_id: '',
                aspirant: '',
                deputy: '',
                bio: '',
                added_by: '',
                updated_by: ''
            },

        }
    },
    computed: {
        election() {
            return this.$store.getters.getElection;
        },
        electionLoadStatus() {
            return this.$store.getters.getElectionLoadStatus;
        },
        politicalParties() {
            return this.$store.getters.getPoliticalParties;
        },
        politicalPartiesLoadStatus() {
            return this.$store.getters.getPoliticalPartiesLoadStatus;
        }
    },
    created() {
        this.$store.dispatch('getPoliticalParties');
    },
    methods: {
        initClassicEditor() {
            let vm = this;
            ClassicEditor
                .create( document.querySelector( '#bio-editor' ) )
                .then( editor => {
                    vm.story_editor = editor;
                } )
                .catch( error => {
                    console.error( error );
                } );
        }
    }
}
</script>
