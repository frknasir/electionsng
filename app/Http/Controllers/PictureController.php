<?php

namespace App\Http\Controllers;

use App\Picture;
use App\Http\Resources\PictureResource;
use Illuminate\Http\Request;
use App\Http\Requests\Picture\NewRequest;
use App\Http\Requests\Picture\UpdateRequest;
use App\Http\Requests\Picture\DelRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Auth;

class PictureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($electionId)
    {
        $pictures = Picture::where(
            'election_id', 
            $electionId
        )->orderBy('created_at', 'desc')->paginate();

        return PictureResource::collection($pictures);
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
        if($request->hasFile('pic')) {
            //Get filename with the extension
            $filenameWithExt = $request->file('pic')->getClientOriginalName();
            //get just filename
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            //get just ext
            $extension = $request->file('pic')->getClientOriginalExtension();
            //filename to store
            $uuid = Str::uuid();
            $filenameToStore = $uuid.'.'.$extension;
            // upload image
            $path = $request->file('pic')->storeAs('public/pictures', $filenameToStore);
        } else {
            return response()->json([
                'success' => 0,
                'message' => 'no image file was detected'
            ]);
        }

        $picture = new Picture();
        $user = Auth::user()->id;

        $picture->title = $request->input('title');
        $picture->description = $request->input('description');
        $picture->url = "pictures/".$filenameToStore;
        $picture->election_id = $request->input('election_id');
        $picture->location_id = $request->input('location_id');
        $picture->location_type = $request->input('location_type');
        $picture->added_by = $picture->updated_by = $user;

        if($picture->save()) {
            return response()->json([
                'success' => 1,
                'message' => 'picture saved successfully'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Picture  $picture
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $picture = Picture::findOrFail($id);

        return new PictureResource($picture);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Picture  $picture
     * @return \Illuminate\Http\Response
     */
    public function edit(UpdateRequest $request)
    {
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Picture  $picture
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request)
    {
        $picture = Picture::findOrFail($request->input('id'));
        $user = Auth::user()->id;

        $picture->title = $request->input('title');
        $picture->description = $request->input('description');
        $picture->updated_by = $user;

        if($picture->save()) {
            return response()->json([
                'success' => 1,
                'message' => 'picture updated successfully'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Picture  $picture
     * @return \Illuminate\Http\Response
     */
    public function destroy(DelRequest $request)
    {
        $picture = Picture::findOrFail($request->input('id'));

        Storage::delete('public/'.$picture->url);

        if($picture->delete()) {
            return response()->json([
                'success' => 1,
                'message' => 'picture deleted successfully'
            ]);
        }
    }
}
