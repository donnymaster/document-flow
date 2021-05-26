<?php

use App\Http\Controllers\AccessControl\RoleController;
use App\Http\Controllers\AccessControl\UserController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Document\DocumentTemplateController;
use App\Http\Controllers\Document\GeneratedDocumentController;
use App\Http\Controllers\FileStorageController;
use App\Http\Controllers\UniversityEntites\DepartmentController;
use App\Http\Controllers\UniversityEntites\LecturerController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/v1/file/download/{filePath}', [FileStorageController::class, 'download']);

Route::middleware(['api', 'locale.set'])->prefix('v1')->group(function () {
    Route::post('/auth/login', [AuthController::class, 'login']);
    // Route::post('/auth/register', [AuthController::class, 'register']);

    Route::middleware(['jwt.auth', 'permission.check'])->group(function () {
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        Route::apiResources([
            'roles'              => \AccessControl\RoleController::class,
            'users'              => \AccessControl\UserController::class,
            'permissions'        => \AccessControl\PermissionController::class,
            'faculties'          => \UniversityEntites\FacultyController::class,
            'departments'        => \UniversityEntites\DepartmentController::class,
            'department-groups'  => \UniversityEntites\DepartmentGroupController::class,
            'lecturers'          => \UniversityEntites\LecturerController::class,
            'students'           => \UniversityEntites\StudentController::class,
            'document-templates' => \Document\DocumentTemplateController::class,
            'info-gek'           => InfoGekMainController::class,
        ]);

        Route::get('/auth/me', [AuthController::class, 'me']);

        Route::get('/roles/{role}/assign/permission/{permission}', [RoleController::class, 'assignPermission'])
            ->name('role.assign.permission');
        Route::get('/roles/{role}/revoke/permission/{permission}', [RoleController::class, 'revokePermission'])
            ->name('role.revoke.permission');

        Route::get('/users/{user}/assign/role/{role}', [UserController::class, 'assignRole'])
            ->name('user.assign.role');
        Route::get('/users/{user}/revoke/role/{role}', [UserController::class, 'revokeRole'])
            ->name('user.revoke.role');
        Route::get('/users/{user}/assign/permission/{permission}', [UserController::class, 'assignPermission'])
            ->name('user.assign.permission');
        Route::get('/users/{user}/revoke/permission/{permission}', [UserController::class, 'revokePermission'])
            ->name('user.revoke.permission');
        Route::get('/users/{user}/without-permissions', [UserController::class, 'userOutRolesPermissions']); // TODO:
        Route::get('/users/{user}/roles', [UserController::class, 'roles']);
        Route::get('/users/{user}/permissions', [UserController::class, 'permissions']);

        Route::get('/generated-documents', [GeneratedDocumentController::class, 'index']);
        Route::post('/generated-documents', [GeneratedDocumentController::class, 'store']);
        Route::get('/generated-documents/{generatedDocument}', [GeneratedDocumentController::class, 'show']);

        Route::post('/file/save', [FileStorageController::class, 'save']);

        Route::get('/departments/{department}/assign/faculty/{faculty}', [DepartmentController::class, 'assignFaculty'])
            ->name('department.assign.faculty');

        Route::post('/lecturers/mass-filling', [LecturerController::class, 'multipleFilling'])
            ->name('lecturers.mass.filling');

        Route::get('/templates/load', [DocumentTemplateController::class, 'load']);

        Route::post(
            '/document/{documentId}/template/{templateId}/create',
            [DocumentTemplateController::class, 'createDocument']
        );
    });
});
