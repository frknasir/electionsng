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
        updateLocalGovernmentLoadStatus: 0
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
        updateLocalGovernment({commit, state, dispatch}, data) {
            commit('setUpdateLocalGovernmentLoadStatus', 1);
        
            LocalGovernmentAPI.UpdateLocalGovernment(
                data.id,
                data.latitude,
                data.longitude
            ).then(function(response) {
                commit('setUpdateLocalGovernmentLoadStatus', 2);
                dispatch('getLocalGovernments', data);
            }).then(function(){
                commit('setUpdateLocalGovernmentLoadStatus', 3);
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