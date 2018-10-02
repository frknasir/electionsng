/*
    Imports the Roast API URL from the config.
*/
import { CONFIG } from '../config.js';

export default { 
    /***
     * GET /api/v1/election/{election_id}/finalResults
     */
    getFinalResults: function(electionId) {
        return axios.get( 
            CONFIG.API_URL + 
            '/election/' + 
            electionId + 
            '/finalResults' 
        );
    },

    /** 
     * POST  /api/v1/finalResult
    */
    addFinalResult: function ( 
        candidate_id,
        votes,
        added_by,
        updated_by 
    ) {
        return axios.post( CONFIG.API_URL + '/finalResult', {
            candidate_id: candidate_id,
            votes: votes,
            added_by: added_by,
            updated_by: updated_by
        });
    },

    /**
     * PUT /api/v1/finalResult
     */
    updateFinalResult: function ( 
        id,
        votes,
        updated_by 
    ) {
        return axios.put( CONFIG.API_URL + '/finalResult', {
            id: id,
            votes: votes,
            updated_by: updated_by
        });
    },

    /**
     * DELETE /api/v1/finalResult
     */
    deleteFinalResult: function (
        id
    ) {
        return axios.delete( CONFIG.API_URL + '/finalResult', {
            id: id
        });
    }
};