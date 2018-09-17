/*
    Imports the API URL from the config.
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
     * GET /api/v1/state/{id}
     */
    getState: function(id) {
        return axios.get(
            CONFIG.API_URL + 
            '/state/' + id
        );
    },

    /**
     * PUT /api/v1/state
     */
    updateState: function ( 
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