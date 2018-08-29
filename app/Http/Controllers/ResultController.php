<?php

namespace App\Http\Controllers;

use App\Result;
use App\State;
use App\LocalGovernment;
use App\RegistrationArea;
use App\PollingUnit;
use App\Candidate;
use Illuminate\Http\Request;
use App\Http\Resources\ResultResource;
use App\Http\Requests\Result\NewRequest;
use App\Http\Requests\Result\UpdateRequest;
use App\Http\Requests\Result\DelRequest;

class ResultController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function electionResults($electionId) {
        $candidates = Candidate::where('election_id', $electionId);

        $results = $candidates->results;

        return ResultResource::collection($results);
    }

    public function stateResults($electionId, $stateId) {
        $state = State::findOrFail($stateId);

        $results = $state->results()->where('election_id', $electionId)->paginate(20);

        return ResultResource::collection($results);
    }

    public function localGovernmentResults($electionId, $localGovernmentId) {
        $localGovernment = LocalGovernment::findOrFail($localGovernmentId);

        $results = $localGovernment->results()->where('election_id', $electionId)->paginate(20);

        return ResultsResource::collection($results);
    }

    public function registrationAreaResults($electionId, $registrationAreaId) {
        $registrationArea = RegistrationArea::findOrFail($registrationAreaId);

        $results = $registrationArea->results()->where('election_id', $electionId)->paginate(20);

        return ResultResource::collection($results);
    }

    public function pollingUnitResults($electionId, $pollingUnitId) {
        $pollingUnit = PollingUnit::findOrFail($pollingUnitId);

        $results = $pollingUnit->results()->where('election_id', $electionId)->paginate(20);

        return ResultResource::collection($results);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NewRequest $request) {
        $result = new Result();

        $result->political_party_id = $request->input('political_party_id');
        $result->election_id = $request->input('election_id');
        $result->location_id = $request->input('location_id');
        $result->location_type = $request->input('location_type');
        $result->votes = $request->input('votes');
        $result->added_by = $request->input('added_by');
        $result->updated_by = $request->input('updated_by');

        if($result->save()) {
            return response()->json([
                'success' => 1,
                'message' => 'result added successfully'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Result  $result
     * @return \Illuminate\Http\Response
     */
    public function show(Result $result) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Result  $result
     * @return \Illuminate\Http\Response
     */
    public function edit(Result $result) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Result  $result
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request) {
        $result = Result::findOrFail($request->input('id'));

        $result->votes = $request->input('votes');
        $result->updated_by = $request->input('updated_by');

        if($result->save()) {
            return response()->json([
                'success' => 1,
                'message' => 'result added successfully'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Result  $result
     * @return \Illuminate\Http\Response
     */
    public function destroy(DelRequest $request) {
        $result = Result::findOrFail($request->input('id'));

        if($result->delete()) {
            return response()->json([
                'success' => 1,
                'message' => 'result deleted successfully'
            ]);
        }
    }
}
