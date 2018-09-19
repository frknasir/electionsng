/*
|-------------------------------------------------------------------------------
| VUEX modules/politicalParty.js
|-------------------------------------------------------------------------------
| The Vuex data store for the politicalParty
*/

import PoliticalPartyAPI from '../api/politicalParty.js';

export const politicalParty = { 
    state: {
        politicalParties: [],
        politicalPartiesLoadStatus: 0,
        politicalParty: {},
        politicalPartyLoadStatus: 0,
        addPoliticalPartyLoadStatus: 0,
        addPoliticalPartyResult: {},
        updatePoliticalPartyLoadStatus: 0,
        updatePoliticalPartyResult: {},
        deletePoliticalPartyLoadStatus: 0,
        deletePoliticalPartyResult: {}
    },
    actions: {
        getPoliticalParties({commit}) {
            commit('setPoliticalPartiesLoadStatus', 1);

            PoliticalPartyAPI.getPoliticalParties()
                .then(function(response) {
                    commit('setPoliticalPartiesLoadStatus', 2);
                    commit('setPoliticalParties', response.data.data);
                }).catch(function() {
                    commit('setPoliticalPartiesLoadStatus', 3);
                    commit('setPoliticalParties', []);
                });
        },

        getPoliticalParty({commit}, data) {
            commit('setPoliticalPartyLoadStatus', 1);

            PoliticalPartyAPI.getPoliticalParty(
                data.id
            ).then(function(response) {
                commit('setPoliticalPartyLoadStatus', 2);
                commit('setPoliticalParty', response.data.data);
            }).catch(function() {
                commit('setPoliticalPartyLoadStatus', 3);
                commit('setPoliticalParty', {});
            });
        },

        addPoliticalParty({commit, state, dispatch}, data) {
            commit('setAddPoliticalPartyLoadStatus', 1);

            PoliticalPartyAPI.addPoliticalParty(
                data.initials,
                data.name
            ).then(function(response) {
                commit('setAddPoliticalPartyLoadStatus', 2);
                commit('setAddPoliticalPartyResult', response.data);
            }).catch(function() {
                commit('setAddPoliticalPartyLoadStatus', 3);
                commit('setAddPoliticalPartyResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
            });
        },

        updatePoliticalParty({commit, state, dispatch}, data) {
            commit('setUpdatePoliticalPartyLoadStatus', 1);

            PoliticalPartyAPI.updatePoliticalParty(
                data.id,
                data.initials,
                data.name
            ).then(function(response) {
                commit('setUpdatePoliticalPartyLoadStatus', 2);
                commit('setUpdatePoliticalPartyResult', response.data);
            }).catch(function() {
                commit('setUpdatePoliticalPartyLoadStatus', 3);
                commit('setUpdatePoliticalPartyResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
            });
        },

        deletePoliticalParty({commit, state, dispatch}, data) {
            commit('setDeletePoliticalPartyLoadStatus', 1);

            PoliticalPartyAPI.deletePoliticalParty(
                data.id
            ).then(function(response) {
                commit('setDeletePoliticalPartyLoadStatus', 2);
                commit('setDeletePoliticalPartyResult', response.data);
            }).catch(function() {
                commit('setDeletePoliticalPartyLoadStatus', 3);
                commit('setDeletePoliticalPartyResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
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

        setPoliticalParty(state, politicalParty) {
            state.politicalParty = politicalParty;
        },

        setPoliticalPartyLoadStatus(state, status) {
            state.politicalPartyLoadStatus = status;
        },

        setAddPoliticalPartyLoadStatus(state, status) {
            state.addPoliticalPartyLoadStatus = status;
        },

        setAddPoliticalPartyResult(state, result) {
            state.addPoliticalPartyResult = result;
        },

        setUpdatePoliticalPartyLoadStatus(state, status) {
            state.updatePoliticalPartyLoadStatus = status;
        },

        setUpdatePoliticalPartyResult(state, result) {
            state.updatePoliticalPartyResult = result;
        },

        setDeletePoliticalPartyLoadStatus(state, status) {
            state.deletePoliticalPartyLoadStatus = status;
        },

        setDeletePoliticalPartyResult(state, result) {
            state.deletePoliticalPartyResult = result;
        }
    },
    getters: {
        getPoliticalPartiesLoadStatus(state) {
            return state.politicalPartiesLoadStatus;
        },

        getPoliticalParties(state) {
            return state.politicalParties;
        },

        getPoliticalParty(state) {
            return state.politicalParty;
        },

        getPoliticalPartyLoadStatus(state) {
            return state.politicalPartyLoadStatus;
        },

        getAddPoliticalPartyLoadStatus(state) {
            return state.addPoliticalPartyLoadStatus;
        },

        getAddPoliticalPartyResult(state) {
            return state.addPoliticalPartyResult;
        },

        getUpdatePoliticalPartyLoadStatus(state) {
            return state.updatePoliticalPartyLoadStatus;
        },

        getUpdatePoliticalPartyResult(state) {
            return state.updatePoliticalPartyResult;
        },

        getDeletePoliticalPartyLoadStatus(state) {
            return state.deletePoliticalPartyLoadStatus;
        },

        getDeletePoliticalPartyResult(state) {
            return state.deletePoliticalPartyResult;
        }
    }
};