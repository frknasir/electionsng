/*
|-------------------------------------------------------------------------------
| VUEX modules/registrationArea.js
|-------------------------------------------------------------------------------
| The Vuex data store for the registrationArea
*/

import RegistrationAreaAPI from '../api/registrationArea.js';

export const registrationArea = {
    state: {
        registrationAreas: [],
        registrationAreasLoadStatus: 0,
        addRegistrationAreaLoadStatus: 0,
        updateRegistrationAreaLoadStatus: 0,
        deleteRegistrationAreaLoadStatus: 0
    },
    actions: {
        getRegistrationAreas({commit, state, dispatch}, data) {
            commit('setRegistrationAreasLoadStatus', 1);

            RegistrationAreaAPI.getRegistrationAreasFor(
                data.id
            ).then(function(response) {
                commit('setRegistrationAreasLoadStatus', 2);
                commit('setRegistrationAreas', response.data.data);
            }).catch(function() {
                commit('setRegistrationAreasLoadStatus', 3);
                commit('setRegistrationAreas', []);
            });
        },

        addRegistrationArea({commit, state, dispatch}, data) {
            commit('setRegistrationAreaLoadStatus', 1);

            RegistrationAreaAPI.addRegistrationArea(
                data.name,
                data.local_government_id,
                data.latitude,
                data.longitude,
                data.added_by,
                data.updated_by
            ).then(function(response) {
                commit('setAddRegistrationAreaLoadStatus', 2);
                dispatch('getRegistrationAreas');
            }).catch(function() {
                commit('setAddRegistrationAreaLoadStatus', 3);
            });
        },

        updateRegistrationArea({commit, state, dispatch}, data) {
            commit('setUpdateRegistrationAreaLoadStatus', 1);

            RegistrationAreaAPI.updateRegistrationArea(
                data.id,
                data.name,
                data.latitude,
                data.longitude,
                data.updated_by
            ).then(function(response) {
                commit('setUpdateRegistrationAreaLoadStatus', 2);
                dispatch('getRegistrationAreas');
            }).catch(function() {
                commit('setUpdateRegistrationAreaLoadStatus', 3);
            });
        },

        deleteRegistrationArea({commit, state, dispatch}, data) {
            commit('setDeleteRegistrationAreaLoadStatus', 1);

            RegistrationAreaAPI.deleteRegistrationArea(
                data.id
            ).then(function(response) {
                commit('setDeleteRegistrationAreaLoadStatus', 2);
                dispatch('getRegistrationAreas');
            }).catch(function() {
                commit('setDeleteRegistrationAreaLoadStatus', 3);
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