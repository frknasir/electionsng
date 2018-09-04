/*
|-------------------------------------------------------------------------------
| VUEX modules/result.js
|-------------------------------------------------------------------------------
| The Vuex data store for the result
*/

import ResultAPI from '../api/result.js';
import FinalResultAPI from '../api/finalResult.js';

export const result = {
    
    state: {
        results: [],
        resultsLoadStatus: 0,
        result: {},
        resultLoadStatus: 0,
        addResultLoadStatus: 0,
        updateResultLoadStatus: 0,
        deleteResultLoadStatus: 0,
        addFinalResultLoadStatus: 0,
        updateFinalResultLoadStatus: 0,
        deleteFinalResultLoadStatus: 0
    },

    actions: {
        getStateResults({commit}, data) {
            commit('setResultsLoadStatus', 1);

            ResultAPI.getStateResults(
                data.electionId,
                data.stateId
            ).then(function(response) {
                commit('setResultsLoadStatus', 2);
                commit('setResults', response.data.data);
            }).catch(function() {
                commit('setResultsLoadStatus', 3);
                commit('setResults', []);
            });
        },

        getLocalGovernmentResults({commit}, data) {
            commit('setResultsLoadStatus', 1);

            ResultAPI.getLocalGovernmentResults(
                data.electionId,
                data.localGovernmentId
            ).then(function(response) {
                commit('setResultsLoadStatus', 2);
                commit('setResults', response.data.data);
            }).catch(function() {
                commit('setResultsLoadStatus', 3);
                commit('setResults', []);
            });
        },

        getRegistrationAreaResults({commit}, data) {
            commit('setResultsLoadStatus', 1);

            ResultAPI.getRegistrationAreaResults(
                data.electionId,
                data.registrationAreaId
            ).then(function(response) {
                commit('setResultsLoadStatus', 2);
                commit('setResults', response.data.data);
            }).catch(function() {
                commit('setResultsLoadStatus', 3);
                commit('setResults', []);
            });
        },

        getPollingUnitResults({commit}, data) {
            commit('setResultsLoadStatus', 1);

            ResultAPI.getPollingUnitResults(
                data.electionId,
                data.pollingUnitId
            ).then(function(response) {
                commit('setResultsLoadStatus', 2);
                commit('setResults', response.data.data);
            }).catch(function() {
                commit('setResultsLoadStatus', 3);
                commit('setResults', []);
            });
        },

        addResult({commit, state, dispatch}, data) {
            commit('setAddResultLoadStatus', 1);

            ResultAPI.addResult(
                data.political_party_id,
                data.election_id,
                data.location_id,
                data.location_type,
                data.votes,
                data.added_by,
                data.updated_by
            ).then(function(response) {
                commit('setAddResultLoadStatus', 2);
            }).catch(function() {
                commit('setAddResultLoadStatus', 3);
            });
        },

        updateResult({commit, state, dispatch}, data) {
            commit('setUpdateResultLoadStatus', 1);

            ResultAPI.updateResult(
                data.id,
                data.votes,
                data.updated_by
            ).then(function(response) {
                commit('setUpdateResultLoadStatus', 2);
            }).catch(function() {
                commit('setUpdateResultLoadStatus', 3);
            });
        },

        deleteResult({commit, state, dispatch}, data) {
            commit('setDeleteResultLoadStatus', 1);

            ResultAPI.deleteResult(
                data.id
            ).then(function(response) {
                commit('setDeleteResultLoadStatus', 2);
            }).catch(function() {
                commit('setDeleteResultLoadStatus', 3);
            });
        }, 

        getFinalResults({commit}, data) {
            commit('setResultsLoadStatus', 1);

            FinalResultAPI.getFinalResults(
                data.id
            ).then(function(response) {
                commit('setResultsLoadStatus', 2);
                commit('setResults', response.data.data);
            }).catch(function() {
                commit('setResultsLoadStatus', 3);
            });
        },

        addFinalResult({commit, state, dispatch}, data) {
            commit('setAddFinalResultLoadStatus', 1);

            FinalResultAPI.addFinalResult(
                data.candidate_id,
                data.votes,
                data.added_by,
                data.updated_by
            ).then(function(response) {
                commit('setAddFinalResultLoadStatus', 2);
            }).catch(function() {
                commit('setAddFinalResultLoadStatus', 3);
            });
        },

        updateFinalResult({commit, state, dispatch}, data) {
            commit('setUpdateFinalResultLoadStatus', 1);

            FinalResultAPI.updateFinalResult(
                data.id,
                data.votes,
                data.updated_by
            ).then(function(response) {
                commit('setUpdateFinalResultLoadStatus', 2);
            }).catch(function() {
                commit('setUpdateFinalResultLoadStatus', 3);
            });
        },

        deleteFinalResult({commit, state, dispatch}, data) {
            commit('setDeleteFinalResultLoadStatus', 1);

            FinalResultAPI.deleteFinalResult(
                data.id
            ).then(function(response) {
                commit('setDeleteFinalResultLoadStatus', 2);
            }).catch(function() {
                commit('setDeleteFinalResultLoadStatus', 3);
            });
        }
    },

    mutations: {
        setResultsLoadStatus(state, status) {
            state.resultsLoadStatus = status;
        },

        setResults(state, results) {
            state.results = results;
        },

        setResultLoadStatus(state, status) {
            state.resultLoadStatus = status;
        },

        setResult(state, result) {
            state.result = result;
        }, 

        setAddResultLoadStatus(state, status) {
            state.addResultLoadStatus = status;
        },

        setUpdateResultLoadStatus(state, status) {
            state.updateResultLoadStatus = status;
        },

        setDeleteResultLoadStatus(state, status) {
            state.deleteResultLoadStatus = status;
        },

        setAddFinalResultLoadStatus(state, status) {
            state.addFinalResultLoadStatus = status;
        },

        setUpdateFinalResultLoadStatus(state, status) {
            state.updateFinalResultLoadStatus = status;
        },

        setDeleteFinalResultLoadStatus(state, status) {
            state.deleteFinalResultLoadStatus = status;
        }
    },

    getters: {
        getResultsLoadStatus(state) {
            return state.resultsLoadStatus;
        },

        getResults(state) {
            return state.results;
        },

        getResultLoadStatus(state) {
            return state.resultLoadStatus;
        },

        getResult(state) {
            return state.result;
        }, 

        getAddResultLoadStatus(state) {
            return state.addResultLoadStatus;
        },

        getUpdateResultLoadStatus(state) {
            return state.updateResultLoadStatus;
        },

        getDeleteResultLoadStatus(state) {
            return state.deleteResultLoadStatus;
        },

        getAddFinalResultLoadStatus(state) {
            return state.addFinalResultLoadStatus;
        },

        getUpdateFinalResultLoadStatus(state) {
            return state.updateFinalResultLoadStatus;
        },

        getDeleteFinalResultLoadStatus(state) {
            return state.deleteFinalResultLoadStatus;
        }
    }
};