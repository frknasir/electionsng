<?php

namespace App\Http\Controllers;

use App\Election;
use Illuminate\Http\Request;
use App\Http\Requests\Election\NewElectionRequest;
use App\Http\Requests\Election\UpdateElectionRequest;
use App\Http\Requests\Election\DelElectionRequest;
use App\Http\Resources\ElectionResource;

class ElectionController extends Controller
{
    protected $today;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $elections = Election::orderBy('created_at', 'desc')->paginate(20);

        return ElectionResource::collection($elections);
    }

    public function ongoing() {
        $this->today = date('Y-m-d');

        $elections = Election::whereDate('date', $this->today)->get();

        return ElectionResource::collection($elections);
    }

    public function upcoming() {
        $this->today = date('Y-m-d');

        $elections = Election::whereDate(
            'date',
            '<',
            $this->today
        )->get();

        return ElectionResource::collection($elections);
    }

    public function archived() {
        $this->today = date('Y-m-d');

        $elections = Election::whereDate(
            'date',
            '>',
            $this->today
        )->get();

        return ElectionResource::collection($elections);
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
    public function store(NewElectionRequest $request)
    {
        $election = new Election();

        $election->title = $request->input('title');
        $election->election_type_id = $request->input('election_type_id');
        $election->state_id = $request->input('state_id');
        $election->registered_voters = $request->input('registered_voters');
        $election->accredited_voters = $request->input('accredited_voters');
        $election->votes_cast = $request->input('votes_cast');
        $election->valid_votes = $request->input('valid_votes');
        $election->rejected_votes = $request->input('rejected_votes');
        $election->date = $request->input('date');
        $election->added_by = $request->input('added_by');
        $election->updated_by = $request->input('updated_by');

        if($election->save()) {
            return response()->json([
                'success'=>1,
                'message'=>'election added successfully'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Election  $election
     * @return \Illuminate\Http\Response
     */
    public function show($electionId)
    {
        $election = Election::findOrFail($electionId);

        return new ElectionResource($election);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Election  $election
     * @return \Illuminate\Http\Response
     */
    public function edit(Election $election)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Election  $election
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateElectionRequest $request)
    {
        $election = Election::findOrFail($request->input('id'));

        $election->title = $request->input('title');
        $election->election_type_id = $request->input('election_type_id');
        $election->state_id = $request->input('state_id');
        $election->registered_voters = $request->input('registered_voters');
        $election->accredited_voters = $request->input('accredited_voters');
        $election->votes_cast = $request->input('votes_cast');
        $election->valid_votes = $request->input('valid_votes');
        $election->rejected_votes = $request->input('rejected_votes');
        $election->date = $request->input('date');
        $election->added_by = $request->input('added_by');
        $election->updated_by = $request->input('updated_by');

        if($election->save()) {
            return response()->json([
                'success'=>1,
                'message'=>'election updated successfully'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Election  $election
     * @return \Illuminate\Http\Response
     */
    public function destroy(DelElectionRequest $request)
    {
        $election = Election::findOrFail($request->input('id'));

        if($election->delete()) {
            return response()->json([
                'success'=>1,
                'message'=>'election deleted successfully'
            ]);
        }
    }
}
