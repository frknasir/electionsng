/*
    Imports the API URL from the config.
*/
import { CONFIG } from '../config.js';

export default {
    /**
     * GET /api/v1/election/{election_id}/pictures
     */
    getPictures: function(electionId, url = null) {
        url = url || CONFIG.API_URL + '/election/' + electionId + '/pictures';
        return axios.get(url);
    },

    /** 
     * POST  /api/v1/picture
    */
    addPicture: function ( 
        title, 
        description, 
        url,
        election_id, 
        location_id,
        location_type,
        added_by,
        updated_by 
    ) {
        return axios.post( CONFIG.API_URL + '/picture', {
            title: title,
            description: description,
            url: url,
            election_id: election_id,
            location_id: location_id,
            location_type: location_type,
            added_by: added_by,
            updated_by: updated_by
        });
    },

    /**
     * PUT /api/v1/picture
     */
    updatePicture: function ( 
        id,
        title, 
        description,
        updated_by 
    ) {
        return axios.put( CONFIG.API_URL + '/picture', {
            id: id,
            title: title,
            description: description,
            updated_by: updated_by
        });
    },

    /**
     * DELETE /api/v1/picture
     */
    deletePicture: function (
        id
    ) {
        return axios.delete( CONFIG.API_URL + '/picture', {
            id: id
        });
    }
};