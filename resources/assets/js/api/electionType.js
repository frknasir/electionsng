/*
    Imports the Roast API URL from the config.
*/
import { CONFIG } from '../config.js';

export default {
    /*
        GET /api/v1/electionTypes
    */
    getElectionTypes: function() {
        return axios.get( CONFIG.API_URL + '/electionTypes' );
    },
};