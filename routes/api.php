<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'v1', 'middleware' => 'auth:api'], function() {
    /**
     * User Routes
     */
    Route::get('/user', 'UserController@authenticatedUser');

    Route::get('/users', 'UserController@index');

    Route::get('/user/{id}', 'UserController@show');

    Route::post('/user', 'UserController@store');

    Route::put('/user', 'UserController@updated');

    Route::put('/user/{id}/changePassword', 'UserController@changeUserPassword');

    Route::delete('/user', 'UserController@destroy');

    /**
     * End User Routes
     */

    /**
     * Candidates Routes
     */
    Route::post(
      '/candidate',
      'CandidateController@store'
    );
    Route::put(
      '/candidate',
      'CandidateController@update'
    );
    Route::delete(
      '/candidate',
      'CandidateController@destroy'
    );
    /**
     * End Candidates Routes
     */
    /**
     * Live Updates Routes
     */
    Route::post(
      '/liveUpdate',
      'LiveUpdateController@store'
    );
    Route::put(
      '/liveUpdate',
      'LiveUpdateController@update'
    );
    Route::delete(
      '/liveUpdate',
      'LiveUpdateController@destroy'
    );
    /**
     * End Live Updates Routes
     */
    /**
     * Incident Routes
     */
    Route::post(
      '/incident',
      'IncidentController@store'
    );

    Route::put(
      '/incident',
      'IncidentController@update'
    );

    Route::delete(
      '/incident',
      'IncidentController@destroy'
    );
    /**
     * End Incident Routes
     */
    /**
     * Picture Routes
     */
    Route::post(
      '/picture',
      'PictureController@store'
    );
    Route::put(
      '/picture',
      'PictureController@update'
    );
    Route::delete(
      '/picture',
      'PictureController@destroy'
    );
    /**
     * End Picture Routes
     */

    /**
     * Election Routes
     */
    Route::post(
      '/election',
      'ElectionController@store'
    );
    Route::put(
      '/election',
      'ElectionController@update'
    );
    Route::delete(
      '/election',
      'ElectionController@destroy'
    );
    /**
     * End Election Routes
     */


    /**
     * Location Routes
     */
    Route::put(
      '/state',
      'StateController@update'
    );

    Route::put(
      '/localGovernment',
      'LocalGovernmentController@update'
    );

    Route::post(
      '/registrationArea',
      'RegistrationAreaController@store'
    );

    Route::put(
      '/registrationArea',
      'RegistrationAreaController@update'
    );

    Route::delete(
      '/registrationArea',
      'RegistrationAreaController@destroy'
    );

    Route::post(
      '/pollingUnit',
      'PollingUnitController@store'
    );

    Route::put(
      '/pollingUnit',
      'PollingUnitController@update'
    );

    Route::delete(
      '/pollingUnit',
      'PollingUnitController@destroy'
    );
    /**
     * End Location Routes
     */

    Route::post(
      '/politicalParty',
      'PoliticalPartyController@store'
    );

    Route::put(
      '/politicalParty',
      'PoliticalPartyController@update'
    );

    Route::delete(
      '/politicalParty', 
      'PoliticalPartyController@destroy'
    );

});

Route::group(['prefix'=> 'v1'], function() {

  /**
   * User and Roles routes
   */
  Route::get(
    '/roles',
    'RoleController@index'
  );
  /**
   * end User x Roles routes
   */

  /**
   * Elections Routes
   */
  Route::get(
    '/elections',
    'ElectionController@index'
  );
  Route::get(
    '/elections/ongoing',
    'ElectionController@ongoing'
  );
  Route::get(
    '/elections/upcoming',
    'ElectionController@upcoming'
  );
  Route::get(
    '/elections/archived',
    'ElectionController@archived'
  );
  Route::get(
    '/election/{id}', 
    'ElectionController@show'
  );
  Route::get(
    '/electionTypes',
    'ElectionTypeController@index'
  );
  /**
   * End Elections Routes
   */

  /**
   * Candidates Routes
   */
  Route::get(
    '/election/{id}/candidates', 
    'CandidateController@electionCandidates'
  );

  Route::get(
    '/candidate/{id}',
    'CandidateController@show'
  );
  /**
   * End Candidates Routes
   */

  /**
   * Live Updates Routes
   */
  Route::get(
    '/election/{id}/liveUpdates/limit/{limit}', 
    'LiveUpdateController@electionLiveUpdates'
  );

  Route::get(
    '/election/{electionId}/location/{locationType}/liveUpdates/limit/{limit}', 
    'LiveUpdateController@filterUpdatesBy'
  );

  Route::get(
    '/liveUpdate/{id}', 
    'LiveUpdateController@show'
  );
  /**
   * End Live Updates Routes
   */

  /**
   * Pictures Routes
   */
  Route::get(
    '/election/{id}/pictures', 
    'PictureController@index'
  );
  /**
   * End Pictures Routes
   */
  
  /**
   * Incidents Routes
   */
  Route::get(
    'incidentTypes',
    'IncidentTypeController@index'
  );

  Route::get(
    '/election/{id}/incidents/limit/{limit}', 
    'IncidentController@electionIncidents'
  );

  Route::get(
    '/election/{electionId}/location/{locationType}/incidents/limit/{limit}', 
    'IncidentController@filterIncidentsBy'
  );

  Route::get(
    '/incident/{id}', 
    'IncidentController@show'
  );
  /**
   * End Incidents Routes
   */
  
  /**
   * Locations Routes
   */
  Route::get(
    '/states',
    'StateController@index'
  );

  Route::get(
    '/state/{id}',
    'StateController@show'
  );

  Route::get(
    '/state/{stateId}/localGovernments',
    'LocalGovernmentController@index'
  );

  Route::get(
    '/localGovernment/{id}',
    'LocalGovernmentController@show'
  );

  Route::get(
    '/localGovernment/{lgId}/registrationAreas',
    'RegistrationAreaController@index'
  );

  Route::get(
    '/registrationArea/{id}',
    'RegistrationAreaController@show'
  );

  Route::get(
    '/registrationArea/{raId}/pollingUnits',
    'PollingUnitController@index'
  );

  Route::get(
    '/pollingUnit/{id}',
    'PollingUnitController@show'
  );
  /**
   * End Location Routes
   */

  /**
   * Results Routes
   */
  Route::get(
    '/election/{electionId}/finalResults', 
    'FinalResultController@index'
  );

  Route::get(
    '/election/{electionId}/state/{stateId}/results',
    'ResultController@stateResults'
  );

  Route::get(
    '/election/{electionId}/localGovernment/{lgId}/results',
    'ResultController@localGovernmentResults'
  );

  Route::get(
    '/election/{electionId}/registrationArea/{raId}/results',
    'ResultController@registrationAreaResults'
  );

  Route::get(
    '/election/{electionId}/pollingUnit/{puId}/results',
    'ResultController@pollingUnitResults'
  );

  Route::get(
    '/election/{electionId}/collationStats',
    'ResultController@collationStats'
  );
  /**
   * End Results Routes
   */

  /**
   * Political Party Routes
   */
  Route::get(
    '/politicalParties',
    'PoliticalPartyController@index'
  );

  Route::get(
    '/politicalParty/{id}', 
    'PoliticalPartyController@show'
  );
  /**
   * End Political Party Routes
   */

  /**
   * picture routes
   */
  Route::get(
    '/picture/{id}',
    'PictureController@show'
  );
  /**
   * end picture routes
   */
});

//Route::get('/lg/coordinates/populate', 'LocalGovernmentController@getCoordinates');
