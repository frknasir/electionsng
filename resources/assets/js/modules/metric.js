/*
|-------------------------------------------------------------------------------
| VUEX modules/metric.js
|-------------------------------------------------------------------------------
| The Vuex data store for the metrics
*/

import MetricAPI from '../api/metric.js';

export const metric = {
    state: {
        metrics: {},
        metricsLoadStatus: 0
    },
    actions: {
        loadMetrics({commit, state}, data) {
            commit('setMetricsLoadStatus', 1);

            MetricAPI.index().then(function(response) {
                commit('setMetricsLoadStatus', 2);
                commit('setMetrics', response.data);
            }).catch(function() {
                commit('setMetricsLoadStatus', 3);
                commit('setMetrics', {});
            });
        },
    },
    mutations: {
        setMetrics(state, metrics) {
            state.metrics = metrics;
        },

        setMetricsLoadStatus(state, status) {
            state.metricsLoadStatus = status;
        }
    },
    getters: {
        getMetrics(state) {
            return state.metrics;
        },

        getMetricsLoadStatus(state) {
            return state.metricsLoadStatus;
        }
    }
};