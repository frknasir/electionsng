/*
    Imports the Roast API URL from the config.
*/
import { CONFIG } from '../config.js';

export default {
    /* *
    GET /api/v1/election/{electionId}/{locationType}/{locationId}/results
    */
    getResults: function(electionId, locationType, locationId) {
        return axios.get( 
            CONFIG.API_URL + 
            '/election/'  +
            electionId +
            '/' + locationType +
            '/' + locationId +
            '/results'
        ); 
    },

    /**
     * GET /api/v1/election/{id}/collationStats
     */
    getCollationStats: function(
        election_id
    ) {
        return axios.get(
            CONFIG.API_URL + 
            '/election/' + 
            election_id + 
            '/collationStats'
        );
    },

    /** 
     * POST  /api/v1/result
    */
    addResult: function ( 
        candidate_id, 
        location_id,
        location_type,
        votes 
    ) {
        return axios.post( CONFIG.API_URL + '/result', {
            candidate_id: candidate_id,
            location_id: location_id,
            location_type: location_type,
            votes: votes
        });
    },

    /**
     * PUT /api/v1/liveUpdate
     */
    updateResult: function ( 
        id,
        votes
    ) {
        return axios.put( CONFIG.API_URL + '/result', {
            id: id,
            votes: votes
        });
    },

    /**
     * DELETE /api/v1/result
     */
    deleteResult: function (
        id
    ) {
        return axios.delete( CONFIG.API_URL + '/result', {
            params: {
                id: id
            }
        });
    }
};