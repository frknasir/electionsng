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
        pollingUnit: {},
        pollingUnitLoadStatus: 0,
        addPollingUnitLoadStatus: 0,
        addPollingUnitResult: {
            success: 0
        },
        updatePollingUnitLoadStatus: 0,
        updatePollingUnitResult: {},
        deletePollingUnitLoadStatus: 0,
        deletePollingUnitResult: {}
    },
    actions: {
        getPollingUnits({commit}, data) {
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

        getPollingUnit({commit}, data) {
            commit('setPollingUnitLoadStatus', 1);

            PollingUnitAPI.getPollingUnit(
                data.id
            ).then(function(response) {
                commit('setPollingUnitLoadStatus', 2);
                commit('setPollingUnit', response.data.data);
            }).catch(function() {
                commit('setPollingUnitLoadStatus', 3);
                commit('setPollingUnit', {});
            });
        },

        addPollingUnit({commit, state, dispatch}, data) { 
            commit('setPollingUnitLoadStatus', 1);

            PollingUnitAPI.addPollingUnit(
                data.code,
                data.description,
                data.registration_area_id,
                data.latitude,
                data.longitude
            ).then(function(response) {
                commit('setAddPollingUnitLoadStatus', 2);
                commit('setAddPollingUnitResult', response.data);
            }).catch(function() {
                commit('setAddPollingUnitLoadStatus', 3);
                commit('setAddPollingUnitResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
            });
        },

        updatePollingUnit({commit, state, dispatch}, data) {
            commit('setUpdatePollingUnitLoadStatus', 1);

            PollingUnitAPI.updatePollingUnit(
                data.id,
                data.code,
                data.description,
                data.latitude,
                data.longitude
            ).then(function(response) {
                commit('setUpdatePollingUnitLoadStatus', 2);
                commit('setUpdatePollingUnitResult', response.data);
            }).catch(function() {
                commit('setUpdatePollingUnitLoadStatus', 3);
                commit('setUpdatePollingUnitResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
            });
        },

        deletePollingUnit({commit, state, dispatch}, data) {
            commit('setDeletePollingUnitLoadStatus', 1);

            PollingUnitAPI.deletePollingUnit(
                data.id
            ).then(function(response) {
                commit('setDeletePollingUnitLoadStatus', 2);
                commit('setUpdatePollingUnitResult', response.data);
            }).catch(function() {
                commit('setDeletePollingUnitLoadStatus', 3);
                commit('setUpdatePollingUnitResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
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

        setPollingUnit(state, pollingUnit) {
            state.pollingUnit = pollingUnit;
        },

        setPollingUnitLoadStatus(state, status) {
            state.pollingUnitLoadStatus = status;
        },

        setAddPollingUnitLoadStatus(state, status) {
            state.addPollingUnitLoadStatus = status;
        },

        setAddPollingUnitResult(state, result) {
            state.addPollingUnitResult = result;
        },

        setUpdatePollingUnitLoadStatus(state, status) {
            state.updatePollingUnitLoadStatus = status;
        },

        setUpdatePollingUnitResult(state, result) {
            state.updatePollingUnitResult = result;
        },

        setDeletePollingUnitLoadStatus(state, status) {
            state.deletePollingUnitLoadStatus = status;
        },

        setDeletePollingUnitResult(state, result) {
            state.deletePollingUnitResult = result;
        }
    },
    getters: {
        getPollingUnitsLoadStatus(state) {
            return state.pollingUnitsLoadStatus;
        },

        getPollingUnits(state) {
            return state.pollingUnits;
        },

        getPollingUnit(state) {
            return state.pollingUnit;
        },

        getPollingUnitLoadStatus(state) {
            return state.pollingUnitLoadStatus;
        },

        getAddPollingUnitLoadStatus(state) {
            return state.addPollingUnitLoadStatus;
        },

        getAddPollingUnitResult(state) {
            return state.addPollingUnitResult;
        },

        getUpdatePollingUnitLoadStatus(state) {
            return state.updatePollingUnitLoadStatus;
        },

        getUpdatePollingUnitResult(state) {
            return state.updatePollingUnitResult;
        },

        getDeletePollingUnitLoadStatus(state) {
            return state.deletePollingUnitLoadStatus;
        },

        getDeletePollingUnitResult(state) {
            return state.deletePollingUnitResult;
        }
    }
};