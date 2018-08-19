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
     * PUT /api/v1/localGovernment
     */
    UpdateLocalGovernment: function ( 
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