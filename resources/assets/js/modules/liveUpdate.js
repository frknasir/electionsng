/*
|-------------------------------------------------------------------------------
| VUEX modules/incident.js
|-------------------------------------------------------------------------------
| The Vuex data store for the incident
*/

import LiveUpdateAPI from '../api/liveUpdate.js';

export const liveUpdate = {
    state: {
        liveUpdates: [],
        luPagination: {},
        liveUpdatesLoadStatus: 0,
        liveUpdate: {},
        liveUpdateLoadStatus: 0,
        addLiveUpdateLoadStatus: 0,
        updateLiveUpdateLoadStatus: 0,
        deleteLiveUpdateLoadStatus: 0
    },
    actions: {
        getElectionLiveUpdates({commit}, data) {
            commit('setLiveUpdatesLoadStatus', 1);

            LiveUpdateAPI.getElectionLiveUpdates(
                data.id,
                data.url
            ).then(function(response) {
                commit('setLiveUpdatesLoadStatus', 2);
                commit('setLiveUpdates', response.data.data);
                commit('setLUPagination', {
                    meta: response.data.meta,
                    links: response.data.links
                });
            }).catch(function() {
                commit('setLiveUpdatesLoadStatus', 3);
                commit('setLiveUpdates', []);
            });
        },

        getStateLiveUpdates({commit}, data) {
            commit('setLiveUpdatesLoadStatus', 1);

            LiveUpdateAPI.getStateLiveUpdates(
                data.electionId,
                data.stateId,
                data.url
            ).then(function(response) {
                commit('setLiveUpdatesLoadStatus', 2);
                commit('setLiveUpdates', response.data.data);
            }).catch(function() {
                commit('setLiveUpdatesLoadStatus', 3);
                commit('setLiveUpdates', []);
            });
        },

        getLocalGovernmentLiveUpdates({commit}, data) {
            commit('setLiveUpdatesLoadStatus', 1);

            LiveUpdateAPI.getLocalGovernmentLiveUpdates(
                data.electionId,
                data.localGovernmentId,
                data.url
            ).then(function(response) {
                commit('setLiveUpdatesLoadStatus', 2);
                commit('setLiveUpdates', response.data.data);
            }).catch(function() {
                commit('setLiveUpdatesLoadStatus', 3);
                commit('setLiveUpdates', []);
            });
        },

        getRegistrationAreaLiveUpdates({commit}, data) {
            commit('setLiveUpdatesLoadStatus', 1);

            LiveUpdateAPI.getRegistrationAreaLiveUpdates(
                data.electionId,
                data.registrationAreaId,
                data.url
            ).then(function(response) {
                commit('setLiveUpdatesLoadStatus', 2);
                commit('setLiveUpdates', response.data.data);
            }).catch(function() {
                commit('setLiveUpdatesLoadStatus', 3);
                commit('setLiveUpdates', []);
            });
        },

        getPollingUnitLiveUpdates({commit}, data) {
            commit('setLiveUpdatesLoadStatus', 1);

            LiveUpdateAPI.getPollingUnitLiveUpdates(
                data.electionId,
                data.pollingUnitId,
                data.url
            ).then(function(response) {
                commit('setLiveUpdatesLoadStatus', 2);
                commit('setLiveUpdates', response.data.data);
            }).catch(function() {
                commit('setLiveUpdatesLoadStatus', 3);
                commit('setLiveUpdates', []);
            });
        },

        filterUpdatesBy({commit}, data) {
            commit('setLiveUpdatesLoadStatus', 1);

            LiveUpdateAPI.filterUpdatesBy(
                data.electionId,
                data.locationType,
                data.url
            ).then(function(response) {
                commit('setLiveUpdatesLoadStatus', 2);
                commit('setLiveUpdates', response.data.data);
                commit('setLUPagination', {
                    meta: response.data.meta,
                    links: response.data.links
                });
            }).catch(function() {
                commit('setLiveUpdatesLoadStatus', 3);
                commit('setLiveUpdates', []);
            });
        },

        getLiveUpdate({commit}, data) {
            commit('setLiveUpdateLoadStatus', 1);

            LiveUpdateAPI.getLiveUpdate(
                data.id
            ).then(function(response) {
                commit('setLiveUpdateLoadStatus', 2);
                commit('setLiveUpdate', response.data.data);
            }).catch(function() {
                commit('setLiveUpdateLoadStatus', 3);
                commit('setLiveUpdate', {});
            });
        },

        addLiveUpdate({commit, state, dispatch}, data) {
            commit('setAddLiveUpdateLoadStatus', 1);

            LiveUpdateAPI.addLiveUpdate(
                data.title,
                data.description,
                data.election_id,
                data.location_id,
                data.location_type,
                data.added_by,
                data.updated_by
            ).then(function(response) {
                commit('setAddLiveUpdateLoadStatus', 2);
            }).catch(function() {
                commit('setAddLiveUpdateLoadStatus', 3);
            });
        },

        updateLiveUpdate({commit, state, dispatch}, data) {
            commit('setUpdateLiveUpdateLoadStatus', 1);

            LiveUpdateAPI.updateLiveUpdate(
                data.id,
                data.title,
                data.description,
                data.updated_by
            ).then(function(response) {
                commit('setUpdateLiveUpdateLoadStatus', 2);
            }).catch(function() {
                commit('setUpdateLiveUpdateLoadStatus', 3);
            });
        },

        deleteLiveUpdate({commit, state, dispatch}, data) {
            commit('setDeleteLiveUpdateLoadStatus', 1);

            LiveUpdateAPI.deleteLiveUpdate(
                data.id
            ).then(function(response) {
                commit('setDeleteLiveUpdateLoadStatus', 2);
            }).catch(function() {
                commit('setDeleteLiveUpdateLoadStatus', 3);
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

        setLUPagination(state, data) {
            let meta = data.meta;
            let links = data.links;

            let pagination = {
                current_page: meta.current_page,
                last_page: meta.last_page,
                to: meta.to,
                total: meta.total,
                next_page_url: links.next,
                prev_page_url: links.prev
            };
        
            state.luPagination = pagination;
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

        getLUPagination(state) {
            return state.luPagination;
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