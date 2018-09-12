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
        picture: {},
        pictureLoadStatus: 0,
        addPictureLoadStatus: 0,
        addPictureResult: {
            success: 0
        },
        updatePictureLoadStatus: 0,
        updatePictureResult: {},
        deletePictureLoadStatus: 0,
        deletePictureResult: {}
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

        getPicture({commit, state}, data) {
            commit('setPictureLoadStatus', 1);

            PictureAPI.getPicture(
                data.id
            ).then(function(response) {
                commit('setPictureLoadStatus', 2);
                commit('setPicture', response.data.data);
            }).catch(function() {
                commit('setPictureLoadStatus', 3);
                commit('setPicture', {});
            })
        },

        addPicture({commit, state, dispatch}, data) {
            commit('setAddPictureLoadStatus', 1);

            PictureAPI.addPicture(
                data.title,
                data.description,
                data.pic,
                data.election_id,
                data.location_id,
                data.location_type
            ).then(function(response) {
                commit('setAddPictureLoadStatus', 2);
                commit('setAddPictureResult', response.data);
            }).catch(function() {
                commit('setAddPictureLoadStatus', 3);
                commit('setAddPictureResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
            });
        },

        updatePicture({commit, state, dispatch}, data) {
            commit('setUpdatePictureLoadStatus', 1);

            PictureAPI.updatePicture(
                data.id,
                data.title,
                data.description
            ).then(function(response) {
                commit('setUpdatePictureLoadStatus', 2);
                commit('setUpdatePictureResult', response.data);
            }).catch(function() {
                commit('setUpdatePictureLoadStatus', 3);
                commit('setUpdatePictureResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
            });
        },

        deletePicture({commit, state, dispatch}, data) {
            commit('setDeletePictureLoadStatus', 1);

            PictureAPI.deletePicture(
                data.id
            ).then(function(response) {
                commit('setDeletePictureLoadStatus', 2);
                commit('setDeletePictureResult', response.data);
            }).catch(function() {
                commit('setDeletePictureLoadStatus', 3);
                commit('setDeletePictureResult', {
                    success: 0,
                    message: 'Something went wrong. Try again!'
                });
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

        setPicture(state, picture) {
            state.picture = picture;
        },

        setPictureLoadStatus(state, status) {
            state.pictureLoadStatus = status
        },

        setAddPictureLoadStatus(state, status) {
            state.addPictureLoadStatus = status;
        },

        setAddPictureResult(state, result) {
            state.addPictureResult = result;
        },

        setUpdatePictureLoadStatus(state, status) {
            state.updatePictureLoadStatus = status;
        },

        setUpdatePictureResult(state, result) {
            state.updatePictureResult = result;
        },

        setDeletePictureLoadStatus(state, status) {
            state.deletePictureLoadStatus = status;
        },

        setDeletePictureResult(state, result) {
            state.deletePictureResult = result;
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
        getPicture(state) {
            return state.picture;
        },
        getPictureLoadStatus(state) {
            return state.pictureLoadStatus;
        },
        getAddPictureLoadStatus(state) {
            return state.addPictureLoadStatus;
        },
        getAddPictureResult(state) {
            return state.addPictureResult;
        },
        getUpdatePictureLoadStatus(state) {
            return state.updatePictureLoadStatus;
        },
        getUpdatePictureResult(state) {
            return state.updatePictureResult;
        },
        getDeletePictureLoadStatus(state) {
            return state.deletePictureLoadStatus;
        },
        getDeletePictureResult(state) {
            return state.deletePictureResult;
        }
    }
};