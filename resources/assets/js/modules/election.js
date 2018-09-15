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
        elPagination: {},
        election: {},
        electionLoadStatus: 0,
        addElectionLoadStatus: 0,
        addElectionResult: {
            success: 0
        },
        updateElectionLoadStatus: 0,
        updateElectionResult: {},
        deleteElectionLoadStatus: 0,
        deleteElectionResult: {}
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
                    commit('setElections', response.data.data);
                    commit('setElectionsLoadStatus', 2);
                    commit('setElPagination', {
                        meta: response.data.meta,
                        links: response.data.links
                    });
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
                    commit('setElections', response.data.data);
                    commit('setElectionsLoadStatus', 2);
                    commit('setElPagination', {
                        meta: response.data.meta,
                        links: response.data.links
                    });
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
                    commit('setElections', response.data.data);
                    commit('setElectionsLoadStatus', 2);
                    commit('setElPagination', {
                        meta: response.data.meta,
                        links: response.data.links
                    });
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
                    commit('setElections', response.data.data);
                    commit('setElectionsLoadStatus', 2);
                    commit('setElPagination', {
                        meta: response.data.meta,
                        links: response.data.links
                    });
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
                data.date
            ) 
                .then(function(response) {
                    commit('setAddElectionLoadStatus', 2);
                    commit('setAddElectionResult', response.data);
                })
                .catch(function() {
                    commit('setAddElectionLoadStatus', 3);
                    commit('setAddElectionResult', {
                        success: 0,
                        message: 'Something went wrong. Try again!'
                    });
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
                data.date
            ).then(function(response) {
                commit('setUpdateElectionLoadStatus', 2);
                commit('setUpdateElectionResult', response.data);
            }).catch(function() {
                commit('setUpdateElectionLoadStatus', 3);
                commit('setUpdateElectionResult', {
                    success: 0,
                    message: 'Something went wrong. Try again'
                });
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
                commit('setDeleteElectionResult', response.data);
            }).catch(function() {
                commit('setDeleteElectionLoadStatus', 3);
                commit('setDeleteElectionResult', {
                    success: 0,
                    message: 'Something went wrong. Try again'
                });
            });
        }
    },

    /*
        Defines the mutations used
    */
    mutations: {
        setElectionsLoadStatus( state, status ) {
            state.electionsLoadStatus = status;
        },

        setElections(state, elections) {
            state.elections = elections;
        },

        setElPagination(state, data) {
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
        
            state.elPagination = pagination;
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

        setAddElectionResult(state, result) {
            state.addElectionResult = result;
        },

        setUpdateElectionLoadStatus(state, status) {
            state.updateElectionLoadStatus = status;
        },

        setUpdateElectionResult(state, result) {
            state.updateElectionResult = result;
        },

        setDeleteElectionLoadStatus(state, status) {
            state.deleteElectionLoadStatus = status;
        },

        setDeleteElectionResult(state, result) {
            state.deleteElectionResult = result;
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

        getElPagination(state) {
            return state.elPagination
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

        getAddElectionResult(state) {
            return state.addElectionResult;
        },

        getUpdateElectionLoadStatus(state) {
            return state.updateElectionLoadStatus;
        },

        getUpdateElectionResult(state) {
            return state.updateElectionResult;
        },

        getDeleteElectionLoadStatus(state) {
            return state.deleteElectionLoadStatus;
        },

        getDeleteElectionResult(state) {
            return state.deleteElectionResult;
        }
    }
};