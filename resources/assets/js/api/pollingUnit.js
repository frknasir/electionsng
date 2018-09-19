/*
    Imports the Roast API URL from the config.
*/
import { CONFIG } from '../config.js';

export default {
    /*
        GET /api/v1/registrationArea/{registration_id}/pollingUnits
    */
    getPollingUnitsFor: function(registrationAreaId) {
        return axios.get( 
            CONFIG.API_URL + 
            '/registrationArea/' +
            registrationAreaId +
            '/pollingUnits' 
        ); 
    },

    /**
     * GET /api/v1/pollingUnit/{id}
     */
    getPollingUnit: function(id) {
        return axios.get(
            CONFIG.API_URL +
            '/pollingUnit/' +
            id
        );
    },

    /** 
     * POST  /api/v1/pollingUnit
    */
    addPollingUnit: function ( 
        code, 
        description, 
        registration_area_id,
        latitude,
        longitude
    ) {
        return axios.post( CONFIG.API_URL + '/pollingUnit', {
            code: code,
            description: description,
            registration_area_id: registration_area_id,
            latitude: latitude,
            longitude: longitude
        });
    },

    /**
     * PUT /api/v1/pollingUnit
     */
    updatePollingUnit: function ( 
        id,
        code, 
        description, 
        latitude,
        longitude
    ) {
        return axios.put( CONFIG.API_URL + '/pollingUnit', {
            id: id,
            code: code,
            description: description,
            latitude: latitude,
            longitude: longitude
        });
    },

    /**
     * DELETE /api/v1/election
     */
    deletePollingUnit: function (
        id
    ) {
        return axios.delete( CONFIG.API_URL + '/pollingUnit', {
            params: {
                id: id
            }
        });
    }
};