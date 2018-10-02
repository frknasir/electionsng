/*
|-------------------------------------------------------------------------------
| VUEX modules/viz.js
|-------------------------------------------------------------------------------
| The Vuex data store for the viz
*/

import VizAPI from '../api/viz.js';

export const viz = {
    state: {
        heatMapData: [],
        heatMapDataLoadStatus: 0
    },
    actions: {
        getHeatMapData: function({commit}, data) {
            commit('setHeatMapDataLoadStatus', 1);

            VizAPI.getHeatMapData(
                data.electionId,
                data.type
            ).then(function(response) {
                commit('setHeatMapDataLoadStatus', 2);
                commit('setHeatMapData', response.data);
            }).catch(function() {
                commit('setHeatMapDataLoadStatus', 3);
                commit('setHeatMapData', []);
            });
        }
    },
    mutations: {
        setHeatMapData(state, data) {
            state.heatMapData = data;
        },
        setHeatMapDataLoadStatus(state, status) {
            state.heatMapDataLoadStatus = status;
        }
    },
    getters: {
        getHeatMapData(state) {
            return state.heatMapData;
        },
        getHeatMapDataLoadStatus(state) {
            return state.heatMapDataLoadStatus;
        }
    } 
}