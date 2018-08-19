/*
|-------------------------------------------------------------------------------
| VUEX modules/politicalParty.js
|-------------------------------------------------------------------------------
| The Vuex data store for the politicalParty
*/

import PoliticalPartyAPI from '../api/politicalParty.js';
import { CONFIG } from '../config.js';

export const politicalParty = {
    state: {
        politicalParties: [],
        politicalPartiesLoadStatus: CONFIG.STATUSES.idle,
        addPoliticalPartyLoadStatus: CONFIG.STATUSES.idle,
        updatePoliticalPartyLoadStatus: CONFIG.STATUSES.idle,
        deletePoliticalPartyLoadStatus: CONFIG.STATUSES.idle
    },
    actions: {
        getPoliticalParties({commit}) {
            commit('setPoliticalPartiesLoadStatus', CONFIG.STATUSES.loading);

            PoliticalPartyAPI.getPoliticalParties()
                .then(function(response) {
                    commit('setPoliticalPartiesLoadStatus', CONFIG.STATUSES.completed_with_success);
                    commit('setPoliticalParties', response.data);
                }).catch(function() {
                    commit('setPoliticalPartiesLoadStatus', CONFIG.STATUSES.completed_with_failure);
                    commit('setPoliticalParties', []);
                });
        },

        addPoliticalParty({commit, state, dispatch}, data) {
            commit('setAddPoliticalPartyLoadStatus', CONFIG.STATUSES.loading);

            PoliticalPartyAPI.AddPoliticalParty(
                data.initials,
                data.name,
                data.added_by,
                data.updated_by
            ).then(function(response) {
                commit('setAddPoliticalPartyLoadStatus', CONFIG.STATUSES.completed_with_success);
                dispatch('getPoliticalParties');
            }).catch(function() {
                commit('setAddPoliticalPartyLoadStatus', CONFIG.STATUSES.completed_with_failure);
            });
        },

        updatePoliticalParty({commit, state, dispatch}, data) {
            commit('setUpdatePoliticalPartyLoadStatus', CONFIG.STATUSES.loading);

            PoliticalPartyAPI.updatePoliticalParty(
                data.id,
                data.initials,
                data.name,
                data.updated_by
            ).then(function(response) {
                commit('setUpdatePoliticalPartyLoadStatus', CONFIG.STATUSES.completed_with_success);
                dispatch('getPoliticalParties');
            }).catch(function() {
                commit('setUpdatePoliticalPartyLoadStatus', CONFIG.STATUSES.completed_with_failure);
            });
        },

        deletePoliticalParty({commit, state, dispatch}, data) {
            commit('setDeletePoliticalPartyLoadStatus', CONFIG.STATUSES.loading);

            PoliticalPartyAPI.deletePoliticalParty(
                data.id
            ).then(function(response) {
                commit('setDeletePoliticalPartyLoadStatus', CONFIG.STATUSES.completed_with_success);
                dispatch('getPoliticalParties');
            }).catch(function() {
                commit('setDeletePoliticalPartyLoadStatus', CONFIG.STATUSES.completed_with_failure);
            });
        }
    },
    mutations: {
        setPoliticalPartiesLoadStatus(state, status) {
            state.politicalPartiesLoadStatus = status;
        },

        setPoliticalParties(state, politicalParties) {
            state.politicalParties = politicalParties;
        },

        setAddPoliticalPartyLoadStatus(state, status) {
            state.addPoliticalPartyLoadStatus = status;
        },

        setUpdatePoliticalPartyLoadStatus(state, status) {
            state.updatePoliticalPartyLoadStatus = status;
        },

        setDeletePoliticalPartyLoadStatus(state, status) {
            state.deletePoliticalPartyLoadStatus = status;
        }
    },
    getters: {
        getPoliticalPartiesLoadStatus(state) {
            return state.politicalPartiesLoadStatus;
        },

        getPoliticalParties(state) {
            return state.politicalParties;
        },

        getAddPoliticalPartyLoadStatus(state) {
            return state.addPoliticalPartyLoadStatus;
        },

        getUpdatePoliticalPartyLoadStatus(state) {
            return state.updatePoliticalPartyLoadStatus;
        },

        getDeletePoliticalPartyLoadStatus(state) {
            return state.deletePoliticalPartyLoadStatus;
        }
    }
};