/*
|-------------------------------------------------------------------------------
| VUEX modules/pollingUnit.js
|-------------------------------------------------------------------------------
| The Vuex data store for the pollingUnit
*/

import PollingUnitAPI from '../api/pollingUnit.js';

export const pollingUnit = {
    state: {
        pollingUnits: [],
        pollingUnitsLoadStatus: 0,
        addPollingUnitLoadStatus: 0,
        updatePollingUnitLoadStatus: 0,
        deletePollingUnitLoadStatus: 0
    },
    actions: {
        getPollingUnits({commit, state, dispatch}, data) {
            commit('setPollingUnitsLoadStatus', 1);

            PollingUnitAPI.getPollingUnitsFor(
                data.id
            ).then(function(response) {
                commit('setPollingUnitsLoadStatus', 2);
                commit('setPollingUnits', response.data.data);
            }).catch(function() {
                commit('setPollingUnitsLoadStatus', 3);
                commit('setPollingUnits', []);
            });
        },

        addPollingUnit({commit, state, dispatch}, data) { 
            commit('setPollingUnitLoadStatus', 1);

            PollingUnitAPI.addPollingUnit(
                data.code,
                data.description,
                data.registration_area_id,
                data.latitude,
                data.longitude,
                data.added_by,
                data.updated_by
            ).then(function(response) {
                commit('setAddPollingUnitLoadStatus', 2);
                dispatch('getPollingUnits');
            }).catch(function() {
                commit('setAddPollingUnitLoadStatus', 3);
            });
        },

        updatePollingUnit({commit, state, dispatch}, data) {
            commit('setUpdatePollingUnitLoadStatus', 1);

            PollingUnitAPI.updatePollingUnit(
                data.id,
                data.code,
                data.description,
                data.latitude,
                data.longitude,
                data.updated_by
            ).then(function(response) {
                commit('setUpdatePollingUnitLoadStatus', 2);
                dispatch('getPollingUnits');
            }).catch(function() {
                commit('setUpdatePollingUnitLoadStatus', 3);
            });
        },

        deletePollingUnit({commit, state, dispatch}, data) {
            commit('setDeletePollingUnitLoadStatus', 1);

            PollingUnitAPI.deletePollingUnit(
                data.id
            ).then(function(response) {
                commit('setDeletePollingUnitLoadStatus', 2);
                dispatch('getPollingUnits');
            }).catch(function() {
                commit('setDeletePollingUnitLoadStatus', 3);
            });
        }
    },
    mutations: {
        setPollingUnitsLoadStatus(state, status) {
            state.pollingUnitsLoadStatus = status;
        },

        setPollingUnits(state, pollingUnits) {
            state.pollingUnits = pollingUnits;
        },

        setAddPollingUnitLoadStatus(state, status) {
            state.addPollingUnitLoadStatus = status;
        },

        setUpdatePollingUnitLoadStatus(state, status) {
            state.updatePollingUnitLoadStatus = status;
        },

        setDeletePollingUnitLoadStatus(state, status) {
            state.deletePollingUnitLoadStatus = status;
        }
    },
    getters: {
        getPollingUnitsLoadStatus(state) {
            return state.pollingUnitsLoadStatus;
        },

        getPollingUnits(state) {
            return state.pollingUnits;
        },

        getAddPollingUnitLoadStatus(state) {
            return state.addPollingUnitLoadStatus;
        },

        getUpdatePollingUnitLoadStatus(state) {
            return state.updatePollingUnitLoadStatus;
        },

        getDeletePollingUnitLoadStatus(state) {
            return state.deletePollingUnitLoadStatus;
        }
    }
};