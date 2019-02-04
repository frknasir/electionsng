<style scoped>

</style>

<template>
    <div class="content">
        <div class="container">

            <!-- render general metrics -->
            <general-metrics></general-metrics>

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

            <!-- render map metrics -->
            <map-component></map-component>

        </div>
    </div>
</template>

<script>
    import bg from '../../../../public/img/product2.jpg';
    import GeneralMetrics from '../components/home/GeneralMetrics.vue';
    import MapComponent from '../components/home/Map.vue';
    
    export default {
        components: {
            GeneralMetrics,
            MapComponent
        },
        data() {
            return {
                bg: bg
            }
        }
    }
</script>


