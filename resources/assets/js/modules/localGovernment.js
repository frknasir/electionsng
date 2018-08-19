/*
|-------------------------------------------------------------------------------
| VUEX modules/localGovernment.js
|-------------------------------------------------------------------------------
| The Vuex data store for the localGovernment
*/

import LocalGovernmentAPI from '../api/localGovernment.js';
import { CONFIG } from '../config.js';

export const localGovernment = {
    state: {
        localGovernments: [],
        localGovernmentsLoadStatus: CONFIG.STATUSES.idle,
        updateLocalGovernmentLoadStatus: CONFIG.STATUSES.idle
    },
    actions: {
        getLocalGovernments({commit}, data) {
            commit('setLocalGovernmentsLoadStatus', CONFIG.STATUSES.loading);

            LocalGovernmentAPI.getLocalGovernmentsFor(
                data.id
            ).then(function(response) {
                commit('setLocalGovernmentsLoadStatus', CONFIG.STATUSES.completed_with_success);
                commit('setLocalGovernments', response.data);
            }).catch(function(){
                commit('setLocalGovernmentsLoadStatus', CONFIG.STATUSES.completed_with_failure);
            });
        },
        updateLocalGovernment({commit, state, dispatch}, data) {
            commit('setUpdateLocalGovernmentLoadStatus', CONFIG.STATUSES.loading);
        
            LocalGovernmentAPI.UpdateLocalGovernment(
                data.id,
                data.latitude,
                data.longitude
            ).then(function(response) {
                commit('setUpdateLocalGovernmentLoadStatus', CONFIG.STATUSES.completed_with_success);
                dispatch('getLocalGovernments', data);
            }).then(function(){
                commit('setUpdateLocalGovernmentLoadStatus', CONFIG.STATUSES.completed_with_failure);
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
        setUpdateLocalGovernmentLoadStatus(state, status) {
            state.updateLocalGovernmentLoadStatus = status;
        }
    },
    getters: {
        getLocalGovernmentsLoadStatus(state) {
            return state.localGovernmentsLoadStatus;
        },
        getLocalGovernments(state) {
            return state.localGovernments;
        },
        getUpdateLocalGovernmentLoadStatus(state) {
            return state.updateLocalGovernmentLoadStatus;
        }
    }
};