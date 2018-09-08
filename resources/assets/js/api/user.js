/*
    Imports the API URL from the config.
*/
import { CONFIG } from '../config.js';

export default {
    /**
     * GET /api/v1/user
     */
    getAuthUser: function() {
        return axios.get( 
            CONFIG.API_URL + 
            '/user' 
        );
    }
};