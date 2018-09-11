/*
|-------------------------------------------------------------------------------
| VUEX modules/liveUpdate.js
|-------------------------------------------------------------------------------
| The Vuex data store for the liveUpdate
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
        addLiveUpdateResult: {
            success: 0
        },
        updateLiveUpdateLoadStatus: 0,
        updateLiveUpdateResult: {},
        deleteLiveUpdateLoadStatus: 0,
        deleteLiveUpdateResult: {}
    },
    actions: {
        getElectionLiveUpdates({commit, state}, data) {
            commit('setLiveUpdatesLoadStatus', 1);

            if(state.liveUpdates.length > 0) {
                state.liveUpdates.splice(0, state.liveUpdates.length);
            }

            LiveUpdateAPI.getElectionLiveUpdates(
                data.id,
                data.url,
                data.limit
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

        getStateLiveUpdates({commit, state}, data) {
            commit('setLiveUpdatesLoadStatus', 1);

            if(state.liveUpdates.length > 0) {
                state.liveUpdates.splice(0, state.liveUpdates.length);
            }

            LiveUpdateAPI.getStateLiveUpdates(
                data.electionId,
                data.stateId,
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

        getLocalGovernmentLiveUpdates({commit, state}, data) {
            commit('setLiveUpdatesLoadStatus', 1);

            if(state.liveUpdates.length > 0) {
                state.liveUpdates.splice(0, state.liveUpdates.length);
            }

            LiveUpdateAPI.getLocalGovernmentLiveUpdates(
                data.electionId,
                data.localGovernmentId,
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

        getRegistrationAreaLiveUpdates({commit, state}, data) {
            commit('setLiveUpdatesLoadStatus', 1);

            if(state.liveUpdates.length > 0) {
                state.liveUpdates.splice(0, state.liveUpdates.length);
            }

            LiveUpdateAPI.getRegistrationAreaLiveUpdates(
                data.electionId,
                data.registrationAreaId,
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

        getPollingUnitLiveUpdates({commit, state}, data) {
            commit('setLiveUpdatesLoadStatus', 1);

            if(state.liveUpdates.length > 0) {
                state.liveUpdates.splice(0, state.liveUpdates.length);
            }

            LiveUpdateAPI.getPollingUnitLiveUpdates(
                data.electionId,
                data.pollingUnitId,
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

        filterUpdatesBy({commit, state}, data) {
            commit('setLiveUpdatesLoadStatus', 1);

            if(state.liveUpdates.length > 0) {
                state.liveUpdates.splice(0, state.liveUpdates.length);
            }

            LiveUpdateAPI.filterUpdatesBy(
                data.electionId,
                data.locationType,
                data.url,
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
                data.location_type
            ).then(function(response) {
                commit('setAddLiveUpdateLoadStatus', 2);
                commit('setAddLiveUpdateResult', response.data);
            }).catch(function() {
                commit('setAddLiveUpdateLoadStatus', 3);
                commit('setAddLiveUpdateResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
            });
        },

        updateLiveUpdate({commit, state, dispatch}, data) {
            commit('setUpdateLiveUpdateLoadStatus', 1);

            LiveUpdateAPI.updateLiveUpdate(
                data.id,
                data.title,
                data.description
            ).then(function(response) {
                commit('setUpdateLiveUpdateLoadStatus', 2);
                commit('setUpdateLiveUpdateResult', response.data);
            }).catch(function() {
                commit('setUpdateLiveUpdateLoadStatus', 3);
                commit('setUpdateLiveUpdateResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
            });
        },

        deleteLiveUpdate({commit, state, dispatch}, data) {
            commit('setDeleteLiveUpdateLoadStatus', 1);

            LiveUpdateAPI.deleteLiveUpdate(
                data.id
            ).then(function(response) {
                commit('setDeleteLiveUpdateLoadStatus', 2);
                commit('setDeleteLiveUpdateResult', response.data);
            }).catch(function() {
                commit('setDeleteLiveUpdateLoadStatus', 3);
                commit('setDeleteLiveUpdateResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
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

        setLiveUpdate(state, liveUpdate) {
            state.liveUpdate = liveUpdate;
        }, 

        setAddLiveUpdateLoadStatus(state, status) {
            state.addLiveUpdateLoadStatus = status;
        },

        setAddLiveUpdateResult(state, result) {
            state.addLiveUpdateResult = result;
        },

        setUpdateLiveUpdateLoadStatus(state, status) {
            state.updateLiveUpdateLoadStatus = status;
        },

        setUpdateLiveUpdateResult(state, result) {
            state.updateLiveUpdateResult = result;
        },

        setDeleteLiveUpdateLoadStatus(state, status) {
            state.deleteLiveUpdateLoadStatus = status;
        },

        setDeleteLiveUpdateResult(state, result) {
            state.deleteLiveUpdateResult = result;
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

        getAddLiveUpdateResult(state) {
            return state.addLiveUpdateResult;
        },

        getUpdateLiveUpdateLoadStatus(state) {
            return state.updateLiveUpdateLoadStatus;
        },

        getUpdateLiveUpdateResult(state) {
            return state.updateLiveUpdateResult;
        },

        getDeleteLiveUpdateLoadStatus(state) {
            return state.deleteLiveUpdateLoadStatus;
        },

        getDeleteLiveUpdateResult(state) {
            return state.deleteLiveUpdateResult;
        }
    }
};