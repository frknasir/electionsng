/*
* Imports the API URL from the config.
*/
import { CONFIG } from '../config.js';

export default {
    /**
     * /api/v1/election/{electionId}/viz/heatMap/{type}
     */
    getHeatMapData: function(electionId, type) {
        return axios.get(
            CONFIG.API_URL + 
            '/election/' +
            electionId +
            '/viz/heatMap/' +
            type
        );
    }
};