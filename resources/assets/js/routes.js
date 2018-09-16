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
                    component: Vue.component('Election', require('./pages/Elections.vue')),
                    children: [
                        {
                            path: '',
                            name: 'Elections',
                            component: Vue.component('BrowseElections', require('./components/elections/BrowseElections.vue'))
                        },
                        {
                            path: 'edit/:electionId',
                            name: 'Edit Election',
                            component: Vue.component('EditElection', require('./components/elections/EditElection.vue')),
                            beforeEnter: requireAuth,
							meta: {
								permitted: ['Super-admin', 'Admin']
                            }
                        },
                        {
                            path: 'add',
                            name: 'Add Election',
                            component: Vue.component('AddElection', require('./components/elections/AddElection.vue')),
                            beforeEnter: requireAuth,
							meta: {
								permitted: ['Super-admin', 'Admin']
                            }
                        }
                    ]
                },
                {
                    path: 'states',
                    component: Vue.component('BrowseStates', require('./pages/States.vue')),
                    children: [
                        {
                            path: '',
                            name: 'States',
                            component: Vue.component('BrowseStates', require('./components/states/BrowseStates.vue'))
                        }
                    ]
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
                    component: Vue.component('LiveUpdates', require('./pages/LiveUpdates.vue')),
                    children: [
                        {
                            path: '',
                            name: 'Browse Updates',
                            component: Vue.component('BrowseLiveUpdates', require('./components/liveUpdates/BrowseLiveUpdates.vue'))
                        },
                        {
                            path: 'edit/:liveUpdateId',
                            name: 'Edit Update',
                            component: Vue.component('EditLiveUpdate', require('./components/liveUpdates/EditLiveUpdate.vue')),
                            beforeEnter: requireAuth,
                            meta: {
                                permitted: ['Super-admin', 'Admin', 'Tracking Officer']
                            }
                        },
                        {
                            path: 'add',
                            name: 'Add Update',
                            component: Vue.component('AddLiveUpdate', require('./components/liveUpdates/AddLiveUpdate.vue')),
                            beforeEnter: requireAuth,
                            meta: {
                                permitted: ['Super-admin', 'Admin', 'Tracking Officer']
                            }
                        }
                    ]
                },
                {
                    path: 'incidents',
                    component: Vue.component('Incidents', require('./pages/Incidents.vue')),
                    children: [
                        {
                            path: '',
                            name: 'Browse Incidents',
                            component: Vue.component('BrowseIncidents', require('./components/incidents/BrowseIncidents.vue'))
                        },
                        {
                            path: 'edit/:incidentId',
                            name: 'Edit Incident',
                            component: Vue.component('EditIncident', require('./components/incidents/EditIncident.vue')),
                            beforeEnter: requireAuth,
                            meta: {
                                permitted: ['Super-admin', 'Admin', 'Tracking Officer']
                            }
                        },
                        {
                            path: 'add',
                            name: 'Add Incident',
                            component: Vue.component('AddIncident', require('./components/incidents/AddIncident.vue')),
                            beforeEnter: requireAuth,
                            meta: {
                                permitted: ['Super-admin', 'Admin', 'Tracking Officer']
                            }
                        }
                    ]
                },
                {
                    path: 'results',
                    name: 'Results',
                    component: Vue.component('Results', require('./pages/Results.vue'))
                },
                {
                    path: 'pictures',
                    component: Vue.component('Pictures', require('./pages/Pictures.vue')),
                    children: [
                        {
                            path: '',
                            name: 'Pictures',
                            component: Vue.component('BrowsePictures', require('./components/pictures/BrowsePictures.vue'))
                        },
                        {
                            path: 'edit/:pictureId',
                            name: 'Edit Picture',
                            component: Vue.component('EditPicture', require('./components/pictures/EditPicture.vue')),
                            beforeEnter: requireAuth,
                            meta: {
                                permitted: ['Super-admin', 'Admin', 'Tracking Officer']
                            }
                        },
                        {
                            path: 'add',
                            name: 'Add Picture',
                            component: Vue.component('AddPicture', require('./components/pictures/AddPicture.vue')),
                            beforeEnter: requireAuth,
                            meta: {
                                permitted: ['Super-admin', 'Admin', 'Tracking Officer']
                            }
                        }
                    ]
                }
            ]
        }
    ]
});