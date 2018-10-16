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
        <div class="container-fluid">
            <action-loader class="text-center" :loading='picturesLoadStatus == 1' 
                :color="'#4caf50'"></action-loader>

            <div class="row">
                <div v-for="(picture, index) in pictures" v-bind:key="index" class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            
                            <h4 class="card-title">
                                {{ picture.title }} <br>
                                <small>
                                    {{ picture.location_type + ": " + (picture.location.name || picture.location.code) }}
                                </small>
                            </h4>
                            <div v-html="picture.description" class="card-text"></div>
                            <div v-if="userLoadStatus == 2 && user != {}">
                                <router-link class="btn btn-sm btn-just-icon btn-warning" 
                                    :to="'/election/'+election.id+'/pictures/edit/'+picture.id">
                                    <i class="material-icons">create</i>
                                </router-link>
                                <button @click="deletePicture(picture.id)" class="btn btn-just-icon btn-sm btn-danger">
                                    <i class="material-icons">clear</i>
                                </button>
                            </div>
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
            <div v-if="userLoadStatus == 2 && user != {}" id="action-btn">
                <router-link class="btn btn-success btn-fab btn-lg btn-round" 
                    :to="'/election/'+election.id+'/pictures/add'">
                    <i class="material-icons">add</i>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import { HELPERS } from '../../helpers.js';
    import ActionLoader from 'vue-spinner/src/ScaleLoader.vue';

    export default {
        components: {
            ActionLoader
        },
        data() {
            return {
                moment: window.moment,
                HF: HELPERS
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
            user() {
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            },
            picPagination() {
                return this.$store.getters.getPicPagination;
            },
            deletePictureLoadStatus() {
                return this.$store.getters.getDeletePictureLoadStatus;
            },
            deletePictureResult() {
                return this.$store.getters.getDeletePictureResult;
            }
        },
        watch: {
            deletePictureLoadStatus: function() {
                let vm = this; 
                
                if(vm.deletePictureLoadStatus == 3 && vm.deletePictureResult.success == 0) {
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.deletePictureResult.message, 
                        'danger'
                    );
                } else if(vm.deletePictureLoadStatus == 2 && vm.deletePictureResult.success == 1) {
                    //reload updates
                    this.$store.dispatch('getPictures', {
                        election_id: this.$route.params.id,
                        url: null
                    });
                    vm.HF.showNotification(
                        'top', 
                        'center', 
                        vm.deletePictureResult.message, 
                        'success'
                    );
                } 
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
            },
            deletePicture(data) {
                if(confirm("are you sure?")){
                    this.$store.dispatch('deletePicture', {
                        id: data
                    });
                }
            }
        }
    }
</script>
