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
     * GET /api/v1/picture/{id}
     */
    getPicture: function(id) {
        return axios.get(
            CONFIG.API_URL +
            '/picture/' +
            id
        );
    },

    /** 
     * POST  /api/v1/picture
    */
    addPicture: function ( 
        title, 
        description, 
        pic,
        election_id, 
        location_id,
        location_type
    ) {
        var formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('pic', pic);
        formData.append('election_id', election_id);
        formData.append('location_id', location_id);
        formData.append('location_type', location_type);

        return axios.post( CONFIG.API_URL + '/picture', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    /**
     * PUT /api/v1/picture
     */
    updatePicture: function ( 
        id,
        title, 
        description
    ) {
        return axios.put( CONFIG.API_URL + '/picture', {
            id: id,
            title: title,
            description: description
        });
    },

    /**
     * DELETE /api/v1/picture
     */
    deletePicture: function (
        id
    ) {
        return axios.delete( CONFIG.API_URL + '/picture', {
            params: {
                id: id
            }
        });
    }
};