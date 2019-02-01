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
            component: Vue.component( 'Layout', require('./pages/layouts/Layout.vue')),
            children: [
                {
                    path: '',
                    name: 'Home',
                    component: Vue.component('Home', require('./pages/Home.vue'))
                },
                {
                    path: 'elections',
                    component: Vue.component('Election', require('./pages/Elections.vue')),
                    children: [
                        {
                            path: '',
                            name: 'Elections',
                            component: Vue.component('BrowseElections', 
                            require('./components/elections/BrowseElections.vue')),
                            meta: {
                                permittedToMakeChanges: ['Super-admin', 'Admin']
                            }
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
                    component: Vue.component('States', require('./pages/States.vue')),
                    children: [
                        {
                            path: '',
                            name: 'States',
                            component: Vue.component('BrowseStates', 
                            require('./components/states/BrowseStates.vue')),
                            meta: {
                                permittedToMakeChanges: ['Super-admin', 'Admin']
                            }
                        },
                        {
                            path: 'edit/:stateId',
                            name: 'Edit State',
                            component: Vue.component('EditState', require('./components/states/EditState.vue')),
                            beforeEnter: requireAuth,
							meta: {
								permitted: ['Super-admin', 'Admin']
                            }
                        }
                    ]
                },
                {
                    path: 'localGovernments/:stateId',
                    component: Vue.component('LocalGovernments', require('./pages/LocalGovernments.vue')),
                    children: [
                        {
                            path: '',
                            name: 'Local Governments',
                            component: Vue.component(
                                'BrowseLocalGovernments', 
                                require('./components/localGovernments/BrowseLocalGovernments.vue')
                            ),
                            meta: {
                                permittedToMakeChanges: ['Super-admin', 'Admin']
                            }
                        },
                        {
                            path: 'edit/:localGovernmentId',
                            name: 'Edit LG',
                            component: Vue.component(
                                'EditLocalGovernment', 
                                require('./components/localGovernments/EditLocalGovernment.vue')
                            ),
                            beforeEnter: requireAuth,
							meta: {
								permitted: ['Super-admin', 'Admin']
                            }
                        }
                    ]
                },
                {
                    path: 'registrationAreas/:localGovernmentId',
                    component: Vue.component('RegistrationAreas', require('./pages/RegistrationAreas.vue')),
                    children: [
                        {
                            path: '',
                            name: 'Registration Areas',
                            component: Vue.component(
                                'BrowseRegistrationAreas', 
                                require('./components/registrationAreas/BrowseRegistrationAreas.vue')
                            ),
                            meta: {
                                permittedToMakeChanges: ['Super-admin', 'Admin', 'Data Entry']
                            }
                        },
                        {
                            path: 'edit/:registrationAreaId',
                            name: 'Edit RA',
                            component: Vue.component(
                                'EditRegistrationArea', 
                                require('./components/registrationAreas/EditRegistrationArea.vue')
                            ),
                            beforeEnter: requireAuth,
							meta: {
								permitted: ['Super-admin', 'Admin', 'Data Entry']
                            }
                        },
                        {
                            path: 'add',
                            name: 'Add RA',
                            component: Vue.component(
                                'AddRegistrationArea', 
                                require('./components/registrationAreas/AddRegistrationArea.vue')
                            ),
                            beforeEnter: requireAuth,
							meta: {
								permitted: ['Super-admin', 'Admin', 'Data Entry']
                            }
                        }
                    ]
                },
                {
                    path: 'pollingUnits/:registrationId',
                    component: Vue.component('PollingUnits', require('./pages/PollingUnits.vue')),
                    children: [
                        {
                            path: '',
                            name: 'Polling Units',
                            component: Vue.component(
                                'BrowsePollingUnits',
                                require('./components/pollingUnits/BrowsePollingUnits.vue')
                            ),
                            meta: {
                                permittedToMakeChanges: ['Super-admin', 'Admin', 'Data Entry']
                            }
                        },
                        {
                            path: 'edit/:pollingUnitId',
                            name: 'Edit PU',
                            component: Vue.component(
                                'EditPollingUnit', 
                                require('./components/pollingUnits/EditPollingUnit.vue')
                            ),
                            beforeEnter: requireAuth,
							meta: {
								permitted: ['Super-admin', 'Admin', 'Data Entry']
                            }
                        },
                        {
                            path: 'add',
                            name: 'Add PU',
                            component: Vue.component(
                                'AddPollingUnit', 
                                require('./components/pollingUnits/AddPollingUnit.vue')
                            ),
                            beforeEnter: requireAuth,
							meta: {
								permitted: ['Super-admin', 'Admin', 'Data Entry']
                            }
                        }
                    ]
                },
                {
                    path: 'politicalParties',
                    component: Vue.component('PoliticalParties', require('./pages/PoliticalParties.vue')),
                    children: [
                        {
                            path: '',
                            name: 'Parties',
                            component: Vue.component(
                                'BrowsePoliticalParties',
                                require('./components/politicalParties/BrowsePoliticalParties.vue')
                            ),
                            meta: {
                                permittedToMakeChanges: ['Super-admin', 'Admin', 'Data Entry']
                            }
                        },
                        {
                            path: 'edit/:politicalPartyId',
                            name: 'Edit Party',
                            component: Vue.component(
                                'EditPoliticalParty', 
                                require('./components/politicalParties/EditPoliticalParty.vue')
                            ),
                            beforeEnter: requireAuth,
							meta: {
								permitted: ['Super-admin', 'Admin', 'Data Entry']
                            }
                        },
                        {
                            path: 'add',
                            name: 'Add Party',
                            component: Vue.component(
                                'AddPoliticalPart', 
                                require('./components/politicalParties/AddPoliticalParty.vue')
                            ),
                            beforeEnter: requireAuth,
							meta: {
								permitted: ['Super-admin', 'Admin', 'Data Entry']
                            }
                        }
                    ]
                },
                {
                    path: 'incidentTypes',
                    component: Vue.component('IncidentTypes', require('./pages/IncidentTypes.vue')),
                    children: [
                        {
                            path: '',
                            name: 'Incident Types',
                            component: Vue.component(
                                'BrowseIncidentTypes',
                                require('./components/incidentTypes/BrowseIncidentTypes.vue')
                            ),
                            meta: {
                                permittedToMakeChanges: ['Super-admin', 'Admin']
                            }
                        },
                        {
                            path: 'edit/:incidentTypeId',
                            name: 'Edit Incident Type',
                            component: Vue.component(
                                'EditIncidentType', 
                                require('./components/incidentTypes/EditIncidentType.vue')
                            ),
                            beforeEnter: requireAuth,
							meta: {
								permitted: ['Super-admin', 'Admin']
                            }
                        },
                        {
                            path: 'add',
                            name: 'Add Incident Type',
                            component: Vue.component(
                                'AddIncidentType', 
                                require('./components/incidentTypes/AddIncidentType.vue')
                            ),
                            beforeEnter: requireAuth,
							meta: {
								permitted: ['Super-admin', 'Admin']
                            }
                        }
                    ]
                },
                { 
                    path: 'users',
                    component: Vue.component('Users', require('./pages/Users.vue')),
                    children: [
                        {
                            path: '',
                            name: 'Users',
                            component: Vue.component(
                                'BrowseUsers',
                                require('./components/users/BrowseUsers.vue')
                            ),
                            beforeEnter: requireAuth,
							meta: {
                                permitted: ['Super-admin'],
                                permittedToMakeChanges: ['Super-admin']
                            }
                        },
                        {
                            path: 'edit/:userId',
                            name: 'Edit User',
                            component: Vue.component(
                                'EditUser', 
                                require('./components/users/EditUser.vue')
                            ),
                            beforeEnter: requireAuth,
							meta: {
								permitted: ['Super-admin']
                            }
                        },
                        {
                            path: 'add',
                            name: 'Add User',
                            component: Vue.component(
                                'AddUser', 
                                require('./components/users/AddUser.vue')
                            ),
                            beforeEnter: requireAuth,
							meta: {
								permitted: ['Super-admin']
                            }
                        }
                    ]
                },
                {
                    path: '/election/:id',
                    component: Vue.component( 'Layout', require( './pages/Election.vue' ) ),
                    children: [
                        {
                            path: '',
                            name: 'Election Dashboard',
                            component: Vue.component( 'Dashboard', require( './pages/Dashboard.vue' ) ),
                            beforeEnter: function(to, from, next) {
                                if(to.params.id !== "undefined") {
                                    next();
                                }
                            },
                            meta: {
                                isElectionPage: true
                            }
                        },
                        {
                            path: 'candidates',
                            component: Vue.component('Candidates', require('./pages/Candidates.vue')),
                            beforeEnter: function(to, from, next) {
                                if(to.params.id !== "undefined") {
                                    next();
                                }
                            },
                            children: [
                                {
                                    path: '',
                                    name: 'Browse Candidates',
                                    component: Vue.component('BrowseCandidates', require('./components/candidates/BrowseCandidates.vue')),
                                    meta: {
                                        isElectionPage: true,
                                        permittedToMakeChanges: ['Super-admin', 'Admin', 'Data Entry']
                                    },
                                },
                                {
                                    path: 'view/:candidateId',
                                    name: 'View Candidate',
                                    component: Vue.component('ViewCandidate', require('./components/candidates/ViewCandidate.vue')),
                                    meta: {
                                        isElectionPage: true
                                    },
                                },
                                {
                                    path: 'edit/:candidateId',
                                    name: 'Edit Candidate',
                                    component: Vue.component('EditCandidate', require('./components/candidates/EditCandidate.vue')),
                                    beforeEnter: requireAuth,
                                    meta: {
                                        permitted: ['Super-admin', 'Admin', 'Data Entry'],
                                        isElectionPage: true
                                    }
                                },
                                {
                                    path: 'add',
                                    name: 'Add Candidate',
                                    component: Vue.component('AddCandidate', require('./components/candidates/AddCandidate.vue')),
                                    beforeEnter: requireAuth,
                                    meta: {
                                        permitted: ['Super-admin', 'Admin', 'Data Entry'],
                                        isElectionPage: true
                                    }
                                }
                            ]
                        },
                        {
                            path: 'liveUpdates',
                            component: Vue.component('LiveUpdates', require('./pages/LiveUpdates.vue')),
                            beforeEnter: function(to, from, next) {
                                if(to.params.id !== "undefined") {
                                    next();
                                }
                            },
                            children: [
                                {
                                    path: '',
                                    name: 'Browse Updates',
                                    component: Vue.component('BrowseLiveUpdates', require('./components/liveUpdates/BrowseLiveUpdates.vue')),
                                    meta: {
                                        isElectionPage: true,
                                        isMap: true,
                                        permittedToMakeChanges: ['Super-admin', 'Admin', 'Tracking Officer']
                                    }
                                },
                                {
                                    path: 'edit/:liveUpdateId',
                                    name: 'Edit Update',
                                    component: Vue.component('EditLiveUpdate', require('./components/liveUpdates/EditLiveUpdate.vue')),
                                    beforeEnter: requireAuth,
                                    meta: {
                                        permitted: ['Super-admin', 'Admin', 'Tracking Officer'],
                                        isElectionPage: true
                                    }
                                },
                                {
                                    path: 'add',
                                    name: 'Add Update',
                                    component: Vue.component('AddLiveUpdate', require('./components/liveUpdates/AddLiveUpdate.vue')),
                                    beforeEnter: requireAuth,
                                    meta: {
                                        permitted: ['Super-admin', 'Admin', 'Tracking Officer'],
                                        isElectionPage: true
                                    }
                                }
                            ]
                        },
                        {
                            path: 'incidents',
                            component: Vue.component('Incidents', require('./pages/Incidents.vue')),
                            beforeEnter: function(to, from, next) {
                                if(to.params.id !== "undefined") {
                                    next();
                                }
                            },
                            children: [
                                {
                                    path: '',
                                    name: 'Browse Incidents',
                                    component: Vue.component('BrowseIncidents', require('./components/incidents/BrowseIncidents.vue')),
                                    meta: {
                                        isElectionPage: true,
                                        isMap: true,
                                        permittedToMakeChanges: ['Super-admin', 'Admin', 'Tracking Officer']
                                    }
                                },
                                {
                                    path: 'edit/:incidentId',
                                    name: 'Edit Incident',
                                    component: Vue.component('EditIncident', require('./components/incidents/EditIncident.vue')),
                                    beforeEnter: requireAuth,
                                    meta: {
                                        permitted: ['Super-admin', 'Admin', 'Tracking Officer'],
                                        isElectionPage: true
                                    }
                                },
                                {
                                    path: 'add',
                                    name: 'Add Incident',
                                    component: Vue.component('AddIncident', require('./components/incidents/AddIncident.vue')),
                                    beforeEnter: requireAuth,
                                    meta: {
                                        permitted: ['Super-admin', 'Admin', 'Tracking Officer'],
                                        isElectionPage: true
                                    }
                                }
                            ]
                        },
                        {
                            path: 'results',
                            name: 'Results',
                            component: Vue.component('Results', require('./pages/Results.vue')),
                            beforeEnter: function(to, from, next) {
                                if(to.params.id !== "undefined") {
                                    next();
                                }
                            },
                            meta: {
                                isElectionPage: true,
                                permittedToMakeChanges: ['Super-admin', 'Admin', 'Tracking Officer', 'Data Entry']
                            }
                        },
                        {
                            path: 'pictures',
                            component: Vue.component('Pictures', require('./pages/Pictures.vue')),
                            beforeEnter: function(to, from, next) {
                                if(to.params.id !== "undefined") {
                                    next();
                                }
                            },
                            children: [
                                {
                                    path: '',
                                    name: 'Polls in Pictures',
                                    component: Vue.component('BrowsePictures', require('./components/pictures/BrowsePictures.vue')),
                                    meta: {
                                        isElectionPage: true,
                                        permittedToMakeChanges: ['Super-admin', 'Admin', 'Tracking Officer']
                                    }
                                },
                                {
                                    path: 'edit/:pictureId',
                                    name: 'Edit Picture',
                                    component: Vue.component('EditPicture', require('./components/pictures/EditPicture.vue')),
                                    beforeEnter: requireAuth,
                                    meta: {
                                        permitted: ['Super-admin', 'Admin', 'Tracking Officer'],
                                        isElectionPage: true
                                    }
                                },
                                {
                                    path: 'add',
                                    name: 'Add Picture',
                                    component: Vue.component('AddPicture', require('./components/pictures/AddPicture.vue')),
                                    beforeEnter: requireAuth,
                                    meta: {
                                        permitted: ['Super-admin', 'Admin', 'Tracking Officer'],
                                        isElectionPage: true
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    path: '/find-your-pu',
                    name: 'Find Your PU',
                    component: Vue.component( 'FindYourPU', require( './pages/FindYourPU.vue' ) )
                }
            ]
        }
    ]
});