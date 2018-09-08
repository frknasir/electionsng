/*
|-------------------------------------------------------------------------------
| VUEX modules/user.js
|-------------------------------------------------------------------------------
| The Vuex data store for the user
*/

import UserAPI from '../api/user.js';

export const user = {
    state: {
        user: {},
        userLoadStatus: 0
    },
    actions: {
        getAuthUser({commit}) {
            commit('setUserLoadStatus', 1);

            UserAPI.getAuthUser()
                .then(function(response) {
                    commit('setUserLoadStatus', 2);
                    commit('setUser', response.data.data);
                })
                .catch(function() {
                    commit('setUserLoadStatus', 3);
                    commit('setUser', {});
                });
        },
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setUserLoadStatus(state, status) {
            state.userLoadStatus = status;
        }
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        getUserLoadStatus(state) {
            return state.userLoadStatus;
        }
    }
};