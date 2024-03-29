/*
|-------------------------------------------------------------------------------
| VUEX modules/finalResult.js
|-------------------------------------------------------------------------------
| The Vuex data store for the finalResult
*/

import FinalResultAPI from '../api/finalResult.js';

export const finalResult = {
    state: {
        finalResults: [],
        finalResultsLoadStatus: 0,
        addFinalResultLoadStatus: 0,
        updateFinalResultLoadStatus: 0,
        deleteFinalResultLoadStatus: 0
    },
    actions: {
        getFinalResults({commit}, data) {
            commit('setFinalResultsLoadStatus', 1);

            FinalResultAPI.getFinalResults(
                data.id
            ).then(function(response) {
                commit('setFinalResultsLoadStatus', 2);
                commit('setFinalResults', response.data.data);
            }).catch(function() {
                commit('setFinalResultsLoadStatus', 3);
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
        setFinalResults(state, finalResults) {
            state.finalResults = finalResults;
        },

        setFinalResultsLoadStatus(state, status) {
            state.finalResultsLoadStatus = status;
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
        getFinalResults(state) {
            return state.finalResults;
        },

        getFinalResultsLoadStatus(state) {
            return state.finalResultsLoadStatus;
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