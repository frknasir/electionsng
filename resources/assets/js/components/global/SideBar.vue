<style>

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
                <li class="nav-item active">
                    <router-link class="nav-link" :to="'/election/'+$route.params.id">
                        <i class="material-icons">dashboard</i>
                        <p>Dashboard</p>
                    </router-link>
                </li>
                <li class="nav-item active">
                    <router-link class="nav-link" :to="'/election/'+$route.params.id+'/candidates'">
                        <i class="material-icons">
                            group
                        </i>
                        <p>Candidates</p>
                    </router-link>
                </li>
                <li class="nav-item active">
                    <router-link class="nav-link" :to="'/election/'+$route.params.id+'/liveUpdates'">
                        <i class="material-icons">
                            sync
                        </i>
                        <p>Live Updates</p>
                    </router-link>
                </li>
                <li class="nav-item active">
                    <router-link class="nav-link" :to="'/election/'+$route.params.id+'/incidents'">
                        <i class="material-icons">
                            event_note
                        </i>
                        <p>Incidents</p>
                    </router-link>
                </li>
                <li class="nav-item active">
                    <router-link class="nav-link" :to="'/election/'+$route.params.id+'/results'">
                        <i class="material-icons">
                            ballot
                        </i>
                        <p>Results</p>
                    </router-link>
                </li>
                <li class="nav-item active">
                    <router-link class="nav-link" :to="'/election/'+$route.params.id+'/pictures'">
                        <i class="material-icons">
                            image
                        </i>
                        <p>Pictures</p>
                    </router-link>
                </li>
                <li class="nav-item active">
                    <router-link class="nav-link" :to="'/election/'+$route.params.id+'/charts'">
                        <i class="material-icons">
                            bar_chart
                        </i>
                        <p>Charts</p>
                    </router-link>
                </li>
                <!-- <li class="nav-item active">
                    <a class="nav-link" data-toggle="collapse" href="#liveUpdatesCollapse">
                        <i class="material-icons">
                            sync
                        </i>
                        <p>
                            Live Updates
                            <b class="caret"></b>
                        </p>
                    </a>

                    <div class="collapse" id="liveUpdatesCollapse">
                        <ul class="nav">
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="'/election/'+$route.params.id">
                                    <span class="sidebar-mini"> RS </span>
                                    <span class="sidebar-normal"> RTL Support </span>
                                </router-link>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link" href="../../examples/pages/rtl.html">
                                <span class="sidebar-mini"> RS </span>
                                <span class="sidebar-normal"> RTL Support </span>
                                </a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link" href="../../examples/pages/timeline.html">
                                <span class="sidebar-mini"> T </span>
                                <span class="sidebar-normal"> Timeline </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>-->
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
    export default {
        data() {
            return {
                bg: bg,
            }
        }
    }
</script>

