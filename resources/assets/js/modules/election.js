/*
|-------------------------------------------------------------------------------
| VUEX modules/election.js
|-------------------------------------------------------------------------------
| The Vuex data store for the elections
*/

import ElectionAPI from '../api/election.js';

export const election = {
    /*
        Defines the state being monitored for the module.
    */
    state: {
        elections: [],
        electionsLoadStatus: 0,
        election: {},
        electionLoadStatus: 0,
        addElectionLoadStatus: 0,
        updateElectionLoadStatus: 0,
        deleteElectionLoadStatus: 0,
    },

    /*
        Defines the actions used to retrieve the data.
    */
    actions: {
        /**
         * loads all elections from the API
         */
        getElections({commit}) {
            commit('setElectionsLoadStatus', 1);

            ElectionAPI.getElections()
                .then( function(response) {
                    commit('setElections', response.data);
                    commit('setElectionsLoadStatus', 2);
                })
                .catch( function() {
                    commit('setElections', []);
                    commit('setElectionsLoadStatus', 3);
                });
        },

        /**
         * Loads the ongoing elections from the API
         */
        getOngoing({commit}) {
            commit('setElectionsLoadStatus', 1);

            ElectionAPI.getOngoing()
                .then( function(response) {
                    commit('setElections', response.data);
                    commit('setElectionsLoadStatus', 2);
                })
                .catch( function() {
                    commit('setElections', []);
                    commit('setElectionsLoadStatus', 3);
                });
        },

        /**
         * Loads upcoming elections from the API
         */
        getUpcoming({commit}) {
            commit('setElectionsLoadStatus', 1);

            ElectionAPI.getUpcoming()
                .then( function(response) {
                    commit('setElections', response.data);
                    commit('setElectionsLoadStatus', 2);
                })
                .catch( function() {
                    commit('setElections', []);
                    commit('setElectionsLoadStatus', 3);
                });
        },

        /**
         * Loads archived elections from the API
         */
        getArchived({commit}) {
            commit('setElectionsLoadStatus', 1);

            ElectionAPI.getArchived()
                .then( function(response) {
                    commit('setElections', response.data);
                    commit('setElectionsLoadStatus', 2);
                })
                .catch( function() {
                    commit('setElections', []);
                    commit('setElectionsLoadStatus', 3);
                });
        },

        /**
         * load election from the API
         */
        getElection({commit}, data) {
            commit('setElectionLoadStatus', 1);

            ElectionAPI.getElection(data.id)
                .then(function(response) {
                    commit('setElection', response.data.data);
                    commit('setElectionLoadStatus', 2);
                })
                .catch(function() {
                    commit('setElection', {});
                    commit('setElectionLoadStatus', 3);
                });
        },

        /**
         * Add an election through the API
         */
        addElection({commit, state, dispatch}, data) {
            commit('setAddElectionLoadStatus', 1);

            ElectionAPI.addElection(
                data.title,
                data.election_type_id,
                data.state_id,
                data.registered_voters,
                data.accredited_voters,
                data.votes_cast,
                data.valid_votes,
                data.rejected_votes,
                data.date,
                data.added_by,
                data.updated_by
            ) 
                .then(function(response) {
                    commit('setAddElectionLoadStatus', 2);
                    dispatch('loadOngoing');
                    dispatch('loadUpcoming');
                    dispatch('loadArchived');
                })
                .catch(function() {
                    commit('setAddElectionLoadStatus', 3);
                });
        },

        /**
         * Update election through the API
         */
        updateElection({commit, state, dispatch}, data) {
            commit('setUpdateElectionLoadStatus', 1);

            ElectionAPI.updateElection(
                data.id,
                data.title,
                data.election_type_id,
                data.state_id,
                data.registered_voters,
                data.accredited_voters,
                data.votes_cast,
                data.valid_votes,
                data.rejected_votes,
                data.date,
                data.updated_by
            ).then(function(response) {
                commit('setUpdateElectionLoadStatus', 2);
                dispatch('loadOngoing');
                dispatch('loadUpcoming');
                dispatch('loadArchived');
            }).catch(function() {
                commit('setUpdateElectionLoadStatus', 3);
            });
        },

        /**
         * delete election through the API
         */
        deleteElection({commit, state, dispatch}, data) {
            commit('setDeleteElectionLoadStatus', 1);

            ElectionAPI.deleteElection(
                data.id
            ).then(function(response) {
                commit('setDeleteElectionLoadStatus', 2);
                dispatch('loadOngoing');
                dispatch('loadUpcoming');
                dispatch('loadArchived');
            }).catch(function() {
                commit('setDeleteElectionLoadStatus', 3);
            });
        }
    },

    /*
        Defines the mutations used
    */
    mutations: {
        setElectionsLoadStatus( state, status ) {
            state.setElectionsLoadStatus = status;
        },

        setElections(state, elections) {
            state.elections = elections;
        },

        setElectionLoadStatus(state, status) {
            state.electionLoadStatus = status;
        },

        setElection(state, election) {
            state.election = election;
        },

        setAddElectionLoadStatus(state, status) {
            state.addElectionLoadStatus = status;
        },

        setUpdateElectionLoadStatus(state, status) {
            state.updateElectionLoadStatus = status;
        },

        setDeleteElectionLoadStatus(state, status) {
            state.deleteElectionLoadStatus = status;
        }
    },

    /*
        Defines the getters used by the module
    */
    getters: {
        getElectionsLoadStatus(state) {
            return state.electionsLoadStatus;
        },

        getElections(state) {
            return state.elections;
        },

        getElectionLoadStatus(state) {
            return state.electionLoadStatus;
        },

        getElection(state) {
            return state.election;
        },

        getAddElectionLoadStatus(state) {
            return state.addElectionLoadStatus;
        },

        getUpdateElectionLoadStatus(state) {
            return state.updateElectionLoadStatus;
        },

        getDeleteElectionLoadStatus(state) {
            return state.deleteElectionLoadStatus;
        }
    }
};