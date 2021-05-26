<?php

namespace App\Http\Controllers\AccessControl;

use App\Filters\RoleFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\Role\CreateRoleRequest;
use App\Http\Requests\Role\UpdateRole;
use App\Http\Resources\Role\RoleResource;
use App\Models\Permission;
use App\Models\Role;

class RoleController extends Controller
{
    /**
     * Show the list of roles.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(RoleFilter $request)
    {
        return RoleResource::collection(Role::filter($request)->paginate());
    }

    /**
     * Create a new role.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateRoleRequest $request)
    {
        $role = Role::create($request->validated());
        return response()->json(new RoleResource($role));
    }

    /**
     * Show role.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $role = Role::where('id', $id)->with('permissions')->firstOrFail();
        return response()->json(new RoleResource($role));
    }

    /**
     * Update the specified role.
     *
     * @param  App\Http\Requests\Role\UpdateRole  $request
     * @param  App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRole $request, Role $role)
    {
        $role->update($request->validated());
        return response()->json(new RoleResource($role));
    }

    /**
     * Remove the specified role.
     *
     * @param  App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
        $role->delete();
        return response()->json(new RoleResource($role));
    }

    /**
     * Assign the transferred permission to the role.
     *
     * @param App\Models\Role $role
     * @param App\Models\Permission $permission
     *
     * @return \Illuminate\Http\Response
     */
    public function assignPermission(Role $role, Permission $permission)
    {
        $role->givePermissionTo($permission->name);

        $variables = ['role' => $role->title, 'permission' => $permission->title];
        return response()->json([
            'message' => __('messages.set_permission_role', $variables)
        ]);
    }

    /**
     * Remove permission from a role.
     *
     * @param App\Models\Role $role
     * @param App\Models\Permission $permission
     *
     * @return \Illuminate\Http\Response
     */
    public function revokePermission(Role $role, Permission $permission)
    {
        $role->revokePermissionTo($permission->name);

        $variables = ['role' => $role->title, 'permission' => $permission->title];
        return response()->json([
            'message' => __('messages.take_off_permission_role', $variables)
        ]);
    }
}
