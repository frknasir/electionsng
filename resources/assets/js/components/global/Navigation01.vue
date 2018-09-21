<style>
 
</style>
<template>
    <nav class="navbar navbar-expand-lg navbar-light" >
        <div class="container">
            <router-link class="btn btn-link"
                v-if="$routerHistory.hasPrevious()"
                :to="{ path: $routerHistory.previous().path }">
                <i class="material-icons">arrow_back</i>
            </router-link>
            <div class="navbar-wrapper">
                <router-link class="navbar-brand" to="/">
                    Electionsng.com
                </router-link>
            </div>

            <button class="navbar-toggler" type="button" 
                data-toggle="collapse" data-target="#navbarnav" aria-controls="navbarnav" 
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="sr-only">Toggle navigation</span>
                <span class="navbar-toggler-icon icon-bar"></span>
                <span class="navbar-toggler-icon icon-bar"></span>
                <span class="navbar-toggler-icon icon-bar"></span>
            </button>

            <div id="navbarnav" class="collapse navbar-collapse justify-content-end">
                <!-- Left Side Of Navbar -->
                <ul class="navbar-nav mr-auto">
                    
                </ul>

                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to='/elections'>
                            Elections
                        </router-link>
                    </li>

                    <li class="nav-item dropdown">
                        <a id="electoralAreas" 
                            class="nav-link dropdown-toggle" href="#" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" aria-expanded="false">
                            Electoral Areas <span class="caret"></span>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="electoralAreas">
                            <router-link class="dropdown-item" to="/states">
                                States
                            </router-link>
                            <!--<router-link class="dropdown-item" to="/localGovernments">
                                Local Governments
                            </router-link>
                            <router-link class="dropdown-item" to="/registrationAreas">
                                Registration Areas
                            </router-link>
                            <router-link class="dropdown-item" to="/pollingUnits">
                                Polling Units
                            </router-link>-->
                        </div>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-link" to='/politicalParties'>
                            Political Parties
                        </router-link>
                    </li>

                    <!-- Authentication Links -->
                    <li v-if="userLoadStatus == 2 && user != {}" class="nav-item dropdown">
                        <a id="navbarDropdown" 
                            class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ user.name }} <span class="caret"></span>
                        </a>

                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" :href="config.URL+'/logout'" 
                                onclick="event.preventDefault();
                                document.getElementById('logout-form').submit();">
                                Logout
                            </a>
                            <form id="logout-form" :action="config.URL+'/logout'" 
                                method="POST" style="display: none;">
                                <input type="hidden" name="_token" id="csrf-token" :value="csrf_token" />
                            </form>
                        </div>
                    </li>
                    <li v-else class="nav-item">
                        <a class="nav-link" :href="config.URL+'/login'">
                            Login
                        </a>
                    </li>
                </ul> 
            </div>
        </div>
    </nav>
</template>
<script>
    import { CONFIG } from '../../config.js';

    export default {
        data() {
            return {
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
