<?php

namespace App\Http\Controllers\UniversityEntites;

use App\Http\Controllers\Controller;
use App\Http\Requests\Faculty\CreateFacultyRequest;
use App\Http\Requests\Faculty\UpdateFacultyRequest;
use App\Http\Resources\UniversityEntites\FacultyResource;
use App\Models\Faculty;

class FacultyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return FacultyResource::collection(Faculty::paginate());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\Faculty\CreateFacultyRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateFacultyRequest $request)
    {
        $faculty = Faculty::create($request->validated());
        return response()->json(new FacultyResource($faculty));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $faculty = Faculty::where('id', $id)->with('departments')->firstOrFail();
        return response()->json(new FacultyResource($faculty));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  App\Http\Requests\Faculty\UpdateFacultyRequest  $request
     * @param  \App\Models\Faculty  $faculty
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateFacultyRequest $request, Faculty $faculty)
    {
        $faculty->update($request->validated());
        return response()->json(new FacultyResource($faculty));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Faculty  $faculty
     * @return \Illuminate\Http\Response
     */
    public function destroy(Faculty $faculty)
    {
        $faculty->delete();
        return response()->json(new FacultyResource($faculty));
    }
}
