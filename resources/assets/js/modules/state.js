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
        stateLoadStatus: 0,
        updateStateLoadStatus: 0,
    },
    actions: {
        getStates({commit}) {
            commit('setStateLoadStatus', 1);

            StateAPI.getStates()
                .then(function(response) {
                    commit('setStateLoadStatus', 2);
                    commit('setStates', response.data.data);
                })
                .catch(function() {
                    commit('setStateLoadStatus', 3);
                    commit('setStates', []);
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
                dispatch('getStates');
            })
            .catch(function() {
                commit('setUpdateStateLoadStatus', 3);
            });
        }
    },
    mutations: {
        setStateLoadStatus(state, status) {
            state.stateLoadStatus = status;
        },

        setStates(state, states) {
            state.states = states;
        },

        setUpdateStateLoadStatus(state, status) {
            state.updateStateLoadStatus = status;
        }
    },
    getters: {
        getStateLoadStatus(state) {
            return state.stateLoadStatus;
        },

        getStates(state) {
            return state.states;
        },

        getUpdateStateLoadStatus(state) {
            return state.updateStateLoadStatus;
        }
    }
}