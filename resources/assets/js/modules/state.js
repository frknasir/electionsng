/*
|-------------------------------------------------------------------------------
| VUEX modules/state.js
|-------------------------------------------------------------------------------
| The Vuex data store for the state
*/

import StateAPI from '../api/state.js';
import { CONFIG } from '../config.js';

export const state = { 
    state: {
        states: [],
        stateLoadStatus: CONFIG.STATUSES.idle,
        updateStateLoadStatus: CONFIG.STATUSES.idle,
    },
    actions: {
        getStates({commit}) {
            commit('setStateLoadStatus', CONFIG.STATUSES.loading);

            StateAPI.getStates()
                .then(function(response) {
                    commit('setStateLoadStatus', CONFIG.STATUSES.completed_with_success);
                    commit('setStates', response.data);
                })
                .catch(function() {
                    commit('setStateLoadStatus', CONFIG.STATUSES.completed_with_failure);
                    commit('setStates', []);
                });
        },
        updateState({commit, state, dispatch}, data) {
            commit('setUpdateStateLoadStatus', CONFIG.STATUSES.loading);

            StateAPI.updateState(
                data.id,
                data.latitude,
                data.longitude
            ).then(function(response) {
                commit('setUpdateStateLoadStatus', CONFIG.STATUSES.completed_with_success);
                dispatch('getStates');
            })
            .catch(function() {
                commit('setUpdateStateLoadStatus', CONFIG.STATUSES.completed_with_failure);
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