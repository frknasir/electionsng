/*
|-------------------------------------------------------------------------------
| VUEX modules/incident.js
|-------------------------------------------------------------------------------
| The Vuex data store for the incident
*/

import LiveUpdateAPI from '../api/liveUpdate.js';
import { CONFIG } from '../config.js';

export const liveUpdate = {
    state: {
        liveUpdates: [],
        liveUpdatesLoadStatus: CONFIG.STATUSES.idle,
        liveUpdate: {},
        liveUpdateLoadStatus: CONFIG.STATUSES.idle,
        addLiveUpdateLoadStatus: CONFIG.STATUSES.idle,
        updateLiveUpdateLoadStatus: CONFIG.STATUSES.idle,
        deleteLiveUpdateLoadStatus: CONFIG.STATUSES.idle
    },
    actions: {
        getElectionLiveUpdates({commit}, data) {
            commit('setLiveUpdatesLoadStatus', CONFIG.STATUSES.loading);

            LiveUpdateAPI.getElectionLiveUpdates(
                data.id
            ).then(function(response) {
                commit('setLiveUpdatesLoadStatus', CONFIG.STATUSES.completed_with_success);
                commit('setLiveUpdates', response.data);
            }).catch(function() {
                commit('setLiveUpdatesLoadStatus', CONFIG.STATUSES.completed_with_failure);
                commit('setLiveUpdates', []);
            });
        },

        getStateLiveUpdates({commit}, data) {
            commit('setLiveUpdatesLoadStatus', CONFIG.STATUSES.loading);

            LiveUpdateAPI.getStateLiveUpdates(
                data.electionId,
                data.stateId
            ).then(function(response) {
                commit('setLiveUpdatesLoadStatus', CONFIG.STATUSES.completed_with_success);
                commit('setLiveUpdates', response.data);
            }).catch(function() {
                commit('setLiveUpdatesLoadStatus', CONFIG.STATUSES.completed_with_failure);
                commit('setLiveUpdates', []);
            });
        },

        getLocalGovernmentLiveUpdates({commit}, data) {
            commit('setLiveUpdatesLoadStatus', CONFIG.STATUSES.loading);

            LiveUpdateAPI.getLocalGovernmentLiveUpdates(
                data.electionId,
                data.localGovernmentId
            ).then(function(response) {
                commit('setLiveUpdatesLoadStatus', CONFIG.STATUSES.completed_with_success);
                commit('setLiveUpdates', response.data);
            }).catch(function() {
                commit('setLiveUpdatesLoadStatus', CONFIG.STATUSES.completed_with_failure);
                commit('setLiveUpdates', []);
            });
        },

        getRegistrationAreaLiveUpdates({commit}, data) {
            commit('setLiveUpdatesLoadStatus', CONFIG.STATUSES.loading);

            LiveUpdateAPI.getRegistrationAreaLiveUpdates(
                data.electionId,
                data.registrationAreaId
            ).then(function(response) {
                commit('setLiveUpdatesLoadStatus', CONFIG.STATUSES.completed_with_success);
                commit('setLiveUpdates', response.data);
            }).catch(function() {
                commit('setLiveUpdatesLoadStatus', CONFIG.STATUSES.completed_with_failure);
                commit('setLiveUpdates', []);
            });
        },

        getPollingUnitLiveUpdates({commit}, data) {
            commit('setLiveUpdatesLoadStatus', CONFIG.STATUSES.loading);

            LiveUpdateAPI.getPollingUnitLiveUpdates(
                data.electionId,
                data.pollingUnitId
            ).then(function(response) {
                commit('setLiveUpdatesLoadStatus', CONFIG.STATUSES.completed_with_success);
                commit('setLiveUpdates', response.data);
            }).catch(function() {
                commit('setLiveUpdatesLoadStatus', CONFIG.STATUSES.completed_with_failure);
                commit('setLiveUpdates', []);
            });
        },

        addLiveUpdate({commit, state, dispatch}, data) {
            commit('setAddLiveUpdateLoadStatus', CONFIG.STATUSES.loading);

            LiveUpdateAPI.addLiveUpdate(
                data.title,
                data.description,
                data.election_id,
                data.location_id,
                data.location_type,
                data.added_by,
                data.updated_by
            ).then(function(response) {
                commit('setAddLiveUpdateLoadStatus', CONFIG.STATUSES.completed_with_success);
            }).catch(function() {
                commit('setAddLiveUpdateLoadStatus', CONFIG.STATUSES.completed_with_failure);
            });
        },

        updateLiveUpdate({commit, state, dispatch}, data) {
            commit('setUpdateLiveUpdateLoadStatus', CONFIG.STATUSES.loading);

            LiveUpdateAPI.updateLiveUpdate(
                data.id,
                data.title,
                data.description,
                data.updated_by
            ).then(function(response) {
                commit('setUpdateLiveUpdateLoadStatus', CONFIG.STATUSES.completed_with_success);
            }).catch(function() {
                commit('setUpdateLiveUpdateLoadStatus', CONFIG.STATUSES.completed_with_failure);
            });
        },

        deleteLiveUpdate({commit, state, dispatch}, data) {
            commit('setDeleteLiveUpdateLoadStatus', CONFIG.STATUSES.loading);

            LiveUpdateAPI.deleteLiveUpdate(
                data.id
            ).then(function(response) {
                commit('setDeleteLiveUpdateLoadStatus', CONFIG.STATUSES.completed_with_success);
            }).catch(function() {
                commit('setDeleteLiveUpdateLoadStatus', CONFIG.STATUSES.completed_with_failure);
            });
        }
    },
    mutations: {
        setLiveUpdatesLoadStatus(state, status) {
            state.liveUpdatesLoadStatus = status;
        },

        setLiveUpdates(state, incidents) {
            state.liveUpdates = incidents;
        },

        setLiveUpdateLoadStatus(state, status) {
            state.liveUpdateLoadStatus = status;
        },

        setLiveUpdate(state, incident) {
            state.liveUpdate = incident;
        }, 

        setAddLiveUpdateLoadStatus(state, status) {
            state.addLiveUpdateLoadStatus = status;
        },

        setUpdateLiveUpdateLoadStatus(state, status) {
            state.updateLiveUpdateLoadStatus = status;
        },

        setDeleteLiveUpdateLoadStatus(state, status) {
            state.deleteLiveUpdateLoadStatus = status;
        }
    },
    getters: {
        getLiveUpdatesLoadStatus(state) {
            return state.liveUpdatesLoadStatus;
        },

        getLiveUpdates(state) {
            return state.liveUpdates;
        },

        getLiveUpdateLoadStatus(state) {
            return state.liveUpdateLoadStatus;
        },

        getLiveUpdate(state) {
            return state.liveUpdate;
        }, 

        getAddLiveUpdateLoadStatus(state) {
            return state.addLiveUpdateLoadStatus;
        },

        getUpdateLiveUpdateLoadStatus(state) {
            return state.updateLiveUpdateLoadStatus;
        },

        getDeleteLiveUpdateLoadStatus(state) {
            return state.deleteLiveUpdateLoadStatus;
        }
    }
};