/*
|-------------------------------------------------------------------------------
| VUEX modules/incidentType.js
|-------------------------------------------------------------------------------
| The Vuex data store for the incidentType
*/

import IncidentTypeAPI from '../api/incidentType.js';
import { CONFIG } from '../config.js';

export const incidentType = { 
    state: {
        incidentTypes: [],
        incidentTypesLoadStatus: CONFIG.STATUSES.idle,
    },
    actions: {
        getIncidentTypes({commit}) {
            commit('setIncidentTypesLoadStatus', CONFIG.STATUSES.loading);

            IncidentTypeAPI.getIncidentTypes()
                .then(function(response) {
                    commit('setIncidentTypesLoadStatus', CONFIG.STATUSES.completed_with_success);
                    commit('setIncidentTypes', response.data);
                })
                .catch(function() {
                    commit('setIncidentTypesLoadStatus', CONFIG.STATUSES.completed_with_failure);
                    commit('setIncidentTypes', []);
                });
        }
    },
    mutations: {
        setIncidentTypesLoadStatus(state, status) {
            state.incidentTypesLoadStatus = status;
        },

        setIncidentTypes(state, electionTypes) {
            state.incidentTypes = electionTypes;
        }
    },
    getters: {
        getIncidentTypesLoadStatus(state) {
            return state.incidentTypesLoadStatus;
        },

        getIncidentTypes(state) {
            return state.incidentTypes;
        }
    }
};