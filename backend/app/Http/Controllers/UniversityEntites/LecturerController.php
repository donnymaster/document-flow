<?php

namespace App\Http\Controllers\UniversityEntites;

use App\Http\Controllers\Controller;
use App\Http\Requests\Lecturer\CreateLecturerRequest;
use App\Http\Requests\Lecturer\CreateUserRequest;
use App\Http\Requests\Lecturer\MultipleFillingLecturerRequest;
use App\Http\Requests\Lecturer\UpdateLecturerRequest;
use App\Http\Resources\UniversityEntites\LecturerResource;
use App\Http\Resources\User\UserResource;
use Illuminate\Support\Str;
use App\Models\Lecturer;
use App\Services\UserService;

class LecturerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return LecturerResource::collection(Lecturer::paginate());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\Lecturer\CreateLecturerRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateLecturerRequest $request)
    {
        $lecturer = Lecturer::create($request->validated());
        return response()->json(new LecturerResource($lecturer));
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $lecturer = Lecturer::where('id', $id)->with(['user', 'department'])->firstOrFail();
        return response()->json(new LecturerResource($lecturer));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  App\Http\Requests\Lecturer\UpdateLecturerRequest  $request
     * @param  \App\Models\Lecturer  $lecturer
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateLecturerRequest $request, Lecturer $lecturer)
    {
        $lecturer->update($request->validated());
        return response()->json(new LecturerResource($lecturer));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Lecturer  $lecturer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Lecturer $lecturer)
    {
        $lecturer->update();
        return response()->json(new LecturerResource($lecturer));
    }

    /**
     * Method for bulk filling.
     *
     * @param App\Http\Requests\Lecturer\MultipleFillingLecturerRequest $request
     *
     * @return @return \Illuminate\Http\Response
     */
    public function multipleFilling(MultipleFillingLecturerRequest $request)
    {
        $lecturers = $request->lecturers;

        foreach ($lecturers as $lecturer) {
            Lecturer::create($lecturer);
        }

        // return response()->json(LecturerResource::collection($lecturers));
        return response()->json([
            'message' => __('messages.filled_lecturers', ['count' => count($lecturers)])
        ]);
    }



    /**
     * Creating a user based on a teacher.
     *
     * @param App\Http\Requests\Lecturer\CreateUserRequest; $request
     * @param \App\Models\Lecturer  $lecturer
     * @param App\Services\UserService $service
     *
     * @return @return \Illuminate\Http\Response
     */
    public function createUser(CreateUserRequest $request, Lecturer $lecturer, UserService $service)
    {
        $password = Str::random(15);

        $user = $service->create([
            'name' => $lecturer->name,
            'surname' => $lecturer->surname,
            'surname' => $lecturer->patronymic,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'password' => $password,
        ], $request->roles, true);

        return response()->json(new UserResource($user));
    }
}
