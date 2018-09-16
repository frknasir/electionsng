<style scoped>

</style>
<template>
    <div class="content">
        <div class="container">
            <div class="card">
                <div class="card-header card-header-text card-header-success">
                    <div class="card-text">
                        <h4 class="card-title">States</h4>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div v-for="state in states" v-bind:key="state.id" class="col-md-4">
                            <div class="card">
                                <div class="card-header card-header-success">
                                    <h4 class="card-title">{{ state.name }}</h4>
                                    <p class="category">
                                        Lat: <span class="badge badge-pill badge-info">{{ state.latitude }}</span> 
                                        Lng: <span class="badge badge-pill badge-info">{{ state.longitude }}</span>
                                    </p>
                                </div>
                                <div class="card-body">
                                    <table class="table table-borderless">
                                        <tr>
                                            <td>Local Governments </td>
                                            <td>{{ state.lg_count }}</td>
                                        </tr>
                                        <tr>
                                            <td>Registration Areas </td>
                                            <td>{{ state.ra_count }}</td>
                                        </tr>
                                        <tr>
                                            <td>Polling Units </td>
                                            <td>{{ state.pu_count }}</td>
                                        </tr>
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

            }
        },
        computed: {
            states() {
                return this.$store.getters.getStates;
            },
            statesLoadStatus() {
                return this.$store.getters.getStatesLoadStatus;
            }
        },
        created() {
            this.$store.dispatch('getStates');
        },
        mounted() {

        }
    }
</script>
