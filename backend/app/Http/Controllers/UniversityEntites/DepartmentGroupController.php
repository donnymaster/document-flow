<?php

namespace App\Http\Controllers\UniversityEntites;

use App\Http\Controllers\Controller;
use App\Http\Requests\DepartmentGroup\CreateDepartmentGroupRequest;
use App\Http\Requests\DepartmentGroup\UpdateDepartmentGroupRequest;
use App\Http\Resources\UniversityEntites\DepartmentGroupResource;
use App\Models\DepartmentGroup;

class DepartmentGroupController extends Controller
{
    /**
     * Returns a list of paginated groups.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DepartmentGroupResource::collection(DepartmentGroup::paginate());
    }

    /**
     * Creates a new group based on the passed data.
     *
     * @param  App\Http\Requests\DepartmentGroup\CreateDepartmentGroupRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateDepartmentGroupRequest $request)
    {
        $departmentGroup = DepartmentGroup::create($request->validated());
        return response()->json(new DepartmentGroupResource($departmentGroup));
    }

    /**
     * Returns the group.
     *
     * @param  \App\Models\DepartmentGroup  $departmentGroup
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $departmentGroup = DepartmentGroup::where('id', $id)->with('department')->firstOrFail();
        return response()->json(new DepartmentGroupResource($departmentGroup));
    }

    /**
     * Refreshes the transferred group.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DepartmentGroup  $departmentGroup
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDepartmentGroupRequest $request, DepartmentGroup $departmentGroup)
    {
        $departmentGroup->update($request->validated());
        return response()->json(new DepartmentGroupResource($departmentGroup));
    }

    /**
     * Delete the passed model.
     *
     * @param  \App\Models\DepartmentGroup  $departmentGroup
     * @return \Illuminate\Http\Response
     */
    public function destroy(DepartmentGroup $departmentGroup)
    {
        $departmentGroup->delete();
        return response()->json(new DepartmentGroupResource($departmentGroup));
    }
}
