<?php

namespace App\Http\Controllers\UniversityEntites;

use App\Http\Controllers\Controller;
use App\Http\Requests\Department\CreateDepartmentRequest;
use App\Http\Requests\Department\UpdateDepartmentRequest;
use App\Http\Resources\UniversityEntites\DepartmentResource;
use App\Models\Department;
use App\Models\Faculty;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DepartmentResource::collection(Department::paginate());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\User\CreateUserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateDepartmentRequest $request)
    {
        $department = Department::create($request->validated());
        return response()->json(new DepartmentResource($department));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $department = Department::where('id', $id)->with('faculty')->firstOrFail();
        return response()->json(new DepartmentResource($department));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  App\Http\Requests\Department\UpdateDepartmentRequest  $request
     * @param  \App\Models\Department  $department
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDepartmentRequest $request, Department $department)
    {
        $department->update($request->validated());
        return response()->json(new DepartmentResource($department));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Department  $department
     * @return \Illuminate\Http\Response
     */
    public function destroy(Department $department)
    {
        $department->delete();
        return response()->json(new DepartmentResource($department));
    }

    /**
     * Assign the faculty to the chosen department.
     *
     * @param \App\Models\Department $department
     * @param App\Models\Faculty $faculty
     *
     * @return \Illuminate\Http\Response
     */
    public function assignFaculty(Department $department, Faculty $faculty)
    {
        $department->faculty_id = $faculty->id;
        $department->save();

        return response()->json(new DepartmentResource($department));
    }
}
