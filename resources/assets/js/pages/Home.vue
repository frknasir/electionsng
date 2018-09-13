<style scoped>

</style>

<template>
    <div class="content">
        <div class="container">


            <div class="jumbotron p-3 p-md-5 text-white rounded bg-dark">
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


            <div class="row mb-2">
                <div class="col-md-6">
                    <div class="card flex-md-row mb-4 shadow-sm h-md-250">
                        <div class="card-body d-flex flex-column align-items-start">
                            <p class="card-text my-auto">
                                This is a wider card with 
                                supporting text below as a 
                                natural lead-in to additional 
                                content.
                            </p>
                        </div>
                        <img class="card-img-right flex-auto d-lg-block" 
                            :src="'/images/dev_cartoon.jpg'" 
                            alt="Card image cap">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card flex-md-row mb-4 shadow-sm h-md-250">
                        <div class="card-body d-flex flex-column align-items-start">
                            <p class="card-text my-auto">
                                This is a wider card with 
                                supporting text below as a 
                                natural lead-in to additional 
                                content.
                            </p>
                        </div>
                        <img class="card-img-right flex-auto d-lg-block" 
                            :src="'/images/statistic.png'" 
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


