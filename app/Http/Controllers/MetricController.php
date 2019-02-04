<?php

namespace App\Http\Controllers;

use App\Election;
use App\LiveUpdate;
use App\Incident;
use App\User;
use App\Picture;
use Illuminate\Http\Request;

class MetricController extends Controller {

    public function index() {
        /**
         * total # of 
         * elections
         * updates
         * incidences
         * pollingPictures
         * users
         */
        $response = array();

        $response['elections'] = number_format(Election::all()->count());
        $response['updates'] = number_format(LiveUpdate::all()->count());
        $response['incidents'] = number_format(Incident::all()->count());
        $response['users'] = number_format(User::all()->count());
        $response['pictures'] = number_format(Picture::all()->count());

        return response()->json($response);
    }

}
