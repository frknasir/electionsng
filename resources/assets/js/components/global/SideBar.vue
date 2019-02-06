<style scoped>

</style>

<template>
    <div class="sidebar" data-color="green" data-background-color="white" :data-image="bg">
        <!--
            Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

            Tip 2: you can also add an image using data-image tag
        -->
        <div class="logo">
            <router-link class="simple-text logo-mini" to="/">
                EN
            </router-link>
            <router-link class="simple-text logo-normal" to="/">
                ElectionsNG
            </router-link>
        </div>
        <div class="sidebar-wrapper">
            <div v-show="userLoadStatus == 2 && user != {}" class="user">
                <div class="photo">
                    <img src="/img/default-avatar.png" />
                </div>
                <div class="user-info">
                    <a data-toggle="collapse" href="#collapseExample" class="username">
                        <span>
                            {{ user.name }}
                            <b class="caret"></b>
                        </span>
                    </a>
                    <div class="collapse" id="collapseExample">
                        <ul class="nav">
                            <li class="nav-item">
                                <a class="nav-link" :href="config.URL+'/logout'" 
                                    onclick="event.preventDefault();
                                    document.getElementById('logout-form').submit();">
                                    <span class="sidebar-mini"> L </span>
                                    <span class="sidebar-normal"> Logout </span>
                                </a>
                                <form id="logout-form" :action="config.URL+'/logout'" 
                                    method="POST" style="display: none;">
                                    <input type="hidden" name="_token" id="csrf-token" 
                                        :value="csrf_token" />
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-show="userLoadStatus != 2 || user == {}" class="user">
                <!-- Login -->
                <div class="photo">
                    <img src="/img/default-avatar.png" />
                </div>
                <div class="user-info">
                    <a class="username" :href="config.URL+'/login'">
                        <span>Login</span>
                    </a>
                </div>
                <!-- End Login -->

                <!-- Register -->
                <div class="photo">
                    <img src="/img/default-avatar.png" />
                </div>
                <div class="user-info">
                    <a class="username" :href="config.URL+'/register'">
                        <span>Register</span>
                    </a>
                </div> 
                <!-- End Register -->
            </div>
            <ul class="nav">
                <!--<li @click="updateActivePage('home')" class="nav-item" :class="{ 'active': active_pages.home.is_active }">
                    <router-link class="nav-link" to='/'>
                        <i class="material-icons">home</i>
                        <p>Home</p>
                    </router-link>
                </li>-->

                <!-- the chunk below will be visible only when an election is not being monitored -->
                <div v-if="$route.meta.isElectionPage">
                    <li @click="updateActivePage('home')" class="nav-item" :class="{ 'active': active_pages.home.is_active }">
                        <router-link class="nav-link" to='/'>
                            <i class="material-icons">home</i>
                            <p>Back to Home</p>
                        </router-link>
                    </li>
                    <li @click="updateActivePage('dashboard')" class="nav-item" :class="{ 'active': active_pages.dashboard.is_active }">
                        <router-link class="nav-link" :to="'/election/'+$route.params.id">
                            <i class="material-icons">dashboard</i>
                            <p>Dashboard</p>
                        </router-link>
                    </li>
                    <li @click="updateActivePage('candidates')" class="nav-item" :class="{ 'active': active_pages.candidates.is_active }">
                        <router-link class="nav-link" :to="'/election/'+$route.params.id+'/candidates'">
                            <i class="material-icons">
                                group
                            </i>
                            <p>Candidates</p>
                        </router-link>
                    </li>
                    <li @click="updateActivePage('updates')" class="nav-item" :class="{ 'active': active_pages.updates.is_active }">
                        <router-link class="nav-link" :to="'/election/'+$route.params.id+'/liveUpdates'">
                            <i class="material-icons">
                                sync
                            </i>
                            <p>Live Updates</p>
                        </router-link>
                    </li>
                    <li @click="updateActivePage('incidents')" class="nav-item" :class="{ 'active': active_pages.incidents.is_active }">
                        <router-link class="nav-link" :to="'/election/'+$route.params.id+'/incidents'">
                            <i class="material-icons">
                                event_note
                            </i>
                            <p>Incidents</p>
                        </router-link>
                    </li>
                    <li @click="updateActivePage('results')" class="nav-item" :class="{ 'active': active_pages.results.is_active }">
                        <router-link class="nav-link" :to="'/election/'+$route.params.id+'/results'">
                            <i class="material-icons">
                                ballot
                            </i>
                            <p>Results</p>
                        </router-link>
                    </li>
                    <li @click="updateActivePage('pictures')" class="nav-item" :class="{ 'active': active_pages.pictures.is_active }">
                        <router-link class="nav-link" :to="'/election/'+$route.params.id+'/pictures'">
                            <i class="material-icons">
                                image
                            </i>
                            <p>Polls In Pictures</p>
                        </router-link>
                    </li>
                </div>
                <!-- then end of the chunk only related to elections' pages -->

                <div v-if="!$route.meta.isElectionPage">
                <li @click="updateActivePage('elections')" class="nav-item" :class="{ 'active': active_pages.elections.is_active }">
                    <router-link class="nav-link" to='/elections'>
                        <i class="material-icons">
                            ballot
                        </i>
                        <p>Elections</p>
                    </router-link>
                </li>
                <li @click="updateActivePage('findYourPU')" class="nav-item" :class="{ 'active': active_pages.findYourPU.is_active }">
                    <router-link class="nav-link" to='/find-your-pu'>
                        <i class="material-icons">
                            location_on
                        </i>
                        <p>Find Your PU</p>
                    </router-link>
                </li>
                <!-- Administrative Chunk -->
                <li v-if="userLoadStatus == 2 && user != {} && canSeeAdminDropdown" class="nav-item dropdown" 
                    :class="{ 'active': active_pages.administration.is_active }">
                    <a class="nav-link" data-toggle="collapse" href="#adminCollapse">
                        <i class="material-icons">
                            settings
                        </i>
                        <p>
                            Administration
                            <b class="caret"></b>
                        </p>
                    </a>

                    <div class="collapse" id="adminCollapse">
                        <ul class="nav">
                            <li @click="updateActivePage('administration')" class="nav-item ">
                                <router-link class="dropdown-item" to="/states">
                                    <span class="sidebar-mini">EA</span>
                                    <span class="sidebar-normal">Electoral Areas</span>
                                </router-link>
                            </li>
                            <li v-show="isAdmins" @click="updateActivePage('administration')" class="nav-item">
                                <router-link class="dropdown-item" to='/politicalParties'>
                                    <span class="sidebar-mini">PP</span>
                                    <span class="sidebar-normal">Political Parties</span>
                                </router-link>
                            </li>
                            <li v-show="isAdmins" @click="updateActivePage('administration')" class="nav-item">
                                <router-link class="dropdown-item" to='/incidentTypes'>
                                    <span class="sidebar-mini">IT</span>
                                    <span class="sidebar-normal">Incident Types</span>
                                </router-link>
                            </li>
                            <li v-show="user.roles.includes('Super-admin')" @click="updateActivePage('administration')" class="nav-item">
                                <router-link class="dropdown-item" to='/users'>
                                    <span class="sidebar-mini">MU</span>
                                    <span class="sidebar-normal">Manage Users</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>
                </div>
                <!-- /End Administrative Chunk -->
            <!-- your sidebar here -->
            </ul>
            <hr>
            <div class="copyright p-3">
                <div class="credits" style="font-size: 12px;"> 
                    © 2019 PTCIJ, all rights reserved. <br><br> 
                    Made with <i class="material-icons" alt="love">favorite</i> for a better Nigeria. 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { HELPERS } from '../../helpers.js';
    import bg from '../../../../../public/img/sidebar-1.jpg';
    import { CONFIG } from '../../config.js';

    export default {
        data() {
            return {
                HF: HELPERS,
                bg: bg,
                active: this.$route.name,
                config: CONFIG,
                csrf_token: $('meta[name="csrf-token"]').attr('content'),
                active_pages: {
                    home: {
                        is_active: true
                    },
                    findYourPU: {
                        is_active: false
                    },
                    dashboard: {
                        is_active: false
                    },
                    candidates: {
                        is_active: false
                    },
                    updates: {
                        is_active: false
                    },
                    incidents: {
                        is_active: false
                    },
                    results: {
                        is_active: false
                    },
                    pictures: {
                        is_active: false
                    },
                    elections: {
                        is_active: false
                    },
                    administration: {
                        is_active: false
                    }
                },
                isAdmins: false,
                canSeeAdminDropdown: false
            } 
        },
        created() {
            this.$store.dispatch('getAuthUser');

            if(this.userLoadStatus == 2) {
                this.isAdmins = this.HF.authorise(
                    this.user.roles, 
                    ['Super-admin','Admin']
                );

                this.canSeeAdminDropdown = this.HF.authorise(
                    this.user.roles,
                    ['Super-admin','Admin','Data Entry']
                );
            }
        },
        computed: {
            user() {
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            }
        },
        watch: {
            userLoadStatus: function(val) {
                if(val == 2) {
                    this.isAdmins = this.HF.authorise(
                        this.user.roles, 
                        ['Super-admin','Admin']
                    );

                    this.canSeeAdminDropdown = this.HF.authorise(
                        this.user.roles,
                        ['Super-admin','Admin','Data Entry']
                    );
                }
            }
        },
        methods: {
            updateActivePage(page) {
                this.resetActivePages();

                switch (page) {
                    case "home":
                        this.active_pages.home.is_active = true;
                        break;

                    case "findYourPU":
                        this.active_pages.findYourPU.is_active = true;
                        break;

                    case "dashboard":
                        this.active_pages.dashboard.is_active = true;
                        break;

                    case "candidates":
                        this.active_pages.candidates.is_active = true;
                        break;

                    case "updates":
                        this.active_pages.updates.is_active = true;
                        break;

                    case "incidents":
                        this.active_pages.incidents.is_active = true;
                        break;

                    case "results":
                        this.active_pages.results.is_active = true;
                        break;

                    case "pictures":
                        this.active_pages.pictures.is_active = true;
                        break;

                    case "elections":
                        this.active_pages.elections.is_active = true;
                        break;

                    case "administration":
                        this.active_pages.administration.is_active = true;
                        break;
                    
                    default:
                        break;
                }
            },
            resetActivePages() {
                this.active_pages = {
                    home: {
                        is_active: false
                    },
                    findYourPU: {
                        is_active: false
                    },
                    dashboard: {
                        is_active: false
                    },
                    candidates: {
                        is_active: false
                    },
                    updates: {
                        is_active: false
                    },
                    incidents: {
                        is_active: false
                    },
                    results: {
                        is_active: false
                    },
                    pictures: {
                        is_active: false
                    },
                    elections: {
                        is_active: false
                    },
                    administration: {
                        is_active: false
                    }
                }
            }
        }
    }
</script>

