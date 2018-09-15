/*
|-------------------------------------------------------------------------------
| VUEX modules/electionType.js
|-------------------------------------------------------------------------------
| The Vuex data store for the electionType
*/

import ElectionTypeAPI from '../api/electionType.js';

export const electionType = { 
    state: {
        electionTypes: [],
        electionTypesLoadStatus: 0,
    },
    actions: {
        getElectionTypes({commit}) {
            commit('setElectionTypesLoadStatus', 1);

            ElectionTypeAPI.getElectionTypes()
                .then(function(response) {
                    commit('setElectionTypesLoadStatus', 2);
                    commit('setElectionTypes', response.data.data);
                })
                .catch(function() {
                    commit('setElectionTypesLoadStatus', 3);
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