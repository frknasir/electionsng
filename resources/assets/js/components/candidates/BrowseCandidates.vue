<style scoped>
    /*
	Max width before this PARTICULAR table gets nasty. 
    This query will take effect for any screen smaller 
    than 760px and also iPads specifically.
	*/
	@media
    only screen 
    and (max-width: 760px), (min-device-width: 768px) 
    and (max-device-width: 1024px)  {

		/* Force table to not be like tables anymore */
		table, thead, tbody, th, td, tr {
			display: block;
		}

		/* Hide table headers (but not display: none;, for accessibility) */
		thead tr {
			position: absolute;
			top: -9999px;
			left: -9999px;
		}

		td:before {
			/* Now like a table header */
			position: relative;
			/* Top/left values mimic padding */
			top: 0;
			left: 6px;
			width: 45%;
			padding-right: 50px;
			white-space: nowrap;
		}

		/*
		Label the data
        You could also use a data-* attribute and content 
        for this. That way "bloats" the HTML, this way 
        means you need to keep HTML and CSS in sync. 
        Lea Verou has a clever way to handle with text-shadow.
		*/
		td:nth-of-type(1):before { content: "Id: "; }
		td:nth-of-type(2):before { content: "Party: "; }
		td:nth-of-type(3):before { content: "Aspirant: "; }
		td:nth-of-type(4):before { content: "Deputy: "; }
		td:nth-of-type(5):before { content: "Bio: "; }
        td:nth-of-type(6):before { content: "Actions: "; }
	}

    #action-btn {
        position: relative;
        right: 20px;
        z-index: 3;
    }

    #action-btn .btn {
        position: fixed;
        right: 30px;
        bottom: 10%;
    }
