/*
    Imports the Roast API URL from the config.
*/
import { CONFIG } from '../config.js';

export default {
    /*
    GET /api/v1/election/{election_id}/liveUpdates
    */ 
    getElectionLiveUpdates: function(electionId, url = null) {
        url = url || CONFIG.API_URL + '/election/' + electionId + '/liveUpdates';
        return axios.get( 
            url
        );
    },

    /* *
    GET /api/v1/election/{election_id}/state/{state_id}/liveUpdates
    */
    getStateLiveUpdates: function(electionId, stateId) {
        return axios.get( 
            CONFIG.API_URL + 
            '/election/'  +
            electionId +
            '/state/' +
            stateId +
            '/liveUpdates'
        );
    },

    /* *
    GET /api/v1/election/{election_id}/localGovernment/{local_government_id}/liveUpdates
    */
    getLocalGovernmentLiveUpdates: function(electionId, localGovernmentId) {
        return axios.get( 
            CONFIG.API_URL + 
            '/election/'  +
            electionId +
            '/localGovernment/' +
            localGovernmentId +
            '/liveUpdates'
        );
    },

    /* *
    GET /api/v1/election/{election_id}/registrationArea/{registration_area_id}/liveUpdates
    */
    getRegistrationAreaLiveUpdates: function(electionId, registrationAreaId) {
        return axios.get( 
            CONFIG.API_URL + 
            '/election/'  +
            electionId +
            '/registrationArea/' +
            registrationAreaId +
            '/liveUpdates'
        );
    },

    /* *
    GET /api/v1/election/{election_id}/pollingUnit/{polling_unit_id}/liveUpdates
    */
    getPollingUnitLiveUpdates: function(electionId, pollingUnitId) {
        return axios.get( 
            CONFIG.API_URL + 
            '/election/'  +
            electionId +
            '/pollingUnit/' +
            pollingUnitId +
            '/liveUpdates'
        );
    },

    /** 
     * POST  /api/v1/liveUpdate
    */
    addLiveUpdate: function ( 
        title, 
        description, 
        election_id, 
        location_id,
        location_type,
        added_by,
        updated_by 
    ) {
        return axios.post( CONFIG.API_URL + '/liveUpdate', {
            title: title,
            description: description,
            election_id: election_id,
            location_id: location_id,
            location_type: location_type,
            added_by: added_by,
            updated_by: updated_by
        });
    },

    /**
     * PUT /api/v1/liveUpdate
     */
    updateLiveUpdate: function ( 
        id,
        title, 
        description,
        updated_by 
    ) {
        return axios.put( CONFIG.API_URL + '/liveUpdate', {
            id: id,
            title: title,
            description: description,
            updated_by: updated_by
        });
    },

    /**
     * DELETE /api/v1/liveUpdate
     */
    deleteLiveUpdate: function (
        id
    ) {
        return axios.delete( CONFIG.API_URL + '/liveUpdate', {
            id: id
        });
    }
};