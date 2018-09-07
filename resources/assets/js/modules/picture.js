/*
|-------------------------------------------------------------------------------
| VUEX modules/picture.js
|-------------------------------------------------------------------------------
| The Vuex data store for the picture
*/

import PictureAPI from '../api/picture.js';

export const picture = {
    state: {
        pictures: [],
        picPagination: {},
        picturesLoadStatus: 0,
        addPictureLoadStatus: 0,
        updatePictureLoadStatus: 0,
        deletePictureLoadStatus: 0
    },
    actions: {
        getPictures({commit, state}, data) {
            commit('setPicturesLoadStatus', 1);

            if(state.pictures.length > 0) {
                state.pictures.splice(0, state.pictures.length);
            }

            PictureAPI.getPictures(
                data.election_id,
                data.url
            ).then(function(response) {
                commit('setPicturesLoadStatus', 2);
                commit('setPictures', response.data.data);
                commit('setPicPagination', {
                    meta: response.data.meta,
                    links: response.data.links
                });
            }).catch(function() {
                commit('setPicturesLoadStatus', 3);
                commit('setPictures', []);
            });
        },

        addPicture({commit, state, dispatch}, data) {
            commit('setAddPictureLoadStatus', 1);

            PictureAPI.addPicture(
                data.title,
                data.description,
                data.url,
                data.election_id,
                data.location_id,
                data.location_type,
                data.added_by,
                data.updated_by
            ).then(function(response) {
                commit('setAddPictureLoadStatus', 2);
            }).catch(function() {
                commit('setAddPictureLoadStatus', 3);
            });
        },

        updatePicture({commit, state, dispatch}, data) {
            commit('setUpdatePictureLoadStatus', 1);

            PictureAPI.updatePicture(
                data.id,
                data.title,
                data.description,
                data.updated_by
            ).then(function(response) {
                commit('setUpdatePictureLoadStatus', 2);
            }).catch(function() {
                commit('setUpdatePictureLoadStatus', 3);
            });
        },

        updatePicture({commit, state, dispatch}, data) {
            commit('setDeletePictureLoadStatus', 1);

            PictureAPI.updatePicture(
                data.id
            ).then(function(response) {
                commit('setDeletePictureLoadStatus', 2);
            }).catch(function() {
                commit('setDeletePictureLoadStatus', 3);
            });
        }
    },
    mutations: {
        setPicturesLoadStatus(state, status) {
            state.picturesLoadStatus = status;
        },

        setPictures(state, pictures) {
            state.pictures = pictures;
        },

        setPicPagination(state, data) {
            let meta = data.meta;
            let links = data.links;

            let pagination = {
                current_page: meta.current_page,
                last_page: meta.last_page,
                to: meta.to,
                total: meta.total,
                next_page_url: links.next,
                prev_page_url: links.prev
            };
        
            state.picPagination = pagination;
        },

        setAddPictureLoadStatus(state, status) {
            state.addPictureLoadStatus = status;
        },

        setUpdatePictureLoadStatus(state, status) {
            state.updatePictureLoadStatus = status;
        },

        setDeletePictureLoadStatus(state, status) {
            state.deletePictureLoadStatus = status;
        }
    },
    getters: {
        getPictures(state) {
            return state.pictures;
        },
        getPicturesLoadStatus(state) {
            return state.picturesLoadStatus;
        },
        getPicPagination(state) {
            return state.picPagination;
        },
        getAddPictureLoadStatus(state) {
            return state.addPictureLoadStatus;
        },
        getUpdatePictureLoadStatus(state) {
            return state.updatePictureLoadStatus;
        },
        getDeletePictureLoadStatus(state) {
            return state.deletePictureLoadStatus;
        }
    }
};