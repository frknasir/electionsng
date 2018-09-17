<style scoped>

</style>
<template>
    <div class="content">
        <div class="container">
            <div class="card">
                <div class="card-header card-header-text card-header-success">
                    <div class="card-text">
                        <h4 class="card-title">
                            {{ lg }} <br />
                            <small>
                                Registration Areas
                            </small>
                        </h4>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div v-for="registrationArea in registrationAreas" v-bind:key="registrationArea.id" class="col-md-4">
                            <div class="card">
                                <div class="card-header card-header-success">
                                    <h4 class="card-title">{{ registrationArea.name }}</h4>
                                    <p class="category">
                                        Lat: <span class="badge badge-pill badge-info">{{ registrationArea.latitude }}</span> 
                                        Lng: <span class="badge badge-pill badge-info">{{ registrationArea.longitude }}</span>
                                    </p>
                                </div>
                                <div class="card-body">
                                    <table class="table table-borderless">
                                        <td>
                                            <router-link :to="'/pollingUnits/'+registrationArea.id">
                                                Polling Units
                                            </router-link>
                                        </td>
                                        <td>{{ registrationArea.pu_count }}</td>
                                    </table>
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
                lg: ''
            }
        },
        computed: {
            registrationAreas() {
                return this.$store.getters.getRegistrationAreas;
            },
            registrationAreasLoadStatus() {
                return this.$store.getters.getRegistrationAreasLoadStatus;
            }
        },
        created() {
            this.$store.dispatch(
                'getRegistrationAreas',
                {
                    id: this.$route.params.localGovernmentId
                }
            );
        },
        mounted() {

        },
        watch: {
            registrationAreasLoadStatus: function(val) {
                if(val == 2) {
                    this.lg = this.registrationAreas[0].local_government_name;
                }
            }
        }
    }
</script>
