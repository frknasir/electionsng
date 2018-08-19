/*
    Imports the Roast API URL from the config.
*/
import { CONFIG } from '../config.js';

export default {
    /*
    GET /api/v1/states
    */
    getStates: function() {
        return axios.get( 
            CONFIG.API_URL + 
            '/states' 
        );
    },

    /**
     * PUT /api/v1/state
     */
    UpdateState: function ( 
        id,
        latitude, 
        longitude
    ) {
        return axios.put( CONFIG.API_URL + '/state', {
            id: id,
            latitude: latitude,
            longitude: longitude
        });
    }
};