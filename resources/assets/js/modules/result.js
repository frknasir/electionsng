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
        forr: {
            location_type: "For: ",
            location_name: "Final Result"
        },
        collationStats: {
            state: {},
            registrationArea: {},
            localGovernment: {},
            pollingUnit: {}
        },
        collationStatsLoadStatus: 0,
        addResultLoadStatus: 0,
        addResultResponse: {},
        updateResultLoadStatus: 0,
        updateResultResponse: {},
        deleteResultLoadStatus: 0,
        deleteResultResponse: {},
        addFinalResultLoadStatus: 0,
        addFinalResultResponse: {},
        updateFinalResultLoadStatus: 0,
        updateFinalResultResponse: {},
        deleteFinalResultLoadStatus: 0,
        deleteFinalResultResponse: {}
    },

    actions: {
        getResults({commit}, data) {
            commit('setResultsLoadStatus', 1);

            ResultAPI.getResults(
                data.electionId,
                data.locationType,
                data.locationId
            ).then(function(response) {
                commit('setResultsLoadStatus', 2);
                commit('setResults', response.data.data);
                let l = response.data.data[0].location.name;
                commit('setForr', {
                    location_type: "For State: ",
                    location_name: l
                });
            }).catch(function() {
                commit('setResultsLoadStatus', 3);
                commit('setResults', []);
                commit('setForr', {
                    location_type: "No Results ",
                    location_name: "Available For This Location"
                });
            });
        },

        getCollationStats({commit}, data) {
            commit('setCollationStatsLoadStatus', 1);

            ResultAPI.getCollationStats(
                data.election_id
            ).then(function(response) {
                commit('setCollationStatsLoadStatus', 2);
                commit('setCollationStats', response.data);
            }).catch(function() {
                commit('setCollationStatsLoadStatus', 3);
                commit('setCollationStats', {});
            });
        },

        addResult({commit, state, dispatch}, data) {
            commit('setAddResultLoadStatus', 1);

            ResultAPI.addResult(
                data.candidate_id,
                data.location_id,
                data.location_type,
                data.votes
            ).then(function(response) {
                commit('setAddResultLoadStatus', 2);
                commit('setAddResultResponse', response.data);
            }).catch(function() {
                commit('setAddResultLoadStatus', 3);
                commit('setÀddResultResponse', {
                    success: 0,
                    message: 'Something went wrong. Try again'
                });
            });
        },

        updateResult({commit, state, dispatch}, data) {
            commit('setUpdateResultLoadStatus', 1);

            ResultAPI.updateResult(
                data.id,
                data.votes
            ).then(function(response) {
                commit('setUpdateResultLoadStatus', 2);
                commit('setUpdateResultResponse', response.data);
            }).catch(function() {
                commit('setUpdateResultLoadStatus', 3);
                commit('setUpdateResultResponse', {
                    success: 0,
                    message: 'Something went wrong. Try again'
                });
            });
        },

        deleteResult({commit, state, dispatch}, data) {
            commit('setDeleteResultLoadStatus', 1);

            ResultAPI.deleteResult(
                data.id
            ).then(function(response) {
                commit('setDeleteResultLoadStatus', 2);
                commit('setDeleteResultResponse', response.data);
            }).catch(function() {
                commit('setDeleteResultLoadStatus', 3);
                commit('setDeleteResultResponse', response.data);
            });
        }, 

        getFinalResults({commit}, data) {
            commit('setResultsLoadStatus', 1);

            FinalResultAPI.getFinalResults(
                data.id
            ).then(function(response) {
                commit('setResultsLoadStatus', 2);
                commit('setResults', response.data.data);
                commit('setForr', {
                    location_type: "For: ",
                    location_name: "Final Result"
                });
            }).catch(function() {
                commit('setResultsLoadStatus', 3);
                commit('setForr', {
                    location_type: "No Results ",
                    location_name: "Available For This Location"
                });
            });
        },

        addFinalResult({commit, state, dispatch}, data) {
            commit('setAddFinalResultLoadStatus', 1);

            FinalResultAPI.addFinalResult(
                data.candidate_id,
                data.votes
            ).then(function(response) {
                commit('setAddFinalResultLoadStatus', 2);
                commit('setAddFinalResultResponse', response.data);
            }).catch(function() {
                commit('setAddFinalResultLoadStatus', 3);
                commit('setAddFinalResultResponse', {
                    success: 0,
                    message: 'Something went wrong. Try again'
                });
            });
        },

        updateFinalResult({commit, state, dispatch}, data) {
            commit('setUpdateFinalResultLoadStatus', 1);

            FinalResultAPI.updateFinalResult(
                data.id,
                data.votes
            ).then(function(response) {
                commit('setUpdateFinalResultLoadStatus', 2);
                commit('setUpdateFinalResultResponse', response.data);
            }).catch(function() {
                commit('setUpdateFinalResultLoadStatus', 3);
                commit('setUpdateFinalResultResponse', {
                    success: 0,
                    message: 'Something went wrong. Try again'
                });
            });
        },

        deleteFinalResult({commit, state, dispatch}, data) {
            commit('setDeleteFinalResultLoadStatus', 1);

            FinalResultAPI.deleteFinalResult(
                data.id
            ).then(function(response) {
                commit('setDeleteFinalResultLoadStatus', 2);
                commit('setDeleteFinalResultResponse', response.data);
            }).catch(function() {
                commit('setDeleteFinalResultLoadStatus', 3);
                commit('setDeleteFinalResultResponse', {
                    success: 0,
                    message: 'Something went wrong. Try again'
                });
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

        setForr(state, forr) {
            state.forr.location_type = forr.location_type;
            state.forr.location_name = forr.location_name;
        },

        setCollationStats(state, collationStats) {
            state.collationStats = collationStats;
        },

        setCollationStatsLoadStatus(state, status) {
            state.collationStatsLoadStatus = status;
        },

        setAddResultLoadStatus(state, status) {
            state.addResultLoadStatus = status;
        },

        setAddResultResponse(state, response) {
            state.addResultResponse = response;
        },

        setUpdateResultLoadStatus(state, status) {
            state.updateResultLoadStatus = status;
        },

        setUpdateResultResponse(state, response) {
            state.updateResultResponse = response;
        },

        setDeleteResultLoadStatus(state, status) {
            state.deleteResultLoadStatus = status;
        },

        setDeleteResultResponse(state, response) {
            state.deleteResultResponse = response;
        },

        setAddFinalResultLoadStatus(state, status) {
            state.addFinalResultLoadStatus = status;
        },

        setAddFinalResultResponse(state, response) {
            state.addFinalResultResponse = response;
        },

        setUpdateFinalResultLoadStatus(state, status) {
            state.updateFinalResultLoadStatus = status;
        },

        setUpdateFinalResultResponse(state, response) {
            state.updateFinalResultResponse = response;
        },

        setDeleteFinalResultLoadStatus(state, status) {
            state.deleteFinalResultLoadStatus = status;
        },

        setDeleteFinalResultResponse(state, response) {
            state.deleteFinalResultResponse = response;
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

        getForr(state) {
            return state.forr;
        },

        getCollationStats(state) {
            return state.collationStats;
        },

        getCollationStatsLoadStatus(state) {
            return state.collationStatsLoadStatus;
        },

        getAddResultLoadStatus(state) {
            return state.addResultLoadStatus;
        },

        getAddResultResponse(state) {
            return state.addResultResponse;
        },

        getUpdateResultLoadStatus(state) {
            return state.updateResultLoadStatus;
        },

        getUpdateResultResponse(state) {
            return state.updateResultResponse;
        },

        getDeleteResultLoadStatus(state) {
            return state.deleteResultLoadStatus;
        },

        getDeleteResultResponse(state) {
            return state.deleteResultResponse;
        },

        getAddFinalResultLoadStatus(state) {
            return state.addFinalResultLoadStatus;
        },

        getAddFinalResultResponse(state) {
            return state.addFinalResultResponse;
        },

        getUpdateFinalResultLoadStatus(state) {
            return state.updateFinalResultLoadStatus;
        },

        getUpdateFinalResultResponse(state) {
            return state.updateFinalResultResponse;
        },

        getDeleteFinalResultLoadStatus(state) {
            return state.deleteFinalResultLoadStatus;
        },

        getDeleteFinalResultResponse(state) {
            return state.deleteFinalResultResponse;
        }
    }
};