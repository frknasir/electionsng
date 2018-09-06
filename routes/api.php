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

Route::group(['prefix' => 'v1', 'middleware' => 'auth:api'], function(){
    Route::get('/user', function( Request $request ){
      return $request->user();
    });
});

Route::group(['prefix'=> 'v1'], function() {
  Route::get('/election/{id}/candidates', 'CandidateController@electionCandidates');

  Route::get(
    '/election/{id}/liveUpdates/limit/{limit}', 
    'LiveUpdateController@electionLiveUpdates'
  );

  Route::get(
    '/election/{electionId}/location/{locationType}/liveUpdates/limit/{limit}', 
    'LiveUpdateController@filterUpdatesBy'
  );
  
  Route::get('/election/{id}', 'ElectionController@show');
  Route::get('/liveUpdate/{id}', 'LiveUpdateController@show');
  
  Route::get(
    '/election/{id}/incidents/limit/{limit}', 
    'IncidentController@electionIncidents'
  );

  Route::get(
    '/election/{electionId}/location/{locationType}/incidents/limit/{limit}', 
    'IncidentController@filterIncidentsBy'
  );

  Route::get(
    '/states',
    'StateController@index'
  );

  Route::get(
    '/state/{stateId}/localGovernments',
    'LocalGovernmentController@index'
  );

  Route::get(
    '/localGovernment/{lgId}/registrationAreas',
    'RegistrationAreaController@index'
  );

  Route::get(
    '/registrationArea/{raId}/pollingUnits',
    'PollingUnitController@index'
  );

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
});

//Route::get('/lg/coordinates/populate', 'LocalGovernmentController@getCoordinates');
