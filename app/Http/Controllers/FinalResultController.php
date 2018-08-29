<?php

namespace App\Http\Controllers;

use App\FinalResult;
use App\Candidate;
use Illuminate\Http\Request;
use App\Http\Resources\FinalResultResource;
use App\Http\Requests\FinalResult\NewRequest;
use App\Http\Requests\FinalResult\UpdateRequest;
use App\Http\Requests\FinalResult\DelRequest;

class FinalResultController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($electionId) { 
        $results = [];
        $candidates = Candidate::where('election_id', $electionId);

        for($i = 0; $i < count($candidates); $i++) {
            $result = $candidates[$i]->finalResult();
            array_push($results, $result);
        }

        return FinalResultResource::collection($results);
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
        $finalResult = new FinalResult();
        $finalResult->candidate_id = $request->input('candidate_id');
        $finalResult->votes = $request->input('votes');
        $finalResult->added_by = $request->input('added_by');
        $finalResult->updated_by = $request->input('updated_by');

        if($finalResult->save()) {
            return response()->json([
                'success' => 1,
                'message' => 'result added successfully'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\FinalResult  $finalResult
     * @return \Illuminate\Http\Response
     */
    public function show(FinalResult $finalResult) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\FinalResult  $finalResult
     * @return \Illuminate\Http\Response
     */
    public function edit(FinalResult $finalResult) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\FinalResult  $finalResult
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request) {
        $finalResult = FinalResult::findOrFail($request->input('id'));
        $finalResult->votes = $request->input('votes');
        $finalResult->updated_by = $request->input('updated_by');

        if($finalResult->save()) {
            return response()->json([
                'success' => 1,
                'message' => 'result added successfully'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\FinalResult  $finalResult
     * @return \Illuminate\Http\Response
     */
    public function destroy(DelRequest $request) {
        $finalResult = FinalResult::findOrFail($request->input('id'));

        if($finalResult->delete()) {
            return response()->json([
                'success' => 1,
                'message' => 'result deleted successfully'
            ]);
        }
    }
}
