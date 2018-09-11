/*
    Imports the API URL from the config.
*/
import { CONFIG } from '../config.js';

export default { 
    /*
        GET /api/v1/election/{election_id}/candidates
    */
    getElectionCandidates: function( electionId, url = null ) {
        url = url || CONFIG.API_URL + '/election/' + electionId + '/candidates';
        return axios.get(url);
    },

    /*
    GET /api/v1/candidate/{id}
    */
    getCandidate: function( id ) {
        return axios.get( CONFIG.API_URL + '/candidate/' + id );
    },

    /*
    POST  /api/v1/candidate
    */
    addCandidate: function ( 
        political_party_id, 
        election_id, 
        aspirant, 
        deputy, 
        bio
    ) {
        return axios.post( CONFIG.API_URL + '/candidate', {
            political_party_id: political_party_id,
            election_id: election_id,
            aspirant: aspirant,
            deputy: deputy,
            bio: bio
        });
    },

    /**
     * PUT /api/v1/candidate
     */
    updateCandidate: function(
        id, 
        political_party_id,
        aspirant, 
        deputy, 
        bio
    ) {
        return axios.put( CONFIG.API_URL + '/candidate', {
            id: id,
            political_party_id: political_party_id,
            aspirant: aspirant,
            deputy: deputy,
            bio: bio
        });
    },

    /**
     * DELETE /api/v1/candidate
     */
    deleteCandidate: function (
        id
    ) {
        return axios.delete( CONFIG.API_URL + '/candidate', {
            params: {
                id: id
            }
        });
    }
};