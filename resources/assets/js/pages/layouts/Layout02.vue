<style>

</style>

<template>
    <div id="app-layout" class="wrapper">
        <side-bar></side-bar>
        <div class="main-panel">
            <navigation></navigation>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import SideBar from '../../components/global/SideBar.vue';
    import Navigation from '../../components/global/Navigation02.vue';

    export default {
        components: {
            SideBar,
            Navigation,
        },
        created(){
            
        }
    }
</script>