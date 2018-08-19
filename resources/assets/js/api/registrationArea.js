/*
    Imports the Roast API URL from the config.
*/
import { CONFIG } from '../config.js';

export default {
    /*
        GET /api/v1/localGovernment/{local_government_id}/registrationAreas
    */
    getRegistrationAreasFor: function(localGovernmentId) {
        return axios.get( 
            CONFIG.API_URL + 
            '/localGovernment/' +
            localGovernmentId +
            '/registrationAreas' 
        );
    },

    /** 
     * POST  /api/v1/registrationArea
    */
    addRegistrationArea: function ( 
        name, 
        local_government_id,
        latitude,
        longitude,
        added_by,
        updated_by 
    ) {
        return axios.post( CONFIG.API_URL + '/registrationArea', {
            name: name,
            local_government_id: local_government_id,
            latitude: latitude,
            longitude: longitude,
            added_by: added_by,
            updated_by: updated_by
        });
    },

    /**
     * PUT /api/v1/registrationArea
     */
    updateRegistrationArea: function ( 
        id,
        name, 
        latitude,
        longitude,
        updated_by 
    ) {
        return axios.put( CONFIG.API_URL + '/registrationArea', {
            id: id,
            name: name, 
            latitude: latitude,
            longitude: longitude,
            updated_by: updated_by
        });
    },

    /**
     * DELETE /api/v1/registrationArea
     */
    deleteRegistrationArea: function (
        id
    ) {
        return axios.delete( CONFIG.API_URL + '/registrationArea', {
            id: id
        });
    }
};