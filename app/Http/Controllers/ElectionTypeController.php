<?php

namespace App\Http\Controllers;

use App\ElectionType;
use Illuminate\Http\Request;
use App\Http\Resources\ElectionTypeResource;

class ElectionTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $electionTypes = ElectionType::all();

        return ElectionTypeResource::collection($electionTypes);
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ElectionType  $electionType
     * @return \Illuminate\Http\Response
     */
    public function show(ElectionType $electionType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ElectionType  $electionType
     * @return \Illuminate\Http\Response
     */
    public function edit(ElectionType $electionType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ElectionType  $electionType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ElectionType $electionType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ElectionType  $electionType
     * @return \Illuminate\Http\Response
     */
    public function destroy(ElectionType $electionType)
    {
        //
    }
}
