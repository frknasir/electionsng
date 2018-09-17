<style scoped>

</style>
<template>
    <div class="content">
        <div class="container">
            <div class="card">
                <div class="card-header card-header-text card-header-success">
                    <div class="card-text">
                        <h4 class="card-title">
                            {{ ra }} <br />
                            <small>
                                Polling Units
                            </small>
                        </h4>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div v-for="pollingUnit in pollingUnits" v-bind:key="pollingUnit.id" class="col-md-4">
                            <div class="card">
                                <div class="card-header card-header-success">
                                    <h4 class="card-title">{{ pollingUnit.code }}</h4>
                                    <p class="category">
                                        Lat: <span class="badge badge-pill badge-info">{{ pollingUnit.latitude }}</span> 
                                        Lng: <span class="badge badge-pill badge-info">{{ pollingUnit.longitude }}</span>
                                    </p>
                                </div>
                                <div class="card-body">
                                    <p>
                                        {{ pollingUnit.description }}
                                    </p>
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
                ra: ''
            }
        },
        computed: {
            pollingUnits() {
                return this.$store.getters.getPollingUnits;
            },
            pollingUnitsLoadStatus() {
                return this.$store.getters.getPollingUnitsLoadStatus;
            }
        },
        created() {
            this.$store.dispatch(
                'getPollingUnits',
                {
                    id: this.$route.params.registrationId
                }
            );
        },
        mounted() {

        },
        watch: {
            pollingUnitsLoadStatus: function(val) {
                if(val == 2) {
                    this.ra = this.pollingUnits[0].registration_area_name;
                }
            }
        }
    }
</script>
