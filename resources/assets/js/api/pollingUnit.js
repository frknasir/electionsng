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
     * POST  /api/v1/pollingUnit
    */
    addPollingUnit: function ( 
        code, 
        description, 
        registration_area_id,
        latitude,
        longitude,
        added_by,
        updated_by 
    ) {
        return axios.post( CONFIG.API_URL + '/pollingUnit', {
            code: code,
            description: description,
            registration_area_id: registration_area_id,
            latitude: latitude,
            longitude: longitude,
            added_by: added_by,
            updated_by: updated_by
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
        longitude,
        updated_by 
    ) {
        return axios.put( CONFIG.API_URL + '/pollingUnit', {
            id: id,
            code: code,
            description: description,
            latitude: latitude,
            longitude: longitude,
            updated_by: updated_by
        });
    },

    /**
     * DELETE /api/v1/election
     */
    deletePollingUnit: function (
        id
    ) {
        return axios.delete( CONFIG.API_URL + '/pollingUnit', {
            id: id
        });
    }
};