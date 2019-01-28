<style scoped>

</style>
<template>
    <div>
        <div v-if="!$route.meta.isMap" id="election-title" class="col-md-8 mr-auto ml-auto text-center">
            <div class="alert alert-light" style="margin-top: 100px;">
                {{ election.title  }} <br>
                <small>
                    {{ $route.name }}
                </small>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            };
        },
        components: {
            
        },
        created() {

        },
        computed: {
            election() {
                return this.$store.getters.getElection;
            },
            electionLoadStatus() {
                return this.$store.getters.getElectionLoadStatus;
            }
        }
    }
</script>
