/*
|-------------------------------------------------------------------------------
| VUEX modules/localGovernment.js
|-------------------------------------------------------------------------------
| The Vuex data store for the localGovernment
*/

import LocalGovernmentAPI from '../api/localGovernment.js';

export const localGovernment = {
    state: {
        localGovernments: [],
        localGovernmentsLoadStatus: 0,
        localGovernment: {},
        localGovernmentLoadStatus: 0,
        updateLocalGovernmentLoadStatus: 0,
        updateLocalGovernmentResult: {}
    },
    actions: {
        getLocalGovernments({commit}, data) {
            commit('setLocalGovernmentsLoadStatus', 1);

            LocalGovernmentAPI.getLocalGovernmentsFor(
                data.id
            ).then(function(response) {
                commit('setLocalGovernmentsLoadStatus', 2);
                commit('setLocalGovernments', response.data.data);
            }).catch(function(){
                commit('setLocalGovernmentsLoadStatus', 3);
            });
        },
        getLocalGovernment({commit}, data) {
            commit('setLocalGovernmentLoadStatus', 1);

            LocalGovernmentAPI.getLocalGovernment(
                data.id
            ).then(function(response) {
                commit('setLocalGovernmentLoadStatus', 2);
                commit('setLocalGovernment', response.data.data);
            }).catch(function() {
                commit('setLocalGovernmentLoadStatus', 3);
            });
        },
        updateLocalGovernment({commit, state, dispatch}, data) {
            commit('setUpdateLocalGovernmentLoadStatus', 1);
        
            LocalGovernmentAPI.updateLocalGovernment(
                data.id,
                data.latitude,
                data.longitude
            ).then(function(response) {
                commit('setUpdateLocalGovernmentLoadStatus', 2);
                commit('setUpdateLocalGovernmentResult', response.data);
            }).then(function(){
                commit('setUpdateLocalGovernmentLoadStatus', 3);
                commit('setUpdateLocalGovernmentResult', {
                    success: 0,
                    message: 'Something is wrong. Try again!'
                });
            });
        }
    },
    mutations: {
        setLocalGovernmentsLoadStatus(state, status) {
            state.localGovernmentsLoadStatus = status;
        },
        setLocalGovernments(state, localGovernments) {
            state.localGovernments = localGovernments;
        },
        setLocalGovernmentLoadStatus(state, status) {
            state.localGovernmentLoadStatus = status;
        },
        setLocalGovernment(state, localGovernment) {
            state.localGovernment = localGovernment;
        },
        setUpdateLocalGovernmentLoadStatus(state, status) {
            state.updateLocalGovernmentLoadStatus = status;
        },
        setUpdateLocalGovernmentResult(state, result) {
            state.updateLocalGovernmentResult = result;
        }
    },
    getters: {
        getLocalGovernmentsLoadStatus(state) {
            return state.localGovernmentsLoadStatus;
        },
        getLocalGovernments(state) {
            return state.localGovernments;
        },
        getLocalGovernmentLoadStatus(state) {
            return state.localGovernmentLoadStatus;
        },
        getLocalGovernment(state) {
            return state.localGovernment;
        },
        getUpdateLocalGovernmentLoadStatus(state) {
            return state.updateLocalGovernmentLoadStatus;
        },
        getUpdateLocalGovernmentResult(state) {
            return state.updateLocalGovernmentResult;
        }
    }
};