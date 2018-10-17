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
        registrationArea: {},
        registrationAreaLoadStatus: 0,
        addRegistrationAreaLoadStatus: 0,
        addRegistrationAreaResult: {
            success: 0
        },
        updateRegistrationAreaLoadStatus: 0,
        updateRegistrationAreaResult: {},
        deleteRegistrationAreaLoadStatus: 0,
        deleteRegistrationAreaResult: {}
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

        getRegistrationArea({commit}, data) {
            commit('setRegistrationAreaLoadStatus', 1);

            RegistrationAreaAPI.getRegistrationArea(
                data.id
            ).then(function(response) {
                commit('setRegistrationAreaLoadStatus', 2);
                commit('setRegistrationArea', response.data.data);
            }).catch(function() {
                commit('setRegistrationAreaLoadStatus', 3);
                commit('setRegistrationArea', {});
            });
        },

        addRegistrationArea({commit, state, dispatch}, data) {
            commit('setAddRegistrationAreaLoadStatus', 1);

            RegistrationAreaAPI.addRegistrationArea(
                data.name,
                data.local_government_id,
                data.latitude,
                data.longitude
            ).then(function(response) {
                commit('setAddRegistrationAreaLoadStatus', 2);
                commit('setAddRegistrationAreaResult', response.data);
            }).catch(function() {
                commit('setAddRegistrationAreaLoadStatus', 3);
                commit('setAddRegistrationAreaResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
            });
        },

        updateRegistrationArea({commit, state, dispatch}, data) {
            commit('setUpdateRegistrationAreaLoadStatus', 1);

            RegistrationAreaAPI.updateRegistrationArea(
                data.id,
                data.name,
                data.latitude,
                data.longitude
            ).then(function(response) {
                commit('setUpdateRegistrationAreaLoadStatus', 2);
                commit('setUpdateRegistrationAreaResult', response.data);
            }).catch(function() {
                commit('setUpdateRegistrationAreaLoadStatus', 3);
                commit('setUpdateRegistrationAreaResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
            });
        },

        deleteRegistrationArea({commit, state, dispatch}, data) {
            commit('setDeleteRegistrationAreaLoadStatus', 1);

            RegistrationAreaAPI.deleteRegistrationArea(
                data.id
            ).then(function(response) {
                commit('setDeleteRegistrationAreaLoadStatus', 2);
                commit('setDeleteRegistrationAreaResult', response.data);
            }).catch(function() {
                commit('setDeleteRegistrationAreaLoadStatus', 3);
                commit('setDeleteRegistrationAreaResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
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

        setRegistrationArea(state, registrationArea) {
            state.registrationArea = registrationArea;
        },

        setRegistrationAreaLoadStatus(state, status) {
            state.registrationAreaLoadStatus = status;
        },

        setAddRegistrationAreaLoadStatus(state, status) {
            state.addRegistrationAreaLoadStatus = status;
        },

        setAddRegistrationAreaResult(state, result) {
            state.addRegistrationAreaResult = result;
        },

        setUpdateRegistrationAreaLoadStatus(state, status) {
            state.updateRegistrationAreaLoadStatus = status;
        },

        setUpdateRegistrationAreaResult(state, result) {
            state.updateRegistrationAreaResult = result;
        },

        setDeleteRegistrationAreaLoadStatus(state, status) {
            state.deleteRegistrationAreaLoadStatus = status;
        },

        setDeleteRegistrationAreaResult(state, result) {
            state.deleteRegistrationAreaResult = result;
        }
    },
    getters: {
        getRegistrationAreasLoadStatus(state) {
            return state.registrationAreasLoadStatus;
        },

        getRegistrationAreas(state) {
            return state.registrationAreas;
        },

        getRegistrationArea(state) {
            return state.registrationArea;
        },

        getRegistrationAreaLoadStatus(state) {
            return state.registrationAreaLoadStatus;
        },

        getAddRegistrationAreaLoadStatus(state) {
            return state.addRegistrationAreaLoadStatus;
        },

        getAddRegistrationAreaResult(state) {
            return state.addRegistrationAreaResult;
        },

        getUpdateRegistrationAreaLoadStatus(state) {
            return state.updateRegistrationAreaLoadStatus;
        },

        getUpdateRegistrationAreaResult(state) {
            return state.updateRegistrationAreaResult;
        },

        getDeleteRegistrationAreaLoadStatus(state) {
            return state.deleteRegistrationAreaLoadStatus;
        },

        getDeleteRegistrationAreaResult(state) {
            return state.deleteRegistrationAreaResult;
        }
    }
};