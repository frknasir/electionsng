/*
|-------------------------------------------------------------------------------
| VUEX modules/state.js
|-------------------------------------------------------------------------------
| The Vuex data store for the state
*/

import StateAPI from '../api/state.js';

export const state = { 
    state: {
        states: [],
        statesLoadStatus: 0,
        st: {},
        stateLoadStatus: 0,
        updateStateLoadStatus: 0,
        updateStateResult: {}
    },
    actions: {
        getStates({commit}) {
            commit('setStatesLoadStatus', 1);

            StateAPI.getStates()
                .then(function(response) {
                    commit('setStatesLoadStatus', 2);
                    commit('setStates', response.data.data);
                })
                .catch(function() {
                    commit('setStatesLoadStatus', 3);
                    commit('setStates', []);
                });
        },

        getState({commit}, data) {
            commit('setStateLoadStatus', 1);

            StateAPI.getState(
                data.id
            ).then(function(response) {
                commit('setStateLoadStatus', 2);
                commit('setState', response.data.data);
            }).catch(function() {
                commit('setStateLoadStatus', 3);
                commit('setState', {});
            });
        },

        updateState({commit, state, dispatch}, data) {
            commit('setUpdateStateLoadStatus', 1);

            StateAPI.updateState(
                data.id,
                data.latitude,
                data.longitude
            ).then(function(response) {
                commit('setUpdateStateLoadStatus', 2);
                commit('setUpdateStateResult', response.data);
            })
            .catch(function() {
                commit('setUpdateStateLoadStatus', 3);
                commit('setUpdateStateResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
            });
        }
    },
    mutations: {
        setStatesLoadStatus(state, status) {
            state.stateLoadStatus = status;
        },

        setStates(state, states) {
            state.states = states;
        },

        setStateLoadStatus(state, status) {
            state.stateLoadStatus = status;
        },

        setState(state, st) {
            state.st = st;
        },

        setUpdateStateLoadStatus(state, status) {
            state.updateStateLoadStatus = status;
        },

        setUpdateStateResult(state, result) {
            state.updateStateResult = result;
        }
    },
    getters: {
        getStatesLoadStatus(state) {
            return state.stateLoadStatus;
        },

        getStates(state) {
            return state.states;
        },

        getStateLoadStatus(state) {
            return state.stateLoadStatus;
        },

        getState(state) {
            return state.st;
        },

        getUpdateStateLoadStatus(state) {
            return state.updateStateLoadStatus;
        },

        getUpdateStateResult(state) {
            return state.updateStateResult;
        }
    }
}