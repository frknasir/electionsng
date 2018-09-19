<?php

namespace App\Http\Controllers;

use App\PoliticalParty;
use Illuminate\Http\Request;
use App\Http\Resources\PoliticalPartyResource;
use App\Http\Requests\PoliticalParty\NewRequest;
use App\Http\Requests\PoliticalParty\UpdateRequest;
use App\Http\Requests\PoliticalParty\DelRequest;
use Auth;

class PoliticalPartyController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() { 
        $politicalParties = PoliticalParty::all();

        return PoliticalPartyResource::collection($politicalParties);
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
        $politicalParty = new PoliticalParty();
        $user = Auth::user()->id;

        $politicalParty->initials = $request->input('initials');
        $politicalParty->name = $request->input('name');
        $politicalParty->added_by = $politicalParty->updated_by = $user;

        if($politicalParty->save()) {
            return response()->json([
                'success' => 1,
                'message' => 'political party added successfully'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\PoliticalParty  $politicalParty
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        $politicalParty = PoliticalParty::findOrFail($id);

        return new PoliticalPartyResource($politicalParty);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PoliticalParty  $politicalParty
     * @return \Illuminate\Http\Response
     */
    public function edit(PoliticalParty $politicalParty) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PoliticalParty  $politicalParty
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request) {
        $politicalParty = PoliticalParty::findOrFail($request->input('id'));
        $user = Auth::user()->id;

        $politicalParty->initials = $request->input('initials');
        $politicalParty->name = $request->input('name');
        $politicalParty->updated_by = $user;

        if($politicalParty->save()) {
            return response()->json([
                'success' => 1,
                'message' => 'political party updated successfully'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PoliticalParty  $politicalParty
     * @return \Illuminate\Http\Response
     */
    public function destroy(DelRequest $request) {
        $politicalParty = PoliticalParty::findOrFail($request->input('id'));

        if($politicalParty->delete()) {
            return response()->json([
                'success' => 1, 
                'message' => 'political party deleted successfully'
            ]);
        }
    }
}
