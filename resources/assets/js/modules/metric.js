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
        SECPagination: {},
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

            MetricAPI.getStateElectionsCount(
                data.url
            ).then(function(response) {
                commit('setStateElectionsCountLoadStatus', 2);
                commit('setStateElectionsCount', response.data.data);
                commit('setSECPagination', {
                    pData: response.data
                });
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
        },

        setSECPagination(state, data) {
            let meta = data.pData;

            let pagination = {
                current_page: meta.current_page,
                last_page: meta.last_page,
                to: meta.to,
                total: meta.total,
                next_page_url: meta.next_page_url,
                prev_page_url: meta.prev_page_url
            };
        
            state.SECPagination = pagination;
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
        },

        getSECPagination(state) {
            return state.SECPagination;
        }
    }
};