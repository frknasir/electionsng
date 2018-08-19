/*
|-------------------------------------------------------------------------------
| VUEX modules/role.js
|-------------------------------------------------------------------------------
| The Vuex data store for the role
*/

import RoleAPI from '../api/role.js';
import { CONFIG } from '../config.js';

export const role = { 
    state: {
        roles: [],
        rolesLoadStatus: CONFIG.STATUSES.idle,
    },
    actions: {
        getRoles({commit}) {
            commit('setRolesLoadStatus', CONFIG.STATUSES.loading);

            RoleAPI.getRoles()
                .then(function(response) {
                    commit('setRolesLoadStatus', CONFIG.STATUSES.completed_with_success);
                    commit('setRoles', response.data);
                })
                .catch(function() {
                    commit('setRolesLoadStatus', CONFIG.STATUSES.completed_with_failure);
                    commit('setRoles', []);
                });
        }
    },
    mutations: {
        setRolesLoadStatus(state, status) {
            state.rolesLoadStatus = status;
        },

        setRoles(state, roles) {
            state.roles = roles;
        }
    },
    getters: {
        getRolesLoadStatus(state) {
            return state.roles;
        },

        getRoles(state) {
            return state.roles;
        }
    }
};