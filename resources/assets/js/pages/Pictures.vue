<style scoped>
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
    <div class="content">
        <div class="container-fPicid">
            <div class="row">
                <div v-for="(picture, index) in pictures" v-bind:key="index" class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">
                                {{ picture.title }}
                            </h4>
                            <p class="card-text">
                                {{ picture.description }}
                            </p>
                            <p class="card-text">
                                <small class="text-muted pull-left">
                                    {{ moment(picture.created_at, 'DD MMM YYYY H:m:s').format('lll') }}
                                </small>
                                <small v-if="moment(picture.updated_at, 'DD MMM YYYY H:m:s').isValid()" 
                                    class="text-muted pull-right">
                                    <i class="material-icons">flag</i> 
                                    <span class="updated_at">Edited</span>
                                </small>
                            </p>
                        </div>
                        <img class="card-img-top" :src="'/storage/'+picture.url" alt="Card image cap">
                    </div>
                </div>
            </div>
            <div id="action-btn">
                <button class="btn btn-success btn-fab btn-lg btn-round">
                    <i class="material-icons">add</i>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                moment: window.moment
            }
        },
        computed: {
            election() {
                return this.$store.getters.getElection;
            },
            electionLoadStatus() {
                return this.$store.getters.getElectionLoadStatus;
            },
            pictures() {
                return this.$store.getters.getPictures;
            },
            picturesLoadStatus() {
                return this.$store.getters.getPicturesLoadStatus;
            },
            picPagination() {
                return this.$store.getters.getPicPagination;
            }
        },
        created() {
            this.$store.dispatch('getPictures', {
                election_id: this.$route.params.id,
                url: null
            });
        },
        methods: {
            getPictures(url) {
                this.$store.dispatch('getPictures', {
                    id: this.$route.params.id,
                    url: url
                });
            }
        }
    }
</script>
