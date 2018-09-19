/*
    Imports the Roast API URL from the config.
*/
import { CONFIG } from '../config.js'; 

export default {
    /*
        GET /api/v1/politicalParties
    */
    getPoliticalParties: function() {
        return axios.get( 
            CONFIG.API_URL + 
            '/politicalParties' );
    },

    /**
     * GET /api/v1/politicalParty/{id}
     */
    getPoliticalParty: function(id) {
        return axios.get(
            CONFIG.API_URL +
            '/politicalParty/' +
            id
        );
    },

    /** 
     * POST  /api/v1/politicalParty
    */
    addPoliticalParty: function ( 
        initials, 
        name
    ) {
        return axios.post( CONFIG.API_URL + '/politicalParty', {
            initials: initials,
            name: name
        });
    },

    /**
     * PUT /api/v1/politicalParty
     */
    updatePoliticalParty: function ( 
        id,
        initials, 
        name
    ) {
        return axios.put( CONFIG.API_URL + '/politicalParty', {
            id: id,
            initials: initials,
            name: name
        });
    },

    /**
     * DELETE /api/v1/election
     */
    deletePoliticalParty: function (
        id
    ) {
        return axios.delete( CONFIG.API_URL + '/politicalParty', {
            params: {
                id: id
            }
        });
    }
};