<style>

</style>

<template>
    <div id="app-layout" class="wrapper">
        <navigation></navigation>
        <router-view class="pt-5"></router-view>
        <footer-component></footer-component>
    </div>
</template>

<script>
    import Navigation from '../../components/global/Navigation01.vue';
    import FooterComponent from '../../components/global/Footer.vue';

    export default {
        components: {
            Navigation,
            FooterComponent
        },
        created(){
            
        }
    }
</script>