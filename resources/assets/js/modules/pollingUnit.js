/*
|-------------------------------------------------------------------------------
| VUEX modules/pollingUnit.js
|-------------------------------------------------------------------------------
| The Vuex data store for the pollingUnit
*/

import PollingUnitAPI from '../api/pollingUnit.js';
import { CONFIG } from '../config.js';

export const pollingUnit = {
    state: {
        pollingUnits: [],
        pollingUnitsLoadStatus: CONFIG.STATUSES.idle,
        addPollingUnitLoadStatus: CONFIG.STATUSES.idle,
        updatePollingUnitLoadStatus: CONFIG.STATUSES.idle,
        deletePollingUnitLoadStatus: CONFIG.STATUSES.idle
    },
    actions: {
        getPollingUnits({commit, state, dispatch}, data) {
            commit('setPollingUnitsLoadStatus', CONFIG.STATUSES.loading);

            PollingUnitAPI.getPollingUnitsFor(
                data.id
            ).then(function(response) {
                commit('setPollingUnitsLoadStatus', CONFIG.STATUSES.completed_with_success);
                commit('setPollingUnits', response.data);
            }).catch(function() {
                commit('setPollingUnitsLoadStatus', CONFIG.STATUSES.completed_with_failure);
                commit('setPollingUnits', []);
            });
        },

        addPollingUnit({commit, state, dispatch}, data) {
            commit('setPollingUnitLoadStatus', CONFIG.STATUSES.loading);

            PollingUnitAPI.addPollingUnit(
                data.code,
                data.description,
                data.registration_area_id,
                data.latitude,
                data.longitude,
                data.added_by,
                data.updated_by
            ).then(function(response) {
                commit('setAddPollingUnitLoadStatus', CONFIG.STATUSES.completed_with_success);
                dispatch('getPollingUnits');
            }).catch(function() {
                commit('setAddPollingUnitLoadStatus', CONFIG.STATUSES.completed_with_failure);
            });
        },

        updatePollingUnit({commit, state, dispatch}, data) {
            commit('setUpdatePollingUnitLoadStatus', CONFIG.STATUSES.loading);

            PollingUnitAPI.updatePollingUnit(
                data.id,
                data.code,
                data.description,
                data.latitude,
                data.longitude,
                data.updated_by
            ).then(function(response) {
                commit('setUpdatePollingUnitLoadStatus', CONFIG.STATUSES.completed_with_success);
                dispatch('getPollingUnits');
            }).catch(function() {
                commit('setUpdatePollingUnitLoadStatus', CONFIG.STATUSES.completed_with_failure);
            });
        },

        deletePollingUnit({commit, state, dispatch}, data) {
            commit('setDeletePollingUnitLoadStatus', CONFIG.STATUSES.loading);

            PollingUnitAPI.deletePollingUnit(
                data.id
            ).then(function(response) {
                commit('setDeletePollingUnitLoadStatus', CONFIG.STATUSES.completed_with_success);
                dispatch('getPollingUnits');
            }).catch(function() {
                commit('setDeletePollingUnitLoadStatus', CONFIG.STATUSES.completed_with_failure);
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