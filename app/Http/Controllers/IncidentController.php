<?php

namespace App\Http\Controllers;

use App\Incident;
use App\State;
use App\LocalGovernment;
use App\RegistrationArea;
use App\PollingUnit;
use App\Election;
use Illuminate\Http\Request;
use App\Http\Resources\IncidentResource;
use App\Http\Requests\Incident\NewIncidentRequest;
use App\Http\Requests\Incident\UpdateIncidentRequest;
use App\Http\Requests\Incident\DelIncidentRequest;
use Auth;

class IncidentController extends Controller { 
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function electionIncidents($electionId, $l) {
        $election = Election::findOrFail($electionId);

        $incidents = $election->incidents()->paginate($l);

        return IncidentResource::collection($incidents);
    }

    public function stateIncidents($electionId, $stateId) {
        $state = State::findOrFail($stateId);

        $incidents = $state->incidents()->where('election_id', $electionId)->paginate(20);

        return IncidentResource::collection($incidents);
    }

    public function localGovernmentIncidents($electionId, $localGovernmentId) {
        $localGovernment = LocalGovernment::findOrFail($localGovernmentId);

        $incidents = $localGovernment->incidents()->where('election_id', $electionId)->paginate(20);

        return IncidentResource::collection($incidents);
    }

    public function registrationAreaIncidents($electionId, $registrationAreaId) {
        $registrationArea = RegistrationArea::findOrFail($registrationAreaId);

        $incidents = $registrationArea->incidents()->where('election_id', $electionId)->paginate(20);

        return IncidentResource::collection($incidents);
    }

    public function pollingUnitIncidents($electionId, $pollingUnitId) {
        $pollingUnit = PollingUnit::findOrFail($pollingUnitId);

        $incidents = $pollingUnit->incidents()->where('election_id', $electionId)->paginate(20);

        return IncidentResource::collection($incidents);
    }

    public function filterIncidentsBy($electionId, $locationType, $l) {
        $election = Election::findOrFail($electionId);

        $incidents = $election->incidents()->where('location_type', $locationType)->paginate($l);

        return IncidentResource::collection($incidents);
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
    public function store(NewIncidentRequest $request) {
        $incident = new Incident();
        $user = Auth::user()->id;

        $incident->title = $request->input('title');
        $incident->description = $request->input('description');
        $incident->incident_type_id = $request->input('incident_type_id');
        $incident->election_id = $request->input('election_id');
        $incident->location_id = $request->input('location_id');
        $incident->location_type = $request->input('location_type');
        $incident->added_by = $incident->updated_by = $user;

        if($incident->save()) {
            return response()->json([
                'success'=>1,
                'message'=>'incident added successfully'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Incident  $incident
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        $incident = Incident::findOrFail($id);

        return new IncidentResource($incident);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Incident  $incident
     * @return \Illuminate\Http\Response
     */
    public function edit(Incident $incident) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Incident  $incident
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateIncidentRequest $request) {
        $incident = Incident::findOrFail($request->input('id'));
        $user = Auth::user()->id;

        $incident->title = $request->input('title');
        $incident->description = $request->input('description');
        $incident->incident_type_id = $request->input('incident_type_id');
        $incident->updated_by = $user;

        if($incident->save()) {
            return response()->json([
                'success'=>1,
                'message'=>'incident updated successfully'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Incident  $incident
     * @return \Illuminate\Http\Response
     */
    public function destroy(DelIncidentRequest $request) {
        $incident = Incident::findOrFail($request->input('id'));

        if($incident->delete()) {
            return response()->json([
                'success'=>1,
                'message'=>'incident deleted successfully'
            ]);
        }
    }
}
