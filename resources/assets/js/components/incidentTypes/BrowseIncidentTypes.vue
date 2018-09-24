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
		td:nth-of-type(2):before { content: "Name: "; }
        td:nth-of-type(3):before { content: "Actions: "; }
	}

    #action-btn {
        position: relative;
        right: 20px;
        z-index: 4;
    }

    #action-btn .btn {
        position: fixed;
        right: 120px;
        bottom: 10%;
    }
</style>
<template>
    <div class="content">
        <div class="container">

            <div v-if="userLoadStatus == 2 && user != {}" id="action-btn">
                <router-link class="btn btn-success btn-fab btn-lg btn-round" 
                    :to="'/incidentTypes/add'">
                    <i class="material-icons">add</i>
                </router-link>
            </div>

            
            <div class="card">
                <div class="card-header card-header-icon card-header-success">
                    <div class="card-icon">
                        <i class="material-icons">event_note</i>
                    </div>
                </div>
                <div class="card-body">
                    <table role="table" id="types-table" 
                        class="table table-success table-striped table-bordered">
                        <thead role="group">
                            <tr>
                                <th role="columnheader">Id</th>
                                <th role="columnheader">Name</th>
                                <th role="columnheader" v-if="userLoadStatus == 2 && user != {}">Action</th>
                            </tr>
                        </thead>
                        <tbody role="rowgroup">
                            <tr role="row" v-for="(type, index) in incidentTypes" v-bind:key="type.id">
                                <td role="cell">
                                    {{ index + 1 }}
                                </td>
                                <td role="cell">
                                    {{ type.name }}
                                </td>
                                <td v-if="userLoadStatus == 2 && user != {}" class="td-actions">
                                    <router-link 
                                        :to="'/incidentTypes/edit/'+type.id" 
                                        rel="tooltip" class="btn btn-success">
                                        <i class="material-icons">edit</i>
                                    </router-link>
                                    <button @click="deleteIncidentType(type.id)" type="button" rel="tooltip" class="btn btn-danger">
                                        <i class="material-icons">close</i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
                HF: HELPERS
            }
        },
        computed: {
            incidentTypes() {
                return this.$store.getters.getIncidentTypes;
            },
            incidentTypesLoadStatus() {
                return this.$store.getters.getIncidentTypesLoadStatus;
            },
            user() {
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            },
            deleteIncidentTypeLoadStatus() {
                return this.$store.getters.getDeleteIncidentTypeLoadStatus;
            },
            deleteIncidentTypeResult() {
                return this.$store.getters.getDeleteIncidentTypeResult;
            }
        },
        created() {
            this.$store.dispatch('getIncidentTypes');
        },
        mounted() {

        },
        watch: {
            deleteIncidentTypeLoadStatus: function() {
                let vm = this;
                
                if(vm.deleteIncidentTypeLoadStatus == 3 && vm.deleteIncidentTypeResult.success == 0) {
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.deleteIncidentTypeResult.message, 
                        'danger'
                    );
                } else if(vm.deleteIncidentTypeLoadStatus == 2 && vm.deleteIncidentTypeResult.success == 1) {
                    //reload Incident Types
                    this.$store.dispatch('getIncidentTypes');
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.deleteIncidentTypeResult.message, 
                        'success'
                    );
                } 
            }
        },
        methods: {
            deleteIncidentType(id) {
                if(confirm('Are you sure?')) {
                    this.$store.dispatch('deleteIncidentType', {
                        id: id
                    });
                }
            }
        }
    }
</script>
