<style scoped>

</style>

<template>
    <div class="content">
        <div class="container">

            <div class="card card-blog">
                <div class="card-header card-header-image">
                    <iframe width="100%" height="480" src="https://www.youtube.com/embed/tQMKGcvMQME?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                </div>
                <div class="card-body text-center">
                    <h6 class="card-category text-info">Tutorial</h6>
                    <p class="card-description">
                        How it Works
                    </p>
                </div>
            </div><br><br>

            <!-- Browse Election Component -->
            <browse-elections></browse-elections>
        </div>
    </div>
</template>

<script>
    import bg from '../../../../public/img/product2.jpg';
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


