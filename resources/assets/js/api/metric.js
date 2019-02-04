/*
    Imports the API URL from the config.
*/
import { CONFIG } from '../config.js';

export default {
    /**
     * GET /api/v1/metric
     */
    index: function() {
        return axios.get(CONFIG.API_URL + "/metric");
    },

    /**
     * GET /api/v1/stateElectionsCount
     */
    getStateElectionsCount: function() {
        return axios.get(CONFIG.API_URL + "/stateElectionsCount");
    }
};