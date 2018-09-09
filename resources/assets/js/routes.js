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
import { routerHistory } from 'vue-router-back-button';

import store from './store.js';

/*
    Extends Vue to use Vue Router
*/
Vue.use( VueRouter );
Vue.use(routerHistory);

/*
	This will cehck to see if the user is authenticated or not.
*/
function requireAuth (to, from, next) {
	/*
		Determines where we should send the user.
	*/
	function proceed () {
		/*
			If the user has been loaded determine where we should
			send the user.
		*/
        if ( store.getters.getUserLoadStatus == 2 ) { 
            /*
                If the user is not empty, that means there's a user
                authenticated we allow them to continue. Otherwise, we
                send the user back to the home page.
            */
            if( store.getters.getUser != '' ) {
                let roles = store.getters.getUser.roles;
                let permitted = to.meta.permitted;
                let flag = false;

                roles.forEach(role => {
                    if(permitted.includes(role)) {
                        flag = true;
                    }
                });

                switch( flag ){
                    /*
                        If flag is true, then we continue.
                    */
                    case true:
                        next();
                        break;
                    /*
                        If flag is false, then we continue.
                    */
                    case false:
                        console.log(flag);
                        break;
                    default:
                        break;
                }
            } else {
                //user needs to login first
            }
        } else if(store.getters.getUserLoadStatus == 3) {
            //user is not logged in
        }
    }
    
    proceed();
}

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
                    name: 'Dashboard',
                    component: Vue.component( 'Dashboard', require( './pages/Dashboard.vue' ) )
                },
                {
                    path: 'candidates',
                    component: Vue.component('Candidates', require('./pages/Candidates.vue')),
                    children: [
                        {
                            path: '',
                            name: 'Browse Candidates',
                            component: Vue.component('BrowseCandidates', require('./components/candidates/BrowseCandidates.vue'))
                        },
                        {
                            path: 'view/:candidateId',
                            name: 'View Candidate',
                            component: Vue.component('ViewCandidate', require('./components/candidates/ViewCandidate.vue'))
                        },
                        {
                            path: 'edit/:candidateId',
                            name: 'Edit Candidate',
                            component: Vue.component('EditCandidate', require('./components/candidates/EditCandidate.vue')),
                            beforeEnter: requireAuth,
							meta: {
								permitted: ['Super-admin', 'Admin']
                            }
                        },
                        {
                            path: 'add',
                            name: 'Add Candidate',
                            component: Vue.component('AddCandidate', require('./components/candidates/AddCandidate.vue')),
                            beforeEnter: requireAuth,
							meta: {
								permitted: ['Super-admin', 'Admin']
                            }
                        }
                    ]
                },
                {
                    path: 'liveUpdates',
                    name: 'Live Updates',
                    component: Vue.component('LiveUpdates', require('./pages/LiveUpdates.vue'))
                },
                {
                    path: 'incidents',
                    name: 'Incidents',
                    component: Vue.component('Incidents', require('./pages/Incidents.vue'))
                },
                {
                    path: 'results',
                    name: 'Results',
                    component: Vue.component('Results', require('./pages/Results.vue'))
                },
                {
                    path: 'pictures',
                    name: 'Pictures',
                    component: Vue.component('Pictures', require('./pages/Pictures.vue'))
                },
                {
                    path: 'charts',
                    name: 'Charts',
                    component: Vue.component('Charts', require('./pages/Charts.vue'))
                }
            ]
        }
    ]
});