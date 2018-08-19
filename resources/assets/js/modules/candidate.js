/*
|-------------------------------------------------------------------------------
| VUEX modules/candidate.js
|-------------------------------------------------------------------------------
| The Vuex data store for the candidates
*/

import CandidateAPI from '../api/candidate.js';
import { CONFIG } from '../config.js';

export const candidate = {
    state: {
        candidates: [],
        candidatesLoadStatus: CONFIG.STATUSES.idle,
        candidate: {},
        candidateLoadStatus: CONFIG.STATUSES.idle,
        addCandidateLoadStatus: CONFIG.STATUSES.idle,
        updateCandidateLoadStatus: CONFIG.STATUSES.idle,
        deleteCandidateLoadStatus: CONFIG.STATUSES.idle
    },
    actions: {
        getCandidates({commit, state, dispatch}, data) {
            commit('setCandidatesLoadStatus', CONFIG.STATUSES.loading);

            CandidateAPI.getElectionCandidates(
                data.id
            ).then(function(response) {
                commit('setCandidatesLoadStatus', CONFIG.STATUSES.complete_with_success);
                commit('setCandidates', response.data);
            }).catch(function(){
                commit('setCandidatesLoadStatus', CONFIG.STATUSES.complete_with_failure);
                commit('setCandidate', []);
            });
        },

        getCandidate({commit, state, dispatch}, data) {
            commit('setCandidateLoadStatus', CONFIG.STATUSES.loading);

            CandidateAPI.getPoliticalPartyCandidate(
                data.electionId,
                data.partyId
            ).then(function(response) {
                commit('setCandidateLoadStatus', CONFIG.STATUSES.complete_with_success);
                commit('setCandidate', response.data);
            }).catch(function() {
                commit('setCandidateLoadStatus', CONFIG.STATUSES.complete_with_failure);
                commit('setCandidate', {});
            });
        },

        addCandidate({commit, state, dispatch}, data) {
            commit('setAddCandidateLoadStatus', CONFIG.STATUSES.loading);

            CandidateAPI.addCandidate(
                data.political_party_id,
                data.election_id,
                data.aspirant,
                data.deputy,
                data.bio,
                data.added_by,
                data.updated_by
            ).then(function(response) {
                commit('setAddCandidateLoadStatus', CONFIG.STATUSES.complete_with_success);
            }).catch(function() {
                commit('setAddCandidateLoadStatus', CONFIG.STATUSES.complete_with_failure);
            });
        },

        updateCandidate({commit, state, dispatch}, data) {
            commit('setUpdateCandidateLoadStatus', CONFIG.STATUSES.loading);

            CandidateAPI.updateCandidate(
                data.id,
                data.aspirant,
                data.deputy,
                data.bio,
                data.updated_by
            ).then(function(response) {
                commit('setUpdateCandidateLoadStatus', CONFIG.STATUSES.complete_with_success);
            }).catch(function() {
                commit('setUpdateCandidateLoadStatus', CONFIG.STATUSES.complete_with_failure);
            });
        },

        deleteCandidate({commit, state, dispatch}, data) {
            commit('setDeleteCandidateLoadStatus', CONFIG.STATUSES.loading);

            CandidateAPI.deleteCandidate(
                data.id
            ).then(function(response){
                commit('setDeleteCandidateLoadStatus', CONFIG.STATUSES.complete_with_success);
            }).catch(function() {
                commit('setDeleteCandidateLoadStatus', CONFIG.STATUSES.complete_with_failure);
            });
        }
    },
    mutations: {
        setCandidatesLoadStatus(state, status) {
            state.candidatesLoadStatus = status;
        },

        setCandidates(state, candidates) {
            state.candidates = candidates;
        },

        setCandidateLoadStatus(state, status) {
            state.candidateLoadStatus = status;
        },

        setCandidate(state, candidate) {
            state.candidate = candidate;
        },

        setAddCandidateLoadStatus(state, status) {
            state.addCandidateLoadStatus = status;
        },

        setUpdateCandidateLoadStatus(state, status) {
            state.updateCandidateLoadStatus = status;
        },

        setDeleteCandidateLoadStatus(state, status) {
            state.deleteCandidateLoadStatus = status;
        }
    }, 
    getters: {
        getCandidatesLoadStatus(state) {
            return state.candidatesLoadStatus;
        },

        getCandidates(state) {
            return state.candidates;
        },

        getCandidateLoadStatus(state) {
            return state.candidateLoadStatus;
        },

        getCandidate(state) {
            return state.candidate;
        },

        getAddCandidateLoadStatus(state) {
            return state.addCandidateLoadStatus;
        },

        getUpdateCandidateLoadStatus(state) {
            return state.updateCandidateLoadStatus;
        },

        getDeleteCandidateLoadStatus(state) {
            return state.deleteCandidateLoadStatus;
        }
    }
};