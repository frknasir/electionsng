/*
|-------------------------------------------------------------------------------
| routes.js
|-------------------------------------------------------------------------------
| Contains all of the routes for the application
*/

/*
    Imports Vue and VueRouter to extend with the routes.
*/
import Vue from 'vue';
import VueRouter from 'vue-router';

/*
    Extends Vue to use Vue Router
*/
Vue.use( VueRouter );

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Vue.component( 'Layout', require('./pages/layouts/Layout01.vue')),
            children: [
                {
                    path: '',
                    name: 'landing',
                    component: Vue.component('Home', require('./pages/Home.vue'))
                },
                {
                    path: 'elections',
                    name: 'elections',
                    component: Vue.component('Election', require('./pages/Elections.vue'))
                }
            ]
        },
        {
            path: '/election/:id',
            component: Vue.component( 'Layout', require( './pages/layouts/Layout02.vue' ) ),
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: Vue.component( 'Dashboard', require( './pages/Dashboard.vue' ) )
                },
                {
                    path: 'candidates',
                    name: 'candidates',
                    component: Vue.component('Candidates', require('./pages/Candidates.vue'))
                },
                {
                    path: 'liveUpdates',
                    name: 'liveUpdates',
                    component: Vue.component('LiveUpdates', require('./pages/LiveUpdates.vue'))
                },
                {
                    path: 'incidents',
                    name: 'incidents',
                    component: Vue.component('Incidents', require('./pages/Incidents.vue'))
                },
                {
                    path: 'results',
                    name: 'results',
                    component: Vue.component('Results', require('./pages/Results.vue'))
                },
                {
                    path: 'pictures',
                    name: 'pictures',
                    component: Vue.component('Pictures', require('./pages/Pictures.vue'))
                },
                {
                    path: 'charts',
                    name: 'charts',
                    component: Vue.component('Charts', require('./pages/Charts.vue'))
                }
            ]
        }
    ]
});