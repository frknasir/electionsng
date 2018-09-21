<style scoped>

</style>

<template>
    <div class="content">
        <div class="container">


            <div class="jumbotron mb-5 p-3 p-md-5 text-white rounded bg-success">
                <div class="row">
                    <div class="col-md-6 px-0">
                        <h1 class="display-4">
                            Title of a longer featured blog post
                        </h1>
                        <p class="lead my-3">
                            Multiple lines of text that 
                            form the lede, informing new 
                            readers quickly and efficiently 
                            about what's most interesting 
                            in this post's contents.
                        </p>
                    </div>
                    <div class="col-md-6">
                        <img class="card-img-right img-fluid flex-auto d-lg-block" 
                            :src="'/images/avatars.jpg'" 
                            alt="Card image cap">
                    </div>
                </div>
                
            </div>

            <!-- Browse Election Component -->
            <browse-elections></browse-elections>
        </div>
    </div>
</template>

<script>
    import bg from '../../../../template/material-dashboard-html-v2.1.0/assets/img/cover.jpg';
    import BrowseElections from '../components/elections/BrowseElections.vue';
    
    export default {
        components: {
            BrowseElections
        },
        data() {
            return {
                bg: bg
            }
        }
    }
</script>


