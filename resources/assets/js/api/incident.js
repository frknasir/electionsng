/*
    Imports the Roast API URL from the config.
*/
import { CONFIG } from '../config.js';

export default {
    /*
    GET /api/v1/election/{election_id}/incidents
    */
    getElectionIncidents: function(electionId) {
        return axios.get( 
            CONFIG.API_URL + 
            '/election/' + 
            electionId + 
            '/incidents' 
        );
    },

    /* *
    GET /api/v1/election/{election_id}/state/{state_id}/incidents
    */
    getStateIncidents: function(electionId, stateId) {
        return axios.get( 
            CONFIG.API_URL + 
            '/election/'  +
            electionId +
            '/state/' +
            stateId +
            '/incidents'
        );
    },

    /* *
    GET /api/v1/election/{election_id}/localGovernment/{local_government_id}/incidents
    */
    getLocalGovernmentIncidents: function(electionId, localGovernmentId) {
        return axios.get( 
            CONFIG.API_URL + 
            '/election/'  +
            electionId +
            '/localGovernment/' +
            localGovernmentId +
            '/incidents'
        );
    },

    /* *
    GET /api/v1/election/{election_id}/registrationArea/{registration_area_id}/incidents
    */
    getRegistrationAreaIncidents: function(electionId, registrationAreaId) {
        return axios.get( 
            CONFIG.API_URL + 
            '/election/'  +
            electionId +
            '/registrationArea/' +
            registrationAreaId +
            '/incidents'
        );
    },

    /* *
    GET /api/v1/election/{election_id}/pollingUnit/{polling_unit_id}/incidents
    */
    getPollingUnitIncidents: function(electionId, pollingUnitId) {
        return axios.get( 
            CONFIG.API_URL + 
            '/election/'  +
            electionId +
            '/pollingUnit/' +
            pollingUnitId +
            '/incidents'
        );
    },

    /** 
     * POST  /api/v1/incident
    */
    addIncident: function ( 
        title, 
        description, 
        incident_type_id, 
        election_id, 
        location_id,
        location_type,
        added_by,
        updated_by 
    ) {
        return axios.post( CONFIG.API_URL + '/incident', {
            title: title,
            description: description,
            incident_type_id: incident_type_id,
            election_id: election_id,
            location_id: location_id,
            location_type: location_type,
            added_by: added_by,
            updated_by: updated_by
        });
    },

    /**
     * PUT /api/v1/incident
     */
    updateIncident: function ( 
        id,
        title, 
        description, 
        incident_type_id, 
        updated_by 
    ) {
        return axios.put( CONFIG.API_URL + '/incident', {
            id: id,
            title: title,
            description: description,
            incident_type_id: incident_type_id,
            updated_by: updated_by
        });
    },

    /**
     * DELETE /api/v1/incident
     */
    deleteIncident: function (
        id
    ) {
        return axios.delete( CONFIG.API_URL + '/incident', {
            id: id
        });
    }
};