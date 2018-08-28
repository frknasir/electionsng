/*
|-------------------------------------------------------------------------------
| VUEX modules/incident.js
|-------------------------------------------------------------------------------
| The Vuex data store for the incident
*/

import IncidentAPI from '../api/incident.js';

export const incident = {
    state: {
        incidents: [],
        iPagination: {},
        incidentsLoadStatus: 0,
        incident: {},
        incidentLoadStatus: 0,
        addIncidentLoadStatus: 0,
        updateIncidentLoadStatus: 0,
        deleteIncidentLoadStatus: 0
    },
    actions: {
        getElectionIncidents({commit}, data) {
            commit('setIncidentsLoadStatus', 1);

            IncidentAPI.getElectionIncidents(
                data.id
            ).then(function(response) {
                commit('setIncidentsLoadStatus', 2);
                commit('setIncidents', response.data.data);
                commit('setIPagination', {
                    meta: response.data.meta,
                    links: response.data.links
                });
            }).catch(function() {
                commit('setIncidentsLoadStatus', 3);
                commit('setIncidents', []);
            });
        },

        getStateIncidents({commit}, data) {
            commit('setIncidentsLoadStatus', 1);

            IncidentAPI.getStateIncidents(
                data.electionId,
                data.stateId
            ).then(function(response) {
                commit('setIncidentsLoadStatus', 2);
                commit('setIncidents', response.data);
                commit('setIPagination', {
                    meta: response.data.meta,
                    links: response.data.links
                });
            }).catch(function() {
                commit('setIncidentsLoadStatus', 3);
                commit('setIncidents', []);
            });
        },

        getLocalGovernmentIncidents({commit}, data) {
            commit('setIncidentsLoadStatus', 1);

            IncidentAPI.getLocalGovernmentIncidents(
                data.electionId,
                data.localGovernmentId
            ).then(function(response) {
                commit('setIncidentsLoadStatus', 2);
                commit('setIncidents', response.data);
                commit('setIPagination', {
                    meta: response.data.meta,
                    links: response.data.links
                });
            }).catch(function() {
                commit('setIncidentsLoadStatus', 3);
                commit('setIncidents', []);
            });
        },

        getRegistrationAreaIncidents({commit}, data) {
            commit('setIncidentsLoadStatus', 1);

            IncidentAPI.getRegistrationAreaIncidents(
                data.electionId,
                data.registrationAreaId
            ).then(function(response) {
                commit('setIncidentsLoadStatus', 2);
                commit('setIncidents', response.data);
                commit('setIPagination', {
                    meta: response.data.meta,
                    links: response.data.links
                });
            }).catch(function() {
                commit('setIncidentsLoadStatus', 3);
                commit('setIncidents', []);
            });
        },

        getPollingUnitIncidents({commit}, data) {
            commit('setIncidentsLoadStatus', 1);

            IncidentAPI.getPollingUnitIncidents(
                data.electionId,
                data.pollingUnitId
            ).then(function(response) {
                commit('setIncidentsLoadStatus', 2);
                commit('setIncidents', response.data);
                commit('setIPagination', {
                    meta: response.data.meta,
                    links: response.data.links
                });
            }).catch(function() {
                commit('setIncidentsLoadStatus', 3);
                commit('setIncidents', []);
            });
        },

        filterIncidentsBy({commit}, data) {
            commit('setIncidentsLoadStatus', 1);

            IncidentAPI.filterIncidentsBy(
                data.electionId,
                data.locationType
            ).then(function(response) {
                commit('setIncidentsLoadStatus', 2);
                commit('setIncidents', response.data.data);
                commit('setIPagination', {
                    meta: response.data.meta,
                    links: response.data.links
                });
            }).catch(function() {
                commit('setIncidentsLoadStatus', 3);
                commit('setIncidents', []);
            });
        },

        getIncident({commit}, data) {
            commit('setIncidentLoadStatus', 1);

            IncidentAPI.getIncident(
                data.id
            ).then(function(response) {
                commit('setIncidentLoadStatus', 2);
                commit('setIncident', response.data.data);
            }).catch(function() {
                commit('setIncidentLoadStatus', 3);
                commit('setIncident', {});
            });
        },

        addIncident({commit, state, dispatch}, data) {
            commit('setAddIncidentLoadStatus', 1);

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
                commit('setAddIncidentLoadStatus', 2);
            }).catch(function() {
                commit('setAddIncidentLoadStatus', 3);
            });
        },

        updateIncident({commit, state, dispatch}, data) {
            commit('setUpdateIncidentLoadStatus', 1);

            IncidentAPI.updateIncident(
                data.id,
                data.title,
                data.description,
                data.incident_type_id,
                data.updated_by
            ).then(function(response) {
                commit('setUpdateIncidentLoadStatus', 2);
            }).catch(function() {
                commit('setUpdateIncidentLoadStatus', 3);
            });
        },

        deleteIncident({commit, state, dispatch}, data) {
            commit('setDeleteIncidentLoadStatus', 1);

            IncidentAPI.updateIncident(
                data.id
            ).then(function(response) {
                commit('setDeleteIncidentLoadStatus', 2);
            }).catch(function() {
                commit('setDeleteIncidentLoadStatus', 3);
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

        setIPagination(state, data) {
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
        
            state.iPagination = pagination;
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

        getIPagination(state) {
            return state.iPagination;
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