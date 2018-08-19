/*
|-------------------------------------------------------------------------------
| VUEX modules/electionType.js
|-------------------------------------------------------------------------------
| The Vuex data store for the electionType
*/

import ElectionTypeAPI from '../api/electionType.js';
import { CONFIG } from '../config.js';

export const electionType = { 
    state: {
        electionTypes: [],
        electionTypesLoadStatus: CONFIG.STATUSES.idle,
    },
    actions: {
        getElectionTypes({commit}) {
            commit('setElectionTypesLoadStatus', CONFIG.STATUSES.loading);

            ElectionTypeAPI.getElectionTypes()
                .then(function(response) {
                    commit('setElectionTypesLoadStatus', CONFIG.STATUSES.completed_with_success);
                    commit('setElectionTypes', response.data);
                })
                .catch(function() {
                    commit('setElectionTypesLoadStatus', CONFIG.STATUSES.completed_with_failure);
                    commit('setElectionTypes', []);
                });
        }
    },
    mutations: {
        setElectionTypesLoadStatus(state, status) {
            state.electionTypesLoadStatus = status;
        },

        setElectionTypes(state, electionTypes) {
            state.electionTypes = electionTypes;
        }
    },
    getters: {
        getElectionTypesLoadStatus(state) {
            return state.electionTypesLoadStatus;
        },

        getElectionTypes(state) {
            return state.electionTypes;
        }
    }
};