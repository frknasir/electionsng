<?php

namespace App\Http\Controllers;

use App\RegistrationArea;
use App\LocalGovernment;
use Illuminate\Http\Request;
use App\Http\Resources\RegistrationAreaResource;
use App\Http\Requests\RegistrationArea\NewRequest;
use App\Http\Requests\RegistrationArea\UpdateRequest;

class RegistrationAreaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index($localGovernmentId) {
        $localGovernment = LocalGovernment::findOrFail($localGovernmentId);

        $registrationAreas = $localGovernment->registrationAreas;

        return RegistrationAreaResource::collection($registrationAreas);
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
    public function store(NewRequest $request)
    {
        $registrationArea = new RegistrationArea();

        $registrationArea->name = $request->input('name');
        $registrationArea->local_government_id = $request->input('local_government_id');
        $registrationArea->latitude = $request->input('latitude');
        $registrationArea->longitude = $request->input('longitude');
        $registrationArea->added_by = $request->input('added_by');
        $registrationArea->updated_by = $request->input('updated_by');

        if($registrationArea->save()) {
            return response()->json([
                'success' => 1,
                'message' => 'Registration area added successfully'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\RegistrationArea  $registrationArea
     * @return \Illuminate\Http\Response
     */
    public function show(RegistrationArea $registrationArea)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\RegistrationArea  $registrationArea
     * @return \Illuminate\Http\Response
     */
    public function edit(RegistrationArea $registrationArea)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\RegistrationArea  $registrationArea
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request)
    {
        $registrationArea = RegistrationArea::findOrFail($request->input('id'));

        $registrationArea->name = $request->input('name');
        $registrationArea->latitude = $request->input('latitude');
        $registrationArea->longitude = $request->input('longitude');
        $registrationArea->updated_by = $request->input('updated_by');

        if($registrationArea->save()) {
            return response()->json([
                'success' => 1,
                'message' => 'Registration area updated successfully'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\RegistrationArea  $registrationArea
     * @return \Illuminate\Http\Response
     */
    public function destroy(RegistrationArea $registrationArea)
    {
        //
    }
}
