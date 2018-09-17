/*
    Imports the Roast API URL from the config.
*/
import { CONFIG } from '../config.js';

export default {
    /*
    GET /api/v1/state/{state_id}/localGovernments
    */
    getLocalGovernmentsFor: function(stateId) {
        return axios.get( 
            CONFIG.API_URL + 
            '/state/' + 
            stateId + 
            '/localGovernments' 
        );
    }, 

    /**
     * GET /api/v1/localGovernment/{id}
     */
    getLocalGovernment: function(id) {
        return axios.get(
            CONFIG.API_URL +
            '/localGovernment/' +
            id
        );
    },

    /**
     * PUT /api/v1/localGovernment
     */
    updateLocalGovernment: function ( 
        id,
        latitude, 
        longitude
    ) {
        return axios.put( CONFIG.API_URL + '/localGovernment', {
            id: id,
            latitude: latitude,
            longitude: longitude
        });
    }
};