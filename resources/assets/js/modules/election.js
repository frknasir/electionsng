/*
|-------------------------------------------------------------------------------
| VUEX modules/election.js
|-------------------------------------------------------------------------------
| The Vuex data store for the elections
*/

import ElectionAPI from '../api/election.js';
import { CONFIG } from '../config.js';

export const election = {
    /*
        Defines the state being monitored for the module.
    */
    state: {
        elections: [],
        electionsLoadStatus: CONFIG.STATUSES.idle,
        election: {},
        electionLoadStatus: CONFIG.STATUSES.idle,
        addElectionLoadStatus: CONFIG.STATUSES.idle,
        updateElectionLoadStatus: CONFIG.STATUSES.idle,
        deleteElectionLoadStatus: CONFIG.STATUSES.idle,
    },

    /*
        Defines the actions used to retrieve the data.
    */
    actions: {
        /**
         * loads all elections from the API
         */
        getElections({commit}) {
            commit('setElectionsLoadStatus', CONFIG.STATUSES.loading);

            ElectionAPI.getElections()
                .then( function(response) {
                    commit('setElections', response.data);
                    commit('setElectionsLoadStatus', CONFIG.STATUSES.completed_with_success);
                })
                .catch( function() {
                    commit('setElections', []);
                    commit('setElectionsLoadStatus', CONFIG.STATUSES.completed_with_failure);
                });
        },

        /**
         * Loads the ongoing elections from the API
         */
        getOngoing({commit}) {
            commit('setElectionsLoadStatus', CONFIG.STATUSES.loading);

            ElectionAPI.getOngoing()
                .then( function(response) {
                    commit('setElections', response.data);
                    commit('setElectionsLoadStatus', CONFIG.STATUSES.completed_with_success);
                })
                .catch( function() {
                    commit('setElections', []);
                    commit('setElectionsLoadStatus', CONFIG.STATUSES.completed_with_failure);
                });
        },

        /**
         * Loads upcoming elections from the API
         */
        getUpcoming({commit}) {
            commit('setElectionsLoadStatus', CONFIG.STATUSES.loading);

            ElectionAPI.getUpcoming()
                .then( function(response) {
                    commit('setElections', response.data);
                    commit('setElectionsLoadStatus', CONFIG.STATUSES.completed_with_success);
                })
                .catch( function() {
                    commit('setElections', []);
                    commit('setElectionsLoadStatus', CONFIG.STATUSES.completed_with_failure);
                });
        },

        /**
         * Loads archived elections from the API
         */
        getArchived({commit}) {
            commit('setElectionsLoadStatus', CONFIG.STATUSES.loading);

            ElectionAPI.getArchived()
                .then( function(response) {
                    commit('setElections', response.data);
                    commit('setElectionsLoadStatus', CONFIG.STATUSES.completed_with_success);
                })
                .catch( function() {
                    commit('setElections', []);
                    commit('setElectionsLoadStatus', CONFIG.STATUSES.completed_with_failure);
                });
        },

        /**
         * load election from the API
         */
        getElection({commit}, data) {
            commit('setElectionLoadStatus', CONFIG.STATUSES.loading);

            ElectionAPI.getElection(data.id)
                .then(function(response) {
                    commit('setElection', response.data);
                    commit('setElectionLoadStatus', CONFIG.STATUSES.completed_with_success);
                })
                .catch(function() {
                    commit('setElection', []);
                    commit('setElectionLoadStatus', CONFIG.STATUSES.completed_with_failure);
                });
        },

        /**
         * Add an election through the API
         */
        addElection({commit, state, dispatch}, data) {
            commit('setAddElectionLoadStatus', CONFIG.STATUSES.loading);

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
                    commit('setAddElectionLoadStatus', CONFIG.STATUSES.completed_with_success);
                    dispatch('loadOngoing');
                    dispatch('loadUpcoming');
                    dispatch('loadArchived');
                })
                .catch(function() {
                    commit('setAddElectionLoadStatus', CONFIG.STATUSES.completed_with_failure);
                });
        },

        /**
         * Update election through the API
         */
        updateElection({commit, state, dispatch}, data) {
            commit('setUpdateElectionLoadStatus', CONFIG.STATUSES.loading);

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
                commit('setUpdateElectionLoadStatus', CONFIG.STATUSES.completed_with_success);
                dispatch('loadOngoing');
                dispatch('loadUpcoming');
                dispatch('loadArchived');
            }).catch(function() {
                commit('setUpdateElectionLoadStatus', CONFIG.STATUSES.completed_with_failure);
            });
        },

        /**
         * delete election through the API
         */
        deleteElection({commit, state, dispatch}, data) {
            commit('setDeleteElectionLoadStatus', CONFIG.STATUSES.loading);

            ElectionAPI.deleteElection(
                data.id
            ).then(function(response) {
                commit('setDeleteElectionLoadStatus', CONFIG.STATUSES.completed_with_success);
                dispatch('loadOngoing');
                dispatch('loadUpcoming');
                dispatch('loadArchived');
            }).catch(function() {
                commit('setDeleteElectionLoadStatus', CONFIG.STATUSES.completed_with_failure);
            });
        }
    },

    /*
        Defines the mutations used
    */
    mutations: {
        setElectionsLoadStatus( state, status ) {
            state.ongoingLoadStatus = status;
        },

        setElections(state, ongoing) {
            state.ongoing = ongoing;
        },

        setElectionsLoadStatus(state, status) {
            state.setElectionsLoadStatus = status;
        },

        setElections(state, upcoming) {
            state.upcoming = upcoming;
        },

        setElectionsLoadStatus(state, status) {
            state.archivedLoadStatus = status;
        },

        setElections(state, archived) {
            state.archived = archived;
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
        getOngoingLoadStatus(state) {
            return state.ongoingLoadStatus;
        },

        getOngoing(state) {
            return state.ongoing;
        },

        getUpcomingLoadStatus(state) {
            return state.upcomingLoadStatus;
        },

        getUpcoming(state) {
            return state.upcoming;
        },

        getArchivedLoadStatus(state) {
            return state.archivedLoadStatus;
        },

        getArchived(state) {
            return state.archived;
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