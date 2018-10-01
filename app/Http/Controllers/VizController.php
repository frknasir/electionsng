<?php

namespace App\Http\Controllers;

use App\Result;
use App\Incident;
use App\LiveUpdate;
use App\Election;
use App\Candidate;
use App\FinalResult;
use Illuminate\Http\Request;
use DB;

class VizController extends Controller
{
    public function getHeatMapData($electionId, $for) {
        $election = Election::findOrFail($electionId);
        $candidates = $election->candidates()->where('election_id', $electionId)->get();
        $data = array();

        switch ($for) {
            case 'results':
                for($i = 0; $i < count($candidates); $i++) {
                    $candidate = Candidate::findOrFail($candidates[0]['id']);
                    $res = $candidate->results()->with('location')->get();

                    foreach($res as $key => $value) {
                        $d = array();
                        array_push($d, $value['location']['latitude']);
                        array_push($d, $value['location']['longitude']);
                        array_push($d, $value['votes']);
                        array_push($data, $d); 
                    }
                }
                break;

            case 'updates':
                $res = $election->liveUpdates()->with('location')->get();

                foreach ($res as $key => $value) {
                    $d = array();
                    array_push($d, $value['location']['latitude']);
                    array_push($d, $value['location']['longitude']);
                    array_push($d, 10);
                    array_push($data, $d);   
                }
                break;

            case 'incidents':
                $res = $election->incidents()->with('location')->get();

                foreach ($res as $key => $value) {
                    $d = array();
                    array_push($d, $value['location']['latitude']);
                    array_push($d, $value['location']['longitude']);
                    array_push($d, 10);
                    array_push($data, $d);   
                }
                break;

            default:
                # code...
                break;
        }

        return $data;
    }

    public function getLocMostIncidentsData($electionId) {
        $election = Election::findOrFail($electionId);

        $results = $election->incidents()->with('location')->get();

        $incidents = array();

        for($i = 0; $i < count($results); $i++) {
            $result = $results[$i];
            $locname = $result['location_type'] == "pollingUnit" ? $result['location']['code'] : $result['location']['name'];

            if(array_key_exists($locname, $incidents)) {
                $incidents[$locname] += 1;
            } else {
                $incidents[$locname] = 1;
            }
        }

        //sort the array in descending according to values
        arsort($incidents,1);

        $data = array();

        foreach ($incidents as $key => $value) {
            $datum = array();
            array_push($datum, $key);
            array_push($datum, $value);
            array_push($data, $datum);
        }

        return array_slice($data, 0, 20);
    }

    public function getLocMostUpdatesData($electionId) {
        $election = Election::findOrFail($electionId);

        $results = $election->liveUpdates()->with('location')->get();

        $updates = array();

        for($i = 0; $i < count($results); $i++) {
            $result = $results[$i];
            $locname = $result['location_type'] == "pollingUnit" ? $result['location']['code'] : $result['location']['name'];

            if(array_key_exists($locname, $updates)) {
                $updates[$locname] += 1;
            } else {
                $updates[$locname] = 1;
            }
        }

        //sort the array in descending according to values
        arsort($updates,1);

        $data = array();

        foreach ($updates as $key => $value) {
            $datum = array();
            array_push($datum, $key);
            array_push($datum, $value);
            array_push($data, $datum);
        }

        return array_slice($data, 0, 20);
    }

    public function getFinalResultsData($electionId) {
        $candidates = Candidate::select('id')->where('election_id', $electionId)->get();

        $results = FinalResult::select(
            DB::raw(
                'candidates.id as candidate_id, '.
                'final_results.votes'
            )
        )->rightJoin(
            'candidates', 
            'final_results.candidate_id', 
            '=', 
            'candidates.id'
        )->whereIn('candidates.id', $candidates)->get();

        $data = array();
        
        for($i = 0; $i < count($results); $i++) {
            $result = $results[$i];

            $candidate = Candidate::findOrFail($result['candidate_id']);
            $party = $candidate->politicalParty()->select('initials')->get();
            $datum = array();
            array_push($datum, $party[0]['initials']);
            array_push($datum, $result['votes']);
            array_push($data, $datum);
        }

        return $data;
    }
}
