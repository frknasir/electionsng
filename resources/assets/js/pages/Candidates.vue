<style scoped>
    table {
        overflow:scroll;
    }
</style>
<template>
    <div class="content">
        <div class="container-fluid">

            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header card-header-icon card-header-success">
                            <div class="card-icon">
                            <i class="material-icons">group</i>
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="toolbar">
                                <ul class="list-inline">
                                    <li class="list-inline-item col-md-4 mb-3 mt-3 pull-left">
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
                            <table id="candidates-table" 
                                class="table table-success table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th class="text-center">Id</th>
                                        <th>Party</th>
                                        <th>Aspirant</th>
                                        <th>Deputy</th>
                                        <th>Bio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="candidate in candidates" v-bind:key="candidate.id">
                                        <td class="text-center">
                                            {{ candidate.id }}
                                        </td>
                                        <td>
                                            {{ candidate.party_name +
                                            '[' +candidate.party_initials + 
                                            ']' }}</td>
                                        <td>{{ candidate.aspirant }}</td>
                                        <td>{{ candidate.deputy }}</td>
                                        <td>
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
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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
        candidatesLoadStatus() {
            return this.$store.getters.getCandidatesLoadStatus;
        },
        candidates() {
            return this.$store.getters.getCandidates;
        },
        pagination() {
            return this.$store.getters.getPagination;
        }
    },
    watch: {
        candidatesLoadStatus: function () {
            if(this.candidatesLoadStatus == 2) {

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
        }
    }
}
</script>