</style>
<template>
    <div class="content">
        <div class="container-fluid">
            <div v-if="userLoadStatus == 2 && user != {}" id="action-btn">
                <router-link class="btn btn-success btn-fab btn-lg btn-round" 
                    :to="'/election/'+election.id+'/candidates/add'">
                    <i class="material-icons">add</i>
                </router-link>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header card-header-icon card-header-success">
                            <div class="card-icon">
                                <i class="material-icons">group</i>
                            </div>
                            <div id="toolbar" class="mb-3">
                                <ul class="list-inline">
                                    <li style="color: black;" class="list-inline-item col-md-4 mb-3 mt-3 pull-left">
                                        showing {{ pagination.to }} of {{ pagination.total }} candidates
                                    </li>
                                    <li class="list-inline-item col-md-4 mb-3 mt-3 pull-right">
                                        <form action="">
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">
                                                        <i class="material-icons">search</i>
                                                    </span>
                                                </div>
                                                <input type="text" class="form-control form-control-success" 
                                                    placeholder="Search Candidates">
                                            </div>
                                        </form>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="card-body">
                            <action-loader class="text-center" :loading='candidatesLoadStatus == 1' 
                            :color="'#4caf50'"></action-loader>

                            <table role="table" id="candidates-table" 
                                class="table table-success table-striped table-bordered">
                                <thead role="group">
                                    <tr>
                                        <th role="columnheader">Id</th>
                                        <th role="columnheader">Party</th>
                                        <th role="columnheader">Aspirant</th>
                                        <th role="columnheader">Deputy</th>
                                        <th role="columnheader">Bio</th>
                                        <th role="columnheader" v-if="userLoadStatus == 2 && user != {}">Action</th>
                                    </tr>
                                </thead>
                                <tbody role="rowgroup">
                                    <tr role="row" v-for="(candidate, index) in candidates" v-bind:key="candidate.id">
                                        <td role="cell">
                                            {{ index + 1 }}
                                        </td>
                                        <td role="cell">
                                            {{ candidate.party_name +
                                            '[' +candidate.party_initials + 
                                            ']' }}</td>
                                        <td role="cell">{{ candidate.aspirant }}</td>
                                        <td role="cell">{{ candidate.deputy }}</td>
                                        <td role="cell">
                                            <button 
                                            v-bind:data-name="candidate.aspirant" 
                                            v-bind:data-bio="candidate.bio" 
                                            class="btn btn-success" 
                                                data-toggle="modal" data-target="#bioModal">
                                                <i class="material-icons">
                                                    notes
                                                </i>
                                                Read
                                            </button>
                                        </td>
                                        <td v-if="userLoadStatus == 2 && user != {}" class="td-actions">
                                            <router-link 
                                                :to="'/election/'+election.id+'/candidates/edit/'+candidate.id" 
                                                rel="tooltip" class="btn btn-success">
                                                <i class="material-icons">edit</i>
                                            </router-link>
                                            <button @click="deleteCandidate(candidate.id)" type="button" rel="tooltip" class="btn btn-danger">
                                                <i class="material-icons">close</i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div id="pagination-btn">
                                <nav aria-label="Page navigation">
                                    <ul class="pagination justify-content-end text-black">
                                        <li class="page-item" v-bind:class="[{disabled: !pagination.prev_page_url}]">
                                            <a @click="getCandidates(pagination.prev_page_url)" class="page-link" tabindex="-1">Previous</a>
                                        </li>
                                        <li class="page-item" v-bind:class="[{disabled: !pagination.next_page_url}]">
                                            <a @click="getCandidates(pagination.next_page_url)" class="page-link">Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>



        <!-- candidate bio modal -->
        <div class="modal fade" id="bioModal" tabindex="-1" role="dialog" 
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body"></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { HELPERS } from '../../helpers.js';
    import ActionLoader from 'vue-spinner/src/ScaleLoader.vue';

    export default {
        components: {
            ActionLoader
        },
        data() {
            return {
                HF: HELPERS
            }
        },
        mounted() {
            this.initBioModal();
        },
        created() {
            this.$store.dispatch('getCandidates', {
                id: this.$route.params.id,
                url: null 
            });
        },
        computed: {
            election() {
                return this.$store.getters.getElection;
            },
            electionLoadStatus() {
                return this.$store.getters.getElectionLoadStatus;
            },
            candidatesLoadStatus() {
                return this.$store.getters.getCandidatesLoadStatus;
            },
            candidates() {
                return this.$store.getters.getCandidates;
            },
            user() {
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            },
            pagination() {
                return this.$store.getters.getPagination;
            },
            deleteCandidateLoadStatus() {
                return this.$store.getters.getDeleteCandidateLoadStatus;
            },
            deleteCandidateResult() {
                return this.$store.getters.getDeleteCandidateResult;
            }
        },
        watch: {
            candidatesLoadStatus: function () {
                if(this.candidatesLoadStatus == 2) {

                }
            },
            deleteCandidateLoadStatus: function() {
                let vm = this;
                
                if(vm.deleteCandidateLoadStatus == 3 && vm.deleteCandidateResult.success == 0) {
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.deleteCandidateResult.message, 
                        'danger'
                    );
                } else if(vm.deleteCandidateLoadStatus == 2 && vm.deleteCandidateResult.success == 1) {
                    //reload candidates
                    this.$store.dispatch('getCandidates', {
                        id: this.$route.params.id,
                        url: null 
                    });
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.deleteCandidateResult.message, 
                        'success'
                    );
                } 
            }
        },
        methods: {
            initBioModal() {
                $('#bioModal').on('show.bs.modal', function (event) {
                    var button = $(event.relatedTarget) // Button that triggered the modal
                    var name = button.data('name');
                    var bio = button.data('bio'); // Extract info from data-* attributes
                    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
                    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
                    var modal = $(this);
                    modal.find('.modal-title').text(name);
                    modal.find('.modal-body').html(bio);
                })
            },
            getCandidates(url) {
                this.$store.dispatch('getCandidates', {
                    id: this.$route.params.id,
                    url: url
                });
            },
            deleteCandidate(data) {
                if(confirm("are you sure?")){
                    this.$store.dispatch('deleteCandidate', {
                        id: data
                    });
                }
            }
        }
    }
</script>
