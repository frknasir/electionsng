<?php

namespace App\Http\Controllers;

use App\IncidentType;
use Illuminate\Http\Request;
use App\Http\Resources\IncidentTypeResource;
use App\Http\Requests\IncidentType\NewRequest;
use App\Http\Requests\IncidentType\UpdateRequest;
use App\Http\Requests\IncidentType\DelRequest;
use Auth;

class IncidentTypeController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $incidentTypes = IncidentType::all();

        return IncidentTypeResource::collection($incidentTypes);
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
        $incidentType = new IncidentType();

        $incidentType->name = $request->input('name');

        if($incidentType->save()) {
            return response()->json([
                'success' => 1,
                'message' => 'incident type added successfully'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\IncidentType  $incidentType
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $incidentType = IncidentType::findOrFail($id);

        return new IncidentTypeResource($incidentType);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\IncidentType  $incidentType
     * @return \Illuminate\Http\Response
     */
    public function edit(IncidentType $incidentType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\IncidentType  $incidentType
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request)
    {
        $incidentType = IncidentType::findOrFail($request->input('id'));

        $incidentType->name = $request->input('name');

        if($incidentType->save()) {
            return response()->json([
                'success' => 1,
                'message' => 'incident type updated successfully'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\IncidentType  $incidentType
     * @return \Illuminate\Http\Response
     */
    public function destroy(DelRequest $request)
    {
        $incidentType = IncidentType::findOrFail($request->input('id'));

        if($incidentType->delete()) {
            return response()->json([
                'success' => 1,
                'message' => 'incident type deleted successfully'
            ]);
        }
    }
}
