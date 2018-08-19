/*
    Imports the API URL from the config.
*/
import { CONFIG } from '../config.js';

export default { 
    /*
        GET /api/v1/election/{election_id}/candidates
    */
    getElectionCandidates: function( electionId ) {
        return axios.get( CONFIG.API_URL + '/election/' + electionId + '/candidates' );
    },

    /*
    GET /api/v1/election/{election_id}/party/{party_id}/candidate
    */
    getPoliticalPartyCandidate: function( electionId, partyId ) {
        return axios.get( CONFIG.API_URL + '/election/' + electionId + '/party/' + partyId + '/candidate' );
    },

    /*
    POST  /api/v1/candidate
    */
    addCandidate: function ( 
        political_party_id, 
        election_id, 
        aspirant, 
        deputy, 
        bio,
        added_by,
        updated_by 
    ) {
        return axios.post( CONFIG.API_URL + '/candidate', {
            political_party_id: political_party_id,
            election_id: election_id,
            aspirant: aspirant,
            deputy: deputy,
            bio: bio,
            added_by: added_by,
            updated_by: updated_by
        });
    },

    /**
     * PUT /api/v1/candidate
     */
    updateCandidate: function(
        id, 
        aspirant, 
        deputy, 
        bio,
        updated_by
    ) {
        return axios.put( CONFIG.API_URL + '/candidate', {
            id: id,
            aspirant: aspirant,
            deputy: deputy,
            bio: bio,
            updated_by: updated_by
        });
    },

    /**
     * DELETE /api/v1/candidate
     */
    deleteCandidate: function (
        id
    ) {
        return axios.delete( CONFIG.API_URL + '/candidate', {
            id: id
        });
    }
};