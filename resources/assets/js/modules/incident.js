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
        addIncidentResult: {
            success: 0
        },
        updateIncidentLoadStatus: 0,
        updateIncidentResult: {},
        deleteIncidentLoadStatus: 0,
        deleteIncidentResult: {}
    },
    actions: {
        getElectionIncidents({commit, state}, data) {
            commit('setIncidentsLoadStatus', 1);

            if(state.incidents.length > 0) {
                state.incidents.splice(0, state.incidents.length);
            }

            IncidentAPI.getElectionIncidents(
                data.id,
                data.url,
                data.limit
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

        getStateIncidents({commit, state}, data) {
            commit('setIncidentsLoadStatus', 1);

            if(state.incidents.length > 0) {
                state.incidents.splice(0, state.incidents.length);
            }

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

        getLocalGovernmentIncidents({commit, state}, data) {
            commit('setIncidentsLoadStatus', 1);

            if(state.incidents.length > 0) {
                state.incidents.splice(0, state.incidents.length);
            }

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

        getRegistrationAreaIncidents({commit, state}, data) {
            commit('setIncidentsLoadStatus', 1);

            if(state.incidents.length > 0) {
                state.incidents.splice(0, state.incidents.length);
            }

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

        getPollingUnitIncidents({commit, state}, data) {
            commit('setIncidentsLoadStatus', 1);

            if(state.incidents.length > 0) {
                state.incidents.splice(0, state.incidents.length);
            }

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

        filterIncidentsBy({commit, state}, data) {
            commit('setIncidentsLoadStatus', 1);

            if(state.incidents.length > 0) {
                state.incidents.splice(0, state.incidents.length);
            }

            IncidentAPI.filterIncidentsBy(
                data.electionId,
                data.locationType,
                data.url,
                data.limit
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
                data.location_type
            ).then(function(response) {
                commit('setAddIncidentLoadStatus', 2);
                commit('setAddIncidentResult', response.data);
            }).catch(function() {
                commit('setAddIncidentLoadStatus', 3);
                commit('setAddIncidentResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
            });
        },

        updateIncident({commit, state, dispatch}, data) {
            commit('setUpdateIncidentLoadStatus', 1);

            IncidentAPI.updateIncident(
                data.id,
                data.title,
                data.description,
                data.incident_type_id
            ).then(function(response) {
                commit('setUpdateIncidentLoadStatus', 2);
                commit('setUpdateIncidentResult', response.data);
            }).catch(function() {
                commit('setUpdateIncidentLoadStatus', 3);
                commit('setUpdateIncidentResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
            });
        },

        deleteIncident({commit, state, dispatch}, data) {
            commit('setDeleteIncidentLoadStatus', 1);

            IncidentAPI.deleteIncident(
                data.id
            ).then(function(response) {
                commit('setDeleteIncidentLoadStatus', 2);
                commit('setDeleteIncidentResult', response.data);
            }).catch(function() {
                commit('setDeleteIncidentLoadStatus', 3);
                commit('setDeleteIncidentResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
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

        setAddIncidentResult(state, result) {
            state.addIncidentResult = result;
        },

        setUpdateIncidentLoadStatus(state, status) {
            state.updateIncidentLoadStatus = status;
        },

        setUpdateIncidentResult(state, result) {
            state.updateIncidentResult = result;
        },

        setDeleteIncidentLoadStatus(state, status) {
            state.deleteIncidentLoadStatus = status;
        },

        setDeleteIncidentResult(state, result) {
            state.deleteIncidentResult = result;
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

        getAddIncidentResult(state) {
            return state.addIncidentResult;
        },

        getUpdateIncidentLoadStatus(state) {
            return state.updateIncidentLoadStatus;
        },

        getUpdateIncidentResult(state) {
            return state.updateIncidentResult;
        },

        getDeleteIncidentLoadStatus(state) {
            return state.deleteIncidentLoadStatus;
        },

        getDeleteIncidentResult(state) {
            return state.deleteIncidentResult;
        }
    }
};