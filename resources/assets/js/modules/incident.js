/*
|-------------------------------------------------------------------------------
| VUEX modules/incident.js
|-------------------------------------------------------------------------------
| The Vuex data store for the incident
*/

import IncidentAPI from '../api/incident.js';
import { CONFIG } from '../config.js';

export const incident = {
    state: {
        incidents: [],
        incidentsLoadStatus: CONFIG.STATUSES.idle,
        incident: {},
        incidentLoadStatus: CONFIG.STATUSES.idle,
        addIncidentLoadStatus: CONFIG.STATUSES.idle,
        updateIncidentLoadStatus: CONFIG.STATUSES.idle,
        deleteIncidentLoadStatus: CONFIG.STATUSES.idle
    },
    actions: {
        getElectionIncidents({commit}, data) {
            commit('setIncidentsLoadStatus', CONFIG.STATUSES.loading);

            IncidentAPI.getElectionIncidents(
                data.id
            ).then(function(response) {
                commit('setIncidentsLoadStatus', CONFIG.STATUSES.completed_with_success);
                commit('setIncidents', response.data);
            }).catch(function() {
                commit('setIncidentsLoadStatus', CONFIG.STATUSES.completed_with_failure);
                commit('setIncidents', []);
            });
        },

        getStateIncidents({commit}, data) {
            commit('setIncidentsLoadStatus', CONFIG.STATUSES.loading);

            IncidentAPI.getStateIncidents(
                data.electionId,
                data.stateId
            ).then(function(response) {
                commit('setIncidentsLoadStatus', CONFIG.STATUSES.completed_with_success);
                commit('setIncidents', response.data);
            }).catch(function() {
                commit('setIncidentsLoadStatus', CONFIG.STATUSES.completed_with_failure);
                commit('setIncidents', []);
            });
        },

        getLocalGovernmentIncidents({commit}, data) {
            commit('setIncidentsLoadStatus', CONFIG.STATUSES.loading);

            IncidentAPI.getLocalGovernmentIncidents(
                data.electionId,
                data.localGovernmentId
            ).then(function(response) {
                commit('setIncidentsLoadStatus', CONFIG.STATUSES.completed_with_success);
                commit('setIncidents', response.data);
            }).catch(function() {
                commit('setIncidentsLoadStatus', CONFIG.STATUSES.completed_with_failure);
                commit('setIncidents', []);
            });
        },

        getRegistrationAreaIncidents({commit}, data) {
            commit('setIncidentsLoadStatus', CONFIG.STATUSES.loading);

            IncidentAPI.getRegistrationAreaIncidents(
                data.electionId,
                data.registrationAreaId
            ).then(function(response) {
                commit('setIncidentsLoadStatus', CONFIG.STATUSES.completed_with_success);
                commit('setIncidents', response.data);
            }).catch(function() {
                commit('setIncidentsLoadStatus', CONFIG.STATUSES.completed_with_failure);
                commit('setIncidents', []);
            });
        },

        getPollingUnitIncidents({commit}, data) {
            commit('setIncidentsLoadStatus', CONFIG.STATUSES.loading);

            IncidentAPI.getPollingUnitIncidents(
                data.electionId,
                data.pollingUnitId
            ).then(function(response) {
                commit('setIncidentsLoadStatus', CONFIG.STATUSES.completed_with_success);
                commit('setIncidents', response.data);
            }).catch(function() {
                commit('setIncidentsLoadStatus', CONFIG.STATUSES.completed_with_failure);
                commit('setIncidents', []);
            });
        },

        addIncident({commit, state, dispatch}, data) {
            commit('setAddIncidentLoadStatus', CONFIG.STATUSES.loading);

            IncidentAPI.addIncident(
                data.title,
                data.description,
                data.incident_type_id,
                data.election_id,
                data.location_id,
                data.location_type,
                data.added_by,
                data.updated_by
            ).then(function(response) {
                commit('setAddIncidentLoadStatus', CONFIG.STATUSES.completed_with_success);
            }).catch(function() {
                commit('setAddIncidentLoadStatus', CONFIG.STATUSES.completed_with_failure);
            });
        },

        updateIncident({commit, state, dispatch}, data) {
            commit('setUpdateIncidentLoadStatus', CONFIG.STATUSES.loading);

            IncidentAPI.updateIncident(
                data.id,
                data.title,
                data.description,
                data.incident_type_id,
                data.updated_by
            ).then(function(response) {
                commit('setUpdateIncidentLoadStatus', CONFIG.STATUSES.completed_with_success);
            }).catch(function() {
                commit('setUpdateIncidentLoadStatus', CONFIG.STATUSES.completed_with_failure);
            });
        },

        deleteIncident({commit, state, dispatch}, data) {
            commit('setDeleteIncidentLoadStatus', CONFIG.STATUSES.loading);

            IncidentAPI.updateIncident(
                data.id
            ).then(function(response) {
                commit('setDeleteIncidentLoadStatus', CONFIG.STATUSES.completed_with_success);
            }).catch(function() {
                commit('setDeleteIncidentLoadStatus', CONFIG.STATUSES.completed_with_failure);
            });
        }
    },
    mutations: {
        setIncidentsLoadStatus(state, status) {
            state.incidentsLoadStatus = status;
        },

        setIncidents(state, incidents) {
            state.incidents = incidents;
        },

        setIncidentLoadStatus(state, status) {
            state.incidentLoadStatus = status;
        },

        setIncident(state, incident) {
            state.incident = incident;
        }, 

        setAddIncidentLoadStatus(state, status) {
            state.addIncidentLoadStatus = status;
        },

        setUpdateIncidentLoadStatus(state, status) {
            state.updateIncidentLoadStatus = status;
        },

        setDeleteIncidentLoadStatus(state, status) {
            state.deleteIncidentLoadStatus = status;
        }
    },
    getters: {
        getIncidentsLoadStatus(state) {
            return state.incidentsLoadStatus;
        },

        getIncidents(state) {
            return state.incidents;
        },

        getIncidentLoadStatus(state) {
            return state.incidentLoadStatus;
        },

        getIncident(state) {
            return state.incident;
        }, 

        getAddIncidentLoadStatus(state) {
            return state.addIncidentLoadStatus;
        },

        getUpdateIncidentLoadStatus(state) {
            return state.updateIncidentLoadStatus;
        },

        getDeleteIncidentLoadStatus(state) {
            return state.deleteIncidentLoadStatus;
        }
    }
};