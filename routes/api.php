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
  Route::get('/election/{id}/liveUpdates', 'LiveUpdateController@electionLiveUpdates');
  Route::get('/election/{id}', 'ElectionController@show');
  Route::get('/liveUpdate/{id}', 'LiveUpdateController@show');
  Route::get('/election/{electionId}/location/{locationType}', 'LiveUpdateController@filterUpdatesBy');
});

//Route::get('/lg/coordinates/populate', 'LocalGovernmentController@getCoordinates');
