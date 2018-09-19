<?php

namespace App\Http\Controllers;

use App\PollingUnit;
use App\RegistrationArea;
use Illuminate\Http\Request;
use App\Http\Resources\PollingUnitResource;
use App\Http\Requests\PollingUnit\NewRequest;
use App\Http\Requests\PollingUnit\UpdateRequest;
use App\Http\Requests\PollingUnit\DelRequest;
use Auth;

class PollingUnitController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index($registrationAreaId) {
        $registrationArea = RegistrationArea::findOrFail($registrationAreaId);

        $pollingUnits = $registrationArea->pollingUnits;

        return PollingUnitResource::collection($pollingUnits);
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
        $pollingUnit = new PollingUnit();
        $user = Auth::user()->id;

        $pollingUnit->code = $request->input('code');
        $pollingUnit->description = $request->input('description');
        $pollingUnit->registration_area_id = $request->input('registration_area_id');
        $pollingUnit->latitude = $request->input('latitude');
        $pollingUnit->longitude = $request->input('longitude');
        $pollingUnit->added_by = $pollingUnit->updated_by = $user;

        if($pollingUnit->save()) {
            return response()->json([
                'success' => 1,
                'message' => 'polling unit added successfully'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\PollingUnit  $pollingUnit
     * @return \Illuminate\Http\Response
     */
    public function show($id) {
        $pollingUnit = PollingUnit::findOrFail($id);

        return new PollingUnitResource($pollingUnit);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PollingUnit  $pollingUnit
     * @return \Illuminate\Http\Response
     */
    public function edit(PollingUnit $pollingUnit) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PollingUnit  $pollingUnit
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request) {
        $pollingUnit = PollingUnit::findOrFail($request->input('id'));
        $user = Auth::user()->id;

        $pollingUnit->code = $request->input('code');
        $pollingUnit->description = $request->input('description');
        $pollingUnit->latitude = $request->input('latitude');
        $pollingUnit->longitude = $request->input('longitude');
        $pollingUnit->updated_by = $user;

        if($pollingUnit->save()) {
            return response()->json([
                'success' => 1,
                'message' => 'polling unit updated successfully'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PollingUnit  $pollingUnit
     * @return \Illuminate\Http\Response
     */
    public function destroy(DelRequest $request) {
        $pollingUnit = PollingUnit::findOrFail($request->input('id'));

        if($pollingUnit->delete()) {
            return response()->json([
                'success' => 1,
                'message' => 'polling unit deleted successfully'
            ]);
        }
    }
}
