<?php

namespace App\Http\Controllers\AccessControl;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\UserUpdateRequest;
use App\Http\Resources\Permission\PermissionResource;
use App\Http\Resources\Role\RoleResource;
use App\Http\Resources\User\UserResource;
use App\Models\Permission;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Role;
use App\Services\UserService;

class UserController extends Controller
{
    /**
     * Returns a list of users.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return UserResource::collection(User::with('roles')->paginate());
    }

    /**
     * Creates a new user.
     *
     * @param  CreateUserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateUserRequest $request, UserService $userService)
    {
        $data = $request->validated();
        $roles = collect($data)->only('roles')->flatten()->toArray();
        $userData = collect($data)->except('roles', 'password')->toArray();

        $password = Str::random(15);
        $user = $userService->create(array_merge($userData, ['password' => $password]), $roles, true);

        return $this->jsonData(new UserResource($user));
    }

    /**
     * Returns the user.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::where('id', $id)->with('roles')->firstOrFail();
        return $this->jsonData(new UserResource($user));
    }

    /**
     * Updates the passed user.
     *
     * @param  App\Http\Requests\User\UserUpdateRequest  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        $user->update($request->validated());
        return response()->json(new UserResource($user));
    }

    /**
     * Remove a user.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(new UserResource($user));
    }

    /**
     * Assign a role to a user.
     *
     * @param \App\Models\User $user
     * @param App\Models\Role $role
     *
     * @return \Illuminate\Http\Response
     */
    public function assignRole(User $user, Role $role)
    {
        $user->assignRole($role->name);

        return response()->json([
            'message' => __('messages.set_user_role', ['role' => $role->name, 'user' => $user->full_name])
        ]);
    }

    /**
     * Remove a role from a user.
     *
     * @param \App\Models\User $user
     * @param App\Models\Role $role
     *
     * @return \Illuminate\Http\Response
     */
    public function revokeRole(User $user, Role $role)
    {
        $user->removeRole($role->name);

        return response()->json([
            'message' => __('messages.remove_role_in_user', ['role' => $role->name, 'user' => $user->full_name])
        ]);
    }

    /**
     * @param \App\Models\User $user
     * @param \App\Models\Permission $permission
     *
     * @return \Illuminate\Http\Response
     */
    public function assignPermission(User $user, Permission $permission)
    {
        $user->givePermissionTo($permission->name);

        $variables = ['permission' => $permission->title, 'user' => $user->full_name];
        return response()->json([
            'message' => __('messages.set_permission_user', $variables)
        ]);
    }

    /**
     * Removes permissions from the user.
     *
     * @param \App\Models\User $user
     * @param \App\Models\Permission $permission
     *
     * @return \Illuminate\Http\Response
     */
    public function revokePermission(User $user, Permission $permission)
    {
        $user->revokePermissionTo($permission->name);

        $variables = ['permission' => $permission->title, 'user' => $user->full_name];
        return response()->json([
            'message' => __('messages.delete_permission_user', $variables)
        ]);
    }

    /**
     * @param User $user
     *
     * @return [type]
     */
    public function userOutRolesPermissions(User $user)
    {
        $roles = $user->roles->pluck('name')->toArray();
        $permissions = Permission::whereDoesntHave('roles', function ($query) use ($roles) {
            $query->whereIn('name', $roles);
        })->paginate();

        return PermissionResource::collection($permissions);
    }

    public function roles(User $user)
    {
        return response()->json([
            'data' => RoleResource::collection($user->roles),
        ]);
    }

    public function permissions(User $user)
    {
        return response()->json([
            'data' => PermissionResource::collection($user->permissions),
        ]);
    }
}
