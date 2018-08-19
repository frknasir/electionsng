<?php

namespace App\Http\Controllers;

use App\LocalGovernment;
use App\State;
use Illuminate\Http\Request;
use App\Http\Resources\LocalGovernmentResource;
use App\Http\Requests\LocalGovernment\UpdateLocalGovernmentRequest;
use App\Utilities\GoogleMaps;

class LocalGovernmentController extends Controller {
    public function getCoordinates() {
        $lgs = LocalGovernment::all();

        for($i = 0; $i < count($lgs); $i++) {
            $lg = $lgs[$i];
            $localGov = LocalGovernment::find($lg->id);
            $state = State::find($lg->state_id);
            $coordinates = GoogleMaps::geocodeAddress( 
                $lg->name,
                $state->name
            );

            $localGov->latitude   = $coordinates['lat'];
            $localGov->longitude  = $coordinates['lng'];

            $localGov->save();
        }

        return $lgs;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function localGovernmentsFor($stateId) {
        $state = State::findOrFail($stateId);

        $localGovernments = $state->localGovernments;

        return LocalGovernmentResource::collection($localGovernments);
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
    public function store(Request $request) {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\LocalGovernment  $localGovernment
     * @return \Illuminate\Http\Response
     */
    public function show(LocalGovernment $localGovernment) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\LocalGovernment  $localGovernment
     * @return \Illuminate\Http\Response
     */
    public function edit(LocalGovernment $localGovernment) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\LocalGovernment  $localGovernment
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateLocalGovernmentRequest $request) {
        $localGovernment = LocalGovernment::findOrFail($request->input('id'));

        $localGovernment->latitude = $request->input('latitude');
        $localGovernment->longitude = $request->input('longitude');

        if($localGovernment->save()) {
            return response()->json([
                'success' => 1,
                'message' => 'local government updated successfully'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\LocalGovernment  $localGovernment
     * @return \Illuminate\Http\Response
     */
    public function destroy(LocalGovernment $localGovernment) {
        //
    }
}
