<style scoped>

</style>

<template>
    <div class="sidebar" data-color="green" data-background-color="white" :data-image="bg">
        <!--
            Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

            Tip 2: you can also add an image using data-image tag
        -->
        <div class="logo">
            <router-link class="simple-text logo-normal" to="/">
                ElectionsNG
            </router-link>
        </div>
        <div class="sidebar-wrapper">
            <ul class="nav">
                <li v-if="userLoadStatus == 2 && user != {}" class="nav-item">
                    <a class="nav-link" data-toggle="collapse" href="#userCollapse">
                        <i class="material-icons">
                            settings
                        </i>
                        <p>
                            {{ user.name }}
                            <b class="caret"></b>
                        </p>
                    </a>

                    <div class="collapse" id="userCollapse">
                        <ul class="nav">
                            <li class="nav-item ">
                                <a class="dropdown-item" :href="config.URL+'/logout'" 
                                    onclick="event.preventDefault();
                                    document.getElementById('logout-form').submit();">
                                    <span class="sidebar-mini"> L </span>
                                    <span class="sidebar-normal"> Logout </span>
                                </a>
                                <form id="logout-form" :action="config.URL+'/logout'" 
                                    method="POST" style="display: none;">
                                    <input type="hidden" name="_token" id="csrf-token" :value="csrf_token" />
                                </form>
                            </li>
                        </ul>
                    </div>
                </li>
                <li v-else class="nav-item">
                    <a class="nav-link" :href="config.URL+'/login'">
                        <i class="material-icons">person</i>
                        <p>Login</p>
                    </a>
                </li>
                <li class="nav-item active">
                    <router-link class="nav-link" :to="'/election/'+$route.params.id">
                        <i class="material-icons">dashboard</i>
                        <p>Dashboard</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="'/election/'+$route.params.id+'/candidates'">
                        <i class="material-icons">
                            group
                        </i>
                        <p>Candidates</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="'/election/'+$route.params.id+'/liveUpdates'">
                        <i class="material-icons">
                            sync
                        </i>
                        <p>Live Updates</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="'/election/'+$route.params.id+'/incidents'">
                        <i class="material-icons">
                            event_note
                        </i>
                        <p>Incidents</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="'/election/'+$route.params.id+'/results'">
                        <i class="material-icons">
                            ballot
                        </i>
                        <p>Results</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="'/election/'+$route.params.id+'/pictures'">
                        <i class="material-icons">
                            image
                        </i>
                        <p>Pictures</p>
                    </router-link>
                </li>
            <!-- your sidebar here -->
            </ul>
            <hr>
            <div class="copyright p-3">
                &copy; 2018,
                <a href="https://starfolk.tech" target="_blank">Starfolk,LLC</a> for a better nation.
            </div>
        </div>
    </div>
</template>

<script>
    import bg from '../../../../../template/material-dashboard-html-v2.1.0/assets/img/sidebar-1.jpg';
    import { CONFIG } from '../../config.js';

    export default {
        data() {
            return {
                bg: bg,
                active: this.$route.name,
                config: CONFIG,
                csrf_token: $('meta[name="csrf-token"]').attr('content')
            } 
        },
        created() {
            this.$store.dispatch('getAuthUser');
        },
        computed: {
            user() {
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            }
        }
    }
</script>

