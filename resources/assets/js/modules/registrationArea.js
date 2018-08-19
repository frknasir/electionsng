/*
|-------------------------------------------------------------------------------
| VUEX modules/registrationArea.js
|-------------------------------------------------------------------------------
| The Vuex data store for the registrationArea
*/

import RegistrationAreaAPI from '../api/registrationArea.js';
import { CONFIG } from '../config.js';

export const registrationArea = {
    state: {
        registrationAreas: [],
        registrationAreasLoadStatus: CONFIG.STATUSES.idle,
        addRegistrationAreaLoadStatus: CONFIG.STATUSES.idle,
        updateRegistrationAreaLoadStatus: CONFIG.STATUSES.idle,
        deleteRegistrationAreaLoadStatus: CONFIG.STATUSES.idle
    },
    actions: {
        getRegistrationAreas({commit, state, dispatch}, data) {
            commit('setRegistrationAreasLoadStatus', CONFIG.STATUSES.loading);

            RegistrationAreaAPI.getRegistrationAreasFor(
                data.id
            ).then(function(response) {
                commit('setRegistrationAreasLoadStatus', CONFIG.STATUSES.completed_with_success);
                commit('setRegistrationAreas', response.data);
            }).catch(function() {
                commit('setRegistrationAreasLoadStatus', CONFIG.STATUSES.completed_with_failure);
                commit('setRegistrationAreas', []);
            });
        },

        addRegistrationArea({commit, state, dispatch}, data) {
            commit('setRegistrationAreaLoadStatus', CONFIG.STATUSES.loading);

            RegistrationAreaAPI.addRegistrationArea(
                data.name,
                data.local_government_id,
                data.latitude,
                data.longitude,
                data.added_by,
                data.updated_by
            ).then(function(response) {
                commit('setAddRegistrationAreaLoadStatus', CONFIG.STATUSES.completed_with_success);
                dispatch('getRegistrationAreas');
            }).catch(function() {
                commit('setAddRegistrationAreaLoadStatus', CONFIG.STATUSES.completed_with_failure);
            });
        },

        updateRegistrationArea({commit, state, dispatch}, data) {
            commit('setUpdateRegistrationAreaLoadStatus', CONFIG.STATUSES.loading);

            RegistrationAreaAPI.updateRegistrationArea(
                data.id,
                data.name,
                data.latitude,
                data.longitude,
                data.updated_by
            ).then(function(response) {
                commit('setUpdateRegistrationAreaLoadStatus', CONFIG.STATUSES.completed_with_success);
                dispatch('getRegistrationAreas');
            }).catch(function() {
                commit('setUpdateRegistrationAreaLoadStatus', CONFIG.STATUSES.completed_with_failure);
            });
        },

        deleteRegistrationArea({commit, state, dispatch}, data) {
            commit('setDeleteRegistrationAreaLoadStatus', CONFIG.STATUSES.loading);

            RegistrationAreaAPI.deleteRegistrationArea(
                data.id
            ).then(function(response) {
                commit('setDeleteRegistrationAreaLoadStatus', CONFIG.STATUSES.completed_with_success);
                dispatch('getRegistrationAreas');
            }).catch(function() {
                commit('setDeleteRegistrationAreaLoadStatus', CONFIG.STATUSES.completed_with_failure);
            });
        }
    },
    mutations: {
        setRegistrationAreasLoadStatus(state, status) {
            state.registrationAreasLoadStatus = status;
        },

        setRegistrationAreas(state, registrationAreas) {
            state.registrationAreas = registrationAreas;
        },

        setAddRegistrationAreaLoadStatus(state, status) {
            state.addRegistrationAreaLoadStatus = status;
        },

        setUpdateRegistrationAreaLoadStatus(state, status) {
            state.updateRegistrationAreaLoadStatus = status;
        },

        setDeleteRegistrationAreaLoadStatus(state, status) {
            state.deleteRegistrationAreaLoadStatus = status;
        }
    },
    getters: {
        getRegistrationAreasLoadStatus(state) {
            return state.registrationAreasLoadStatus;
        },

        getRegistrationAreas(state) {
            return state.registrationAreas;
        },

        getAddRegistrationAreaLoadStatus(state) {
            return state.addRegistrationAreaLoadStatus;
        },

        getUpdateRegistrationAreaLoadStatus(state) {
            return state.updateRegistrationAreaLoadStatus;
        },

        getDeleteRegistrationAreaLoadStatus(state) {
            return state.deleteRegistrationAreaLoadStatus;
        }
    }
};