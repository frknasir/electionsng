/*
|-------------------------------------------------------------------------------
| VUEX modules/incidentType.js 
|-------------------------------------------------------------------------------
| The Vuex data store for the incidentType
*/

import IncidentTypeAPI from '../api/incidentType.js';

export const incidentType = { 
    state: {
        incidentTypes: [],
        incidentTypesLoadStatus: 0,
        incidentType: {},
        incidentTypeLoadStatus: 0,
        addIncidentTypeLoadStatus: 0,
        addIncidentTypeResult: {},
        updateIncidentTypeLoadStatus: 0,
        updateIncidentTypeResult: {},
        deleteIncidentTypeLoadStatus: 0,
        deleteIncidentTypeResult: {}
    },
    actions: {
        getIncidentTypes({commit}) {
            commit('setIncidentTypesLoadStatus', 1);

            IncidentTypeAPI.getIncidentTypes()
                .then(function(response) {
                    commit('setIncidentTypesLoadStatus', 2);
                    commit('setIncidentTypes', response.data.data);
                })
                .catch(function() {
                    commit('setIncidentTypesLoadStatus', 3);
                    commit('setIncidentTypes', []);
                });
        },

        getIncidentType({commit}, data) {
            commit('setIncidentTypeLoadStatus', 1);

            IncidentTypeAPI.getIncidentType(
                data.id
            ).then(function(response) {
                commit('setIncidentTypeLoadStatus', 2);
                commit('setIncidentType', response.data.data);
            }).catch(function() {
                commit('setIncidentTypeLoadStatus', 3);
                commit('setIncidentType', {});
            });
        },

        addIncidentType({commit, state, dispatch}, data) {
            commit('setAddIncidentTypeLoadStatus', 1);

            IncidentTypeAPI.addIncidentType(
                data.name
            ).then(function(response) {
                commit('setAddIncidentTypeLoadStatus', 2);
                commit('setAddIncidentTypeResult', response.data);
            }).catch(function() {
                commit('setAddIncidentTypeLoadStatus', 3);
                commit('setAddIncidentTypeResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
            });
        },

        updateIncidentType({commit, state, dispatch}, data) {
            commit('setUpdateIncidentTypeLoadStatus', 1);

            IncidentTypeAPI.updateIncidentType(
                data.id,
                data.name
            ).then(function(response) {
                commit('setUpdateIncidentTypeLoadStatus', 2);
                commit('setUpdateIncidentTypeResult', response.data);
            }).catch(function() {
                commit('setUpdateIncidentTypeLoadStatus', 3);
                commit('setUpdateIncidentTypeResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
            });
        },

        deleteIncidentType({commit, state, dispatch}, data) {
            commit('setDeleteIncidentTypeLoadStatus', 1);

            IncidentTypeAPI.deleteIncidentType(
                data.id
            ).then(function(response) {
                commit('setDeleteIncidentTypeLoadStatus', 2);
                commit('setDeleteIncidentTypeResult', response.data);
            }).catch(function() {
                commit('setDeleteIncidentTypeLoadStatus', 3);
                commit('setDeleteIncidentTypeResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
            });
        }
    },
    mutations: {
        setIncidentTypesLoadStatus(state, status) {
            state.incidentTypesLoadStatus = status;
        },

        setIncidentTypes(state, electionTypes) {
            state.incidentTypes = electionTypes;
        },

        setIncidentType(state, incidentType) {
            state.incidentType = incidentType;
        },

        setIncidentTypeLoadStatus(state, status) {
            state.incidentTypeLoadStatus = status;
        },

        setAddIncidentTypeLoadStatus(state, status) {
            state.addIncidentTypeLoadStatus = status;
        },

        setAddIncidentTypeResult(state, result) {
            state.addIncidentTypeResult = result;
        },

        setUpdateIncidentTypeLoadStatus(state, status) {
            state.updateIncidentTypeLoadStatus = status;
        },

        setUpdateIncidentTypeResult(state, result) {
            state.updateIncidentTypeResult = result;
        },

        setDeleteIncidentTypeLoadStatus(state, status) {
            state.deleteIncidentTypeLoadStatus = status;
        },

        setDeleteIncidentTypeResult(state, result) {
            state.deleteIncidentTypeResult = result;
        }
    },
    getters: {
        getIncidentTypesLoadStatus(state) {
            return state.incidentTypesLoadStatus;
        },

        getIncidentTypes(state) {
            return state.incidentTypes;
        },

        getIncidentType(state) {
            return state.incidentType;
        },

        getIncidentTypeLoadStatus(state) {
            return state.incidentTypeLoadStatus;
        },

        getAddIncidentTypeLoadStatus(state) {
            return state.addIncidentTypeLoadStatus;
        },

        getAddIncidentTypeResult(state) {
            return state.addIncidentTypeResult;
        },

        getUpdateIncidentTypeLoadStatus(state) {
            return state.updateIncidentTypeLoadStatus;
        },

        getUpdateIncidentTypeResult(state) {
            return state.updateIncidentTypeResult;
        },

        getDeleteIncidentTypeLoadStatus(state) {
            return state.deleteIncidentTypeLoadStatus;
        },

        getDeleteIncidentTypeResult(state) {
            return state.deleteIncidentTypeResult;
        }
    }
};