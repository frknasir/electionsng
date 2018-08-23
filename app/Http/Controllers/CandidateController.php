<?php

namespace App\Http\Controllers;

use App\Candidate;
use Illuminate\Http\Request;
use App\Http\Resources\CandidateResource;
use App\Http\Requests\Candidate\NewCandidateRequest;
use App\Http\Requests\Candidate\UpdateCandidateRequest;
use App\Http\Requests\Candidate\DelCandidateRequest;

class CandidateController extends Controller
{
    /**
     * Display a listing of the resource.
     * based on the election id provided
     * @return \Illuminate\Http\Response
     */
    public function electionCandidates($electionId) {
        $candidates = Candidate::where(
            'election_id', 
            $electionId
        )->paginate(2); 

        return CandidateResource::collection($candidates);
    }

    public function politicalPartyCandidate($electionId, $politicalPartyId) {
        $candidates = Candidate::where(
            [
                'election_id' => $electionId,
                'political_party_id' => $politicalPartyId
            ]
        )->get(); 

        return CandidateResource::collection($candidates);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NewCandidateRequest $request)
    {
        $candidate = new Candidate();

        $candidate->political_party_id = $request->input('political_party_id');
        $candidate->election_id = $request->input('election_id');
        $candidate->aspirant = $request->input('aspirant');
        $candidate->deputy = $request->input('deputy');
        $candidate->bio = $request->input('bio');
        $candidate->added_by = $request->input('added_by');
        $candidate->updated_by = $request->input('updated_by');

        if($candidate->save()) {
            return response()->json([
                'success'=>1,
                'message'=>'candidate added successfully'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Candidate  $candidate
     * @return \Illuminate\Http\Response
     */
    public function show(Candidate $candidate)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Candidate  $candidate
     * @return \Illuminate\Http\Response
     */
    public function edit(Candidate $candidate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Candidate  $candidate
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCandidateRequest $request)
    {
        $candidate = Candidate::findOrFail($request->input('id'));

        $candidate->political_party_id = $request->input('political_party_id');
        $candidate->election_id = $request->input('election_id');
        $candidate->aspirant = $request->input('aspirant');
        $candidate->deputy = $request->input('deputy');
        $candidate->bio = $request->input('bio');
        $candidate->updated_by = $request->input('updated_by');

        if($candidate->save()) {
            return response()->json([
                'success' => 1,
                'message' => 'candidate updated successfully'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Candidate  $candidate
     * @return \Illuminate\Http\Response
     */
    public function destroy(DelCandidateRequest $request)
    {
        $candidate = Candidate::findOrFail($request->input('id'));

        if($candidate->delete()) {
            return response()->json([
                'success' => 1,
                'message' => 'candidate has been deleted successfully'
            ]);
        }
    }
}
