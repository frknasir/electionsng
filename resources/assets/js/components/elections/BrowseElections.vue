<style scoped>
    .maps {
        height: 200px;
        z-index: 4;
    }

    #action-btn {
        position: relative;
        right: 20px;
        z-index: 3;
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
                    :to="'#'">
                    <i class="material-icons">add</i>
                </router-link>
            </div>
            <div class="card card-nav-tabs">
                <div class="card-header card-header-success">
                    <!-- colors: "header-primary", "header-info", "header-success", "header-warning", "header-danger" -->
                    <div class="nav-tabs-navigation">
                        <div class="nav-tabs-wrapper">
                            <ul class="nav nav-tabs" data-tabs="tabs">
                                <li class="nav-item">
                                    <a class="nav-link active" href="#elections" data-toggle="tab">
                                        Elections
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="card-body ">
                    <div class="tab-content">
                        <div class="tab-pane active" id="elections">

                            <div id="toolbar" class="mb-5">
                                <form action="">
                                    <div class="row">
                                        <div class="form-group col-md-4">
                                            <select v-model="election_filter" class="form-control"> 
                                                <option value="all">All</option>
                                                <option value="ongoing">Active</option>
                                                <option value="upcoming">Upcoming</option>
                                                <option value="archived">Archived</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>


                            <div class="row"> 
                                <div v-for="election in elections" v-bind:key="election.id" class="col-md-4">
                                    <div class="card">
                                        <div class="card-header card-chart card-header-success p-0">
                                            <div :id="election.id" class="maps"></div>
                                        </div>
                                        <div class="card-body">
                                            <h4 class="card-title">
                                                <router-link :to="'/election/'+election.id">
                                                    {{ election.title }}
                                                </router-link><br />
                                                <small class="badge badge-success">
                                                    {{ election.election_type_name }}
                                                </small>
                                            </h4>
                                            <p class="card-category text-center">
                                                <span class="display-4">
                                                    {{ moment(election.date, 'YYYY-MM-DD').format('ll') }}
                                                </span>
                                            </p>
                                        </div>
                                        <div class="card-footer">
                                            <div v-if="userLoadStatus == 2 && user != {}">
                                                <router-link 
                                                    :to="'/elections/edit/'+election.id" 
                                                    rel="tooltip" class="btn btn-sm btn-success">
                                                    <i class="material-icons">edit</i>
                                                </router-link>
                                                <button @click="deleteElection(election.id)" type="button" 
                                                rel="tooltip" class="btn btn-sm btn-danger">
                                                    <i class="material-icons">close</i>
                                                </button>
                                            </div>
                                            <div v-if="moment(election.updated_at, 'YYYY-MM-DD').isValid()" class="stats">
                                                <i class="material-icons">access_time</i> 
                                                updated {{ moment(election.updated_at, 'YYYY-MM-DD').fromNow() }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                moment: window.moment,
                election_filter: 'all'
            }
        },
        computed: {
            elections() {
                return this.$store.getters.getElections;
            },
            electionsLoadStatus() {
                return this.$store.getters.getElectionsLoadStatus;
            },
            user() {
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            }
        },
        watch: {
            election_filter: function(val) {
                alert(val);
            }
        },
        created() {
            this.$store.dispatch('getElections');
        },
        mounted() {
            
        }, 
        watch: {
            elections: function() {
                if(this.electionsLoadStatus == 2) {
                    this.$nextTick(function () {
                        // Code that will run only after the
                        // entire view has been rendered
                        this.createMaps();
                    });
                }
            }
        },
        methods: {
            createMaps() {
                this.elections.forEach(element => {
                    let map = L.map(element.id).setView(
                        [
                            element.state.latitude, 
                            element.state.longitude
                        ], 
                        7
                    );

                    map.touchZoom.disable();
                    map.doubleClickZoom.disable();
                    map.scrollWheelZoom.disable();
                    map.boxZoom.disable();
                    map.keyboard.disable();
                    $(".leaflet-control-zoom").css("visibility", "hidden");
                    $('.leaflet-control-attribution').hide();

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(map);
                    
                    let icon = new L.Icon.Default();
                    icon.options.shadowSize = [0,0];

                    let marker = L.marker(
                        [
                            element.state.latitude, 
                            element.state.longitude
                        ],
                        {
                            icon: icon
                        }
                    ).addTo(map).bindPopup(element.state.name)
                        .openPopup();
                });
            }
        }
    }
</script>