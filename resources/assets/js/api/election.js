/*
    Imports the API URL from the config.
*/
import { CONFIG } from '../config.js';

export default {
    /**
     * GET /api/v1/elections
     */
    getElections: function() {
        return axios.get(
            CONFIG.API_URL +
            '/elections'
        );
    },
    
    /*
        GET /api/v1/elections/ongoing
    */
    getOngoing: function() {
        return axios.get( CONFIG.API_URL + '/elections/ongoing' );
    },

    /*
    GET /api/v1/elections/upcoming
    */
    getUpcoming: function() {
        return axios.get( CONFIG.API_URL + '/elections/upcoming' );
    },

    /**
     * GET /api/v1/elections/archived 
    */
    getArchived: function() {
        return axios.get( CONFIG.API_URL + '/elections/archived');
    },

    /**
     * GET /api/v1/election/{electioin_id}
     */
    getElection: function(electionId) {
        return axios.get(
            CONFIG.API_URL +
            '/election/' +
            electionId
        );
    },

    /** 
     * POST  /api/v1/election
    */
    addElection: function ( 
        title, 
        election_type_id, 
        state_id, 
        registered_voters, 
        accredited_voters,
        votes_cast,
        valid_votes,
        rejected_votes,
        date
    ) {
        return axios.post( CONFIG.API_URL + '/election', {
            title: title,
            election_type_id: election_type_id,
            state_id: state_id,
            registered_voters: registered_voters,
            accredited_voters: accredited_voters,
            votes_cast: votes_cast,
            valid_votes: valid_votes,
            rejected_votes: rejected_votes,
            date: date
        });
    },

    /**
     * PUT /api/v1/election
     */
    updateElection: function ( 
        id,
        title, 
        election_type_id, 
        state_id, 
        registered_voters, 
        accredited_voters,
        votes_cast,
        valid_votes,
        rejected_votes,
        date
    ) {
        return axios.put( CONFIG.API_URL + '/election', {
            id: id,
            title: title,
            election_type_id: election_type_id,
            state_id: state_id,
            registered_voters: registered_voters,
            accredited_voters: accredited_voters,
            votes_cast: votes_cast,
            valid_votes: valid_votes,
            rejected_votes: rejected_votes,
            date: date
        });
    },

    /**
     * DELETE /api/v1/election
     */
    deleteElection: function (
        id
    ) {
        return axios.delete( CONFIG.API_URL + '/election', {
            params: {
                id: id
            }
        });
    }
};