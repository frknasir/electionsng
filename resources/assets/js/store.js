/*
|-------------------------------------------------------------------------------
| VUEX store.js
|-------------------------------------------------------------------------------
| Builds the data store from all of the modules for the Election app.
*/

/*
Adds the promise polyfill for IE 11
*/
require('es6-promise').polyfill();

/*
Imports Vue and Vuex
*/
import Vue from 'vue';
import Vuex from 'vuex';

/*
Initializes Vuex on Vue.
*/
Vue.use( Vuex );

/*
    Imports all of the modules used in the application to build the data store.
*/
import { candidate } from './modules/candidate.js';
import { election } from './modules/election.js';
import { electionType } from './modules/electionType.js';
import { incident } from './modules/incident.js';
import { incidentType } from './modules/incidentType.js';
import { liveUpdate } from './modules/liveUpdate.js';
import { picture } from './modules/picture.js';
import { localGovernment } from './modules/localGovernment.js';
import { politicalParty } from './modules/politicalParty.js';
import { pollingUnit } from './modules/pollingUnit.js';
import { registrationArea } from './modules/registrationArea.js';
import { result } from './modules/result.js';
import { role } from './modules/role.js';
import { state } from './modules/state.js';
import { user } from './modules/user.js';

/*
Exports our data store.
*/
export default new Vuex.Store({
    modules: {
        candidate,
        election,
        electionType,
        incident,
        incidentType,
        liveUpdate,
        picture,
        localGovernment,
        politicalParty,
        pollingUnit,
        registrationArea,
        result,
        role,
        state,
        user
    }
});