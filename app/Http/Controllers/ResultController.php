<?php

namespace App\Http\Controllers;

use App\Result;
use App\State;
use App\LocalGovernment;
use App\RegistrationArea;
use App\PollingUnit;
use App\Candidate;
use App\Election;
use Illuminate\Http\Request;
use App\Http\Resources\ResultResource;
use App\Http\Requests\Result\NewRequest;
use App\Http\Requests\Result\UpdateRequest;
use App\Http\Requests\Result\DelRequest;
use DB;
use Auth;

class ResultController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function stateResults($electionId, $stateId) {
        $candidates = Candidate::select('id')->where('election_id', $electionId)->get();
        $state = State::findOrFail($stateId);

        $results = $state->results()->select(
            DB::raw(
                'results.id, '.
                'candidates.id as candidate_id, '.
                'results.location_type, '.
                'results.location_id, '.
                'results.votes, '.
                'results.added_by, '.
                'results.created_at, '.
                'results.updated_at'
            )
        )->rightJoin(
            'candidates',
            'results.candidate_id',
            '=',
            'candidates.id'
        )->whereIn('candidates.id', $candidates)->get();

        return ResultResource::collection($results);
    }

    public function localGovernmentResults($electionId, $localGovernmentId) {
        $candidates = Candidate::select('id')->where(
            'election_id', 
            $electionId
        )->get();

        $localGovernment = LocalGovernment::findOrFail($localGovernmentId);

        $results = $localGovernment->results()->select(
            DB::raw(
                'results.id, '.
                'candidates.id as candidate_id, '.
                'results.location_type, '.
                'results.location_id, '.
                'results.votes, '.
                'results.added_by, '.
                'results.created_at, '.
                'results.updated_at'
            )
        )->rightJoin(
            'candidates',
            'results.candidate_id',
            '=',
            'candidates.id'
        )->whereIn('candidates.id', $candidates)->get();

        return ResultResource::collection($results);
    }

    public function registrationAreaResults($electionId, $registrationAreaId) {
        $candidates = Candidate::select('id')->where(
            'election_id', 
            $electionId
        )->get();
        $registrationArea = RegistrationArea::findOrFail($registrationAreaId);

        $results = $registrationArea->results()->select(
            DB::raw(
                'results.id, '.
                'candidates.id as candidate_id, '.
                'results.location_type, '.
                'results.location_id, '.
                'results.votes, '.
                'results.added_by, '.
                'results.created_at, '.
                'results.updated_at'
            )
        )->rightJoin(
            'candidates',
            'results.candidate_id',
            '=',
            'candidates.id'
        )->whereIn('candidates.id', $candidates)->get();

        return ResultResource::collection($results);
    }

    public function pollingUnitResults($electionId, $pollingUnitId) {
        $candidates = Candidate::select('id')->where(
            'election_id', 
            $electionId
        )->get();
        $pollingUnit = PollingUnit::findOrFail($pollingUnitId);

        $results = $pollingUnit->results()->select(
            DB::raw(
                'results.id, '.
                'candidates.id as candidate_id, '.
                'results.location_type, '.
                'results.location_id, '.
                'results.votes, '.
                'results.added_by, '.
                'results.created_at, '.
                'results.updated_at'
            )
        )->rightJoin(
            'candidates',
            'results.candidate_id',
            '=',
            'candidates.id'
        )->whereIn('candidates.id', $candidates)->get();

        return ResultResource::collection($results);
    }

    public function collationStats($electionId) {
        $stats = array();
        $stats['state'] = array();
        $stats['localGovernment'] = array();
        $stats['registrationArea'] = array();
        $stats['pollingUnit'] = array();

        $election = Election::findOrFail($electionId);
        $candidates = $election->candidates()->select('id')->get();

        

        if($election->election_type_id == 1) {
            #Presidential Elections

            /**
             * State
             */
            $stats['state']['total'] = State::count();
            $stats['state']['collated'] = Result::where(
                'location_type',
                'state'
            )->whereIn(
                'candidate_id',
                $candidates
            )->count();

            /**
             * Local Governments
             */
            $states = State::select('id')->get();
            $stats['localGovernment']['total'] = LocalGovernment::whereIn(
                'state_id',
                $states
            )->count();

            $stats['localGovernment']['collated'] = Result::where(
                'location_type',
                'localGovernment'
            )->whereIn(
                'candidate_id',
                $candidates
            )->count();

            /**
             * Registration Area
             */
            $lgs = LocalGovernment::select('id')->whereIn(
                'state_id',
                $states
            )->get();

            $stats['registrationArea']['total'] = RegistrationArea::whereIn(
                'local_government_id',
                $lgs
            )->count();

            $stats['registrationArea']['collated'] = Result::where(
                'location_type',
                'registrationArea'
            )->whereIn(
                'candidate_id',
                $candidates
            )->count();

            /**
             * Polling Unit
             */
            $ras = RegistrationArea::select('id')->whereIn(
                'local_government_id',
                $lgs
            );

            $stats['pollingUnit']['total'] = PollingUnit::whereIn(
                'registration_area_id',
                $ras
            )->count();

            $stats['pollingUnit']['collated'] = Result::where(
                'location_type',
                'pollingUnit'
            )->whereIn(
                'candidate_id',
                $candidates
            )->count();
        } else if($election->election_type_id == 2) {
            #Gubernatorial Elections

            /**
             * Local Governments
             */
            $stats['localGovernment']['total'] = State::findOrFail(
                $election->state_id
            )->localGovernments()->count();

            $stats['localGovernment']['collated'] = Result::where(
                'location_type',
                'localGovernment'
            )->whereIn(
                'candidate_id',
                $candidates
            )->count();

            /**
             * Registration Area
             */
            $lgs = State::findOrFail(
                $election->state_id
            )->localGovernments()->select('id')->get();

            $stats['registrationArea']['total'] = RegistrationArea::whereIn(
                'local_government_id',
                $lgs
            )->count();

            $stats['registrationArea']['collated'] = Result::where(
                'location_type',
                'registrationArea'
            )->whereIn(
                'candidate_id',
                $candidates
            )->count();

            /**
             * Polling Unit
             */
            $ras = RegistrationArea::select('id')->whereIn(
                'local_government_id',
                $lgs
            );

            $stats['pollingUnit']['total'] = PollingUnit::whereIn(
                'registration_area_id',
                $ras
            )->count();

            $stats['pollingUnit']['collated'] = Result::where(
                'location_type',
                'pollingUnit'
            )->whereIn(
                'candidate_id',
                $candidates
            )->count();
        } else if($election->election_type_id == 3) {
            /**
             * Local Government elections
             */
        }

        return $stats;
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
        $user = Auth::user()->id;

        $result->political_party_id = $request->input('political_party_id');
        $result->election_id = $request->input('election_id');
        $result->location_id = $request->input('location_id');
        $result->location_type = $request->input('location_type');
        $result->votes = $request->input('votes');
        $result->added_by = $result->updated_by = $user;

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
        $user = Auth::user()->id;

        $result->votes = $request->input('votes');
        $result->updated_by = $user;

        if($result->save()) {
            return response()->json([
                'success' => 1,
                'message' => 'result updated successfully'
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
