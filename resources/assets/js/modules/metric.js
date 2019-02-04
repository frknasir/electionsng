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
        metricsLoadStatus: 0,
        stateElectionsCount: {},
        stateElectionsCountLoadStatus: 0
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

        loadStateElectionsCount({commit, state}, data) {
            commit('setStateElectionsCountLoadStatus', 1);

            MetricAPI.getStateElectionsCount().then(function(response) {
                commit('setStateElectionsCountLoadStatus', 2);
                commit('setStateElectionsCount', response.data);
            }).catch(function() {
                commit('setStateElectionsCountLoadStatus', 3);
                commit('setStateElectionsCount', {});
            });
        }
    },
    mutations: {
        setMetrics(state, metrics) {
            state.metrics = metrics;
        },

        setMetricsLoadStatus(state, status) {
            state.metricsLoadStatus = status;
        },

        setStateElectionsCount(state, stateElectionsCount) {
            state.stateElectionsCount = stateElectionsCount;
        },

        setStateElectionsCountLoadStatus(state, status) {
            state.stateElectionsCountLoadStatus = status;
        }
    },
    getters: {
        getMetrics(state) {
            return state.metrics;
        },

        getMetricsLoadStatus(state) {
            return state.metricsLoadStatus;
        },

        getStateElectionsCount(state) {
            return state.stateElectionsCount;
        },

        getStateElectionsCountLoadStatus(state) {
            return state.stateElectionsCountLoadStatus;
        }
    }
};