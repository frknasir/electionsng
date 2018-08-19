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
     * POST  /api/v1/politicalParty
    */
    AddPoliticalParty: function ( 
        initials, 
        name, 
        added_by,
        updated_by 
    ) {
        return axios.post( CONFIG.API_URL + '/politicalParty', {
            initials: initials,
            name: name,
            added_by: added_by,
            updated_by: updated_by
        });
    },

    /**
     * PUT /api/v1/politicalParty
     */
    UpdatePoliticalParty: function ( 
        id,
        initials, 
        name,
        updated_by 
    ) {
        return axios.put( CONFIG.API_URL + '/politicalParty', {
            id: id,
            initials: initials,
            name: name,
            updated_by: updated_by
        });
    },

    /**
     * DELETE /api/v1/election
     */
    DeletePoliticalParty: function (
        id
    ) {
        return axios.delete( CONFIG.API_URL + '/politicalParty', {
            id: id
        });
    }
};