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
        politicalPartiesLoadStatus: 0,
        addPoliticalPartyLoadStatus: 0,
        updatePoliticalPartyLoadStatus: 0,
        deletePoliticalPartyLoadStatus: 0
    },
    actions: {
        getPoliticalParties({commit}) {
            commit('setPoliticalPartiesLoadStatus', 1);

            PoliticalPartyAPI.getPoliticalParties()
                .then(function(response) {
                    commit('setPoliticalPartiesLoadStatus', 2);
                    commit('setPoliticalParties', response.data);
                }).catch(function() {
                    commit('setPoliticalPartiesLoadStatus', 3);
                    commit('setPoliticalParties', []);
                });
        },

        addPoliticalParty({commit, state, dispatch}, data) {
            commit('setAddPoliticalPartyLoadStatus', 1);

            PoliticalPartyAPI.AddPoliticalParty(
                data.initials,
                data.name,
                data.added_by,
                data.updated_by
            ).then(function(response) {
                commit('setAddPoliticalPartyLoadStatus', 2);
                dispatch('getPoliticalParties');
            }).catch(function() {
                commit('setAddPoliticalPartyLoadStatus', 3);
            });
        },

        updatePoliticalParty({commit, state, dispatch}, data) {
            commit('setUpdatePoliticalPartyLoadStatus', 1);

            PoliticalPartyAPI.updatePoliticalParty(
                data.id,
                data.initials,
                data.name,
                data.updated_by
            ).then(function(response) {
                commit('setUpdatePoliticalPartyLoadStatus', 2);
                dispatch('getPoliticalParties');
            }).catch(function() {
                commit('setUpdatePoliticalPartyLoadStatus', 3);
            });
        },

        deletePoliticalParty({commit, state, dispatch}, data) {
            commit('setDeletePoliticalPartyLoadStatus', 1);

            PoliticalPartyAPI.deletePoliticalParty(
                data.id
            ).then(function(response) {
                commit('setDeletePoliticalPartyLoadStatus', 2);
                dispatch('getPoliticalParties');
            }).catch(function() {
                commit('setDeletePoliticalPartyLoadStatus', 3);
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