<style scoped>
    #switch {
        position: relative;
        left: 20px;
        z-index: 3;
    }

    #switch .btn-group {
        position: fixed;
        bottom: 10%;
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
    <div id="app-layout" class="content pt-5 mt-3 pl-0 pr-0 pb-0">
        <div id="switch">
            <div class="btn-group">
                <button @click="toggleComponent('map')" type="button" 
                    class="btn btn-just-icon" :class="{'btn-success': map_active}">
                    <i class="material-icons">
                        location_on
                    </i>
                </button>
                <button @click="toggleComponent('timeline')" type="button" 
                    class="btn btn-just-icon" :class="{'btn-success': timeline_active}">
                    <i class="material-icons">
                        list_alt
                    </i>
                </button>
            </div>
        </div>
        <div v-if="userLoadStatus == 2 && user != {}" id="action-btn">
            <router-link class="btn btn-success btn-fab btn-lg btn-round" 
                :to="'/election/'+election.id+'/liveUpdates/add'">
                <i class="material-icons">add</i>
            </router-link>
        </div>
        <map-component v-if="active_component === 'map'"></map-component>
        <timeline v-else-if="active_component === 'timeline'"></timeline>
    </div>
</template>
<script>
    import MapComponent from './Map.vue';
    import Timeline from './Timeline.vue';

    export default {
        components: {
            MapComponent,
            Timeline,
        },
        data() {
            return {
                active_component: 'map',
                map_active: true,
                timeline_active: false,
            }
        }, 
        computed: {
            election() {
                return this.$store.getters.getElection;
            },
            user() {
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            }
        },
        watch: {

        },
        mounted() {

        },
        created() {
 
        },
        methods: {
            toggleComponent(component) {
                this.active_component = component;

                if(component === 'map') {
                    this.map_active = true;
                    this.timeline_active = false;
                } else if(component === 'timeline') {
                    this.map_active = false;
                    this.timeline_active = true;
                }
            }
        }
    }
</script>
