<?php

namespace App\Http\Controllers;

use App\LiveUpdate;
use App\Election;
use App\State;
use App\LocalGovernment;
use App\RegistrationArea;
use App\PollingUnit;
use Illuminate\Http\Request;
use App\Http\Resources\LiveUpdateResource;
use App\Http\Requests\LiveUpdate\NewLiveUpdateRequest;
use App\Http\Requests\LiveUpdate\UpdateLiveUpdateRequest;
use App\Http\Requests\LiveUpdate\DelLiveUpdateRequest;

class LiveUpdateController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function electionLiveUpdates($electionId) {
        $election = Election::findOrFail($electionId);

        $liveUpdates = $election->liveUpdates()->paginate(2);

        return LiveUpdateResource::collection($liveUpdates);
    }

    public function stateLiveUpdates($electionId, $stateId) {
        $state = State::findOrFail($stateId);

        $liveUpdates = $election->liveUpdates()->where('election_id', $electionId)->paginate(20);

        return LiveUpdateResource::collection($liveUpdates);
    }

    public function localGovernmentLiveUpdates($electionId, $localGovernmentId) {
        $localGovernment = LocalGovernment::findOrFail($localGovernmentId);

        $liveUpdates = $election->liveUpdates()->where('election_id', $electionId)->paginate(20);

        return LiveUpdateResource::collection($liveUpdates);
    }

    public function registrationAreaLiveUpdates($electionId, $registrationAreaId) {
        $registrationArea = RegistrationArea::findOrFail($registrationAreaId);

        $liveUpdates = $registrationArea->liveUpdates()->where('election_id', $electionId)->paginate(20);

        return LiveUpdateResource::collection($liveUpdates);
    }

    public function pollingUnitLiveUpdates($electionId, $pollingUnitId) {
        $pollingUnit = PollingUnit::findOrFail($pollingUnitId);

        $liveUpdates = $pollingUnit->liveUpdates()->where('election_id', $electionId)->paginate(20);

        return LiveUpdateResource::collection($liveUpdates);
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
    public function store(NewLiveUpdateRequest $request) {
        $liveUpdate = new LiveUpdate();

        $liveUpdate->title = $request->input('title');
        $liveUpdate->description = $request->input('description');
        $liveUpdate->election_id = $request->input('election_id');
        $liveUpdate->location_id = $request->input('location_id');
        $liveUpdate->location_type = $request->input('location_type');
        $liveUpdate->added_by = $request->input('added_by');
        $liveUpdate->updated_by = $request->input('updated_by');

        if($liveUpdate->save()) {
            return response()->json([
                'success' => 1,
                'message' => 'update saved successfully'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\LiveUpdate  $liveUpdate
     * @return \Illuminate\Http\Response
     */
    public function show(LiveUpdate $liveUpdate) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\LiveUpdate  $liveUpdate
     * @return \Illuminate\Http\Response
     */
    public function edit(LiveUpdate $liveUpdate) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\LiveUpdate  $liveUpdate
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateLiveUpdateRequest $request) {
        $liveUpdate = LiveUpdate::findOrFail($request->input('id'));

        $liveUpdate->title = $request->input('title');
        $liveUpdate->description = $request->input('description');
        $liveUpdate->election_id = $request->input('election_id');
        $liveUpdate->location_id = $request->input('location_id');
        $liveUpdate->location_type = $request->input('location_type');
        $liveUpdate->added_by = $request->input('added_by');
        $liveUpdate->updated_by = $request->input('updated_by');

        if($liveUpdate->save()) {
            return response()->json([
                'success' => 1,
                'message' => 'update updated successfully'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\LiveUpdate  $liveUpdate
     * @return \Illuminate\Http\Response
     */
    public function destroy(DelLiveUpdateRequest $request) {
        $liveUpdate = LiveUpdate::findOrFail($request->input('id'));

        if($liveUpdate->save()) {
            return response()->json([
                'success' => 1,
                'message' => 'update deleted successfully'
            ]);
        }
    }
}
