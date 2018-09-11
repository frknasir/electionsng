/*
|-------------------------------------------------------------------------------
| VUEX modules/incidentType.js
|-------------------------------------------------------------------------------
| The Vuex data store for the incidentType
*/

import IncidentTypeAPI from '../api/incidentType.js';

export const incidentType = { 
    state: {
        incidentTypes: [],
        incidentTypesLoadStatus: 0,
    },
    actions: {
        getIncidentTypes({commit}) {
            commit('setIncidentTypesLoadStatus', 1);

            IncidentTypeAPI.getIncidentTypes()
                .then(function(response) {
                    commit('setIncidentTypesLoadStatus', 2);
                    commit('setIncidentTypes', response.data.data);
                })
                .catch(function() {
                    commit('setIncidentTypesLoadStatus', 3);
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