/*
|-------------------------------------------------------------------------------
| VUEX modules/candidate.js
|-------------------------------------------------------------------------------
| The Vuex data store for the candidates
*/

import CandidateAPI from '../api/candidate.js';

export const candidate = {
    state: {
        candidates: [],
        pagination: {},
        candidatesLoadStatus: 0,
        candidate: {},
        candidateLoadStatus: 0,
        addCandidateLoadStatus: 0,
        addCandidateResult: {
            success: 0
        },
        updateCandidateLoadStatus: 0,
        updateCandidateResult: {},
        deleteCandidateLoadStatus: 0,
        deleteCandidateResult: {}
    },
    actions: {
        getCandidates({commit, state, dispatch}, data) {
            commit('setCandidatesLoadStatus', 1);

            CandidateAPI.getElectionCandidates(
                data.id,
                data.url
            ).then(function(response) {
                commit('setCandidatesLoadStatus', 2);
                commit('setCandidates', response.data.data);
                commit('setPagination', {
                    meta: response.data.meta,
                    links: response.data.links
                });
            }).catch(function() {
                commit('setCandidatesLoadStatus', 3);
                commit('setCandidate', []);
            });
        },

        getCandidate({commit, state, dispatch}, data) {
            commit('setCandidateLoadStatus', 1);

            CandidateAPI.getCandidate(
                data.id
            ).then(function(response) {
                commit('setCandidateLoadStatus', 2);
                commit('setCandidate', response.data.data);
            }).catch(function() {
                commit('setCandidateLoadStatus', 3);
                commit('setCandidate', {});
            });
        }, 

        addCandidate({commit, state, dispatch}, data) {
            commit('setAddCandidateLoadStatus', 1);

            CandidateAPI.addCandidate(
                data.political_party_id,
                data.election_id,
                data.aspirant,
                data.deputy,
                data.bio
            ).then(function(response) {
                commit('setAddCandidateLoadStatus', 2);
                commit('setAddCandidateResult', response.data);
            }).catch(function() {
                commit('setAddCandidateLoadStatus', 3);
                commit('setAddCandidateResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
            });
        },

        updateCandidate({commit, state, dispatch}, data) {
            commit('setUpdateCandidateLoadStatus', 1);

            CandidateAPI.updateCandidate(
                data.id,
                data.political_party_id,
                data.aspirant,
                data.deputy,
                data.bio
            ).then(function(response) {
                commit('setUpdateCandidateLoadStatus', 2);
                commit('setUpdateCandidateResult', response.data);
            }).catch(function() {
                commit('setUpdateCandidateLoadStatus', 3);
                commit('setUpdateCandidateResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
            });
        },

        deleteCandidate({commit, state, dispatch}, data) {
            commit('setDeleteCandidateLoadStatus', 1);
            CandidateAPI.deleteCandidate(
                data.id
            ).then(function(response){
                commit('setDeleteCandidateLoadStatus', 2);
                commit('setDeleteCandidateResult', response.data);
            }).catch(function() {
                commit('setDeleteCandidateLoadStatus', 3);
                commit('setDeleteCandidateResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
            });
        }
    },
    mutations: {
        setCandidatesLoadStatus(state, status) {
            state.candidatesLoadStatus = status;
        },

        setPagination(state, data) {
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
        
            state.pagination = pagination;
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

        setAddCandidateResult(state, result) {
            state.addCandidateResult = result;
        },

        setUpdateCandidateLoadStatus(state, status) {
            state.updateCandidateLoadStatus = status;
        },

        setUpdateCandidateResult(state, result) {
            state.updateCandidateResult = result;
        },

        setDeleteCandidateLoadStatus(state, status) {
            state.deleteCandidateLoadStatus = status;
        },

        setDeleteCandidateResult(state, result) {
            state.deleteCandidateResult = result;
        }
    }, 
    getters: {
        getCandidatesLoadStatus(state) {
            return state.candidatesLoadStatus;
        },

        getCandidates(state) {
            return state.candidates;
        },

        getPagination(state) {
            return state.pagination;
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

        getAddCandidateResult(state) {
            return state.addCandidateResult;
        },

        getUpdateCandidateLoadStatus(state) {
            return state.updateCandidateLoadStatus;
        },

        getUpdateCandidateResult(state) {
            return state.updateCandidateResult;
        },

        getDeleteCandidateLoadStatus(state) {
            return state.deleteCandidateLoadStatus;
        },

        getDeleteCandidateResult(state) {
            return state.deleteCandidateResult;
        }
    }
};