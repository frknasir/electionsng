/*
    Imports the Roast API URL from the config.
*/
import { CONFIG } from '../config.js';

export default {
    /*
    GET /api/v1/incidentTypes
    */
    getIncidentTypes: function() {
        return axios.get( 
            CONFIG.API_URL + 
            '/incidentTypes'  
        );
    },

    /**
     * GET /api/v1/incidentType/{id}
     */
    getIncidentType: function(id) {
        return axios.get(
            CONFIG.API_URL +
            '/incidentType/' +
            id
        );
    },

    /** 
     * POST  /api/v1/incidentType
    */
    addIncidentType: function ( 
        name
    ) {
        return axios.post( CONFIG.API_URL + '/incidentType', {
            name: name
        });
    },

    /**
     * PUT /api/v1/incidentType
     */
    updateIncidentType: function ( 
        id,
        name
    ) {
        return axios.put( CONFIG.API_URL + '/incidentType', {
            id: id,
            name: name
        });
    },

    /**
     * DELETE /api/v1/incidentType
     */
    deleteIncidentType: function (
        id
    ) {
        return axios.delete( CONFIG.API_URL + '/incidentType', {
            params: {
                id: id
            }
        });
    }
};