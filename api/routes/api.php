<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\ProfileController;
use App\Http\Controllers\DefaultController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\User\RoleController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Project\ProjectController;

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

Route::get('/', [DefaultController::class, 'welcome'])->name('welcome');

Route::post('/auth/login', [LoginController::class, 'authenticate'])->name('auth.authenticate');

Route::post('/auth/password/forgotten', [PasswordController::class, 'forgot'])->name('auth.password.forgotten');
Route::post('/auth/password/reset', [PasswordController::class, 'reset'])->name('auth.password.reset');

/** Routes for logged in users */
Route::group(['middleware' => 'auth:api'], function() {
    /** Auth actions */
    Route::get('/auth/logout', [LogoutController::class, 'logout'])->name('auth.logout');
    Route::get('/auth/who', [ProfileController::class, 'who'])->name('auth.who');

    /** User profile */
    Route::post('/auth/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/auth/profile/password/update', [PasswordController::class, 'update'])->name(('password.update'));

    /** Settings */
    Route::get('/setting/{group}', [SettingController::class, 'get'])
        ->where('group', 'general|pagination')
        ->name('setting.get');

    Route::post('/setting/general', [SettingController::class, 'general'])
        ->name('setting.general.save');

    /** Users management */
    Route::get('/users/all', [UserController::class, 'all'])
        ->name('users.list.all');

    Route::get('/users', [UserController::class, 'index'])
        ->name('users.list');

    Route::get('/users/{user}', [UserController::class, 'details'])
        ->name('users.details');

    Route::post('/users', [UserController::class, 'add'])
        ->name('user.add');

    Route::put('/users/{user}', [UserController::class, 'edit'])
        ->name('users.update');

    Route::delete('/users/{user}', [UserController::class, 'remove'])
        ->name('users.remove');

    /** Roles management */
    Route::get('/roles/all', [RoleController::class, 'all'])
        ->name('roles.list.all');

    Route::get('/roles', [RoleController::class, 'index'])
        ->name('roles.list');

    Route::get('/roles/{role}', [RoleController::class, 'details'])
        ->name('roles.details');

    Route::post('/roles', [RoleController::class, 'add'])
        ->name('roles.add');

    Route::put('/roles/{role}', [RoleController::class, 'edit'])
        ->name('roles.update');

    Route::delete('/roles/{role}', [RoleController::class, 'remove'])
        ->name('roles.remove');

    /** Audit events */
    Route::get('/audit-events/types/all', [\App\Http\Controllers\Audit\EventController::class, 'getAllEventTypes'])
        ->name('event-types.all');

    Route::get('/audit-events/all', [\App\Http\Controllers\Audit\EventController::class, 'list'])
        ->name('audit-events.all');

    Route::post('/audit-events/filter', [\App\Http\Controllers\Audit\EventController::class, 'filter'])
        ->name('audit-events.filter');

    Route::get('/audit-event/{auditEvent}/details', [\App\Http\Controllers\Audit\EventController::class, 'details'])
        ->name('audit-event.details');

    /** Projects management */
    Route::get('/projects/all', [ProjectController::class, 'all'])
        ->name('projects.list.all');

    Route::get('/projects', [ProjectController::class, 'index'])
        ->name('projects.list');

    Route::get('/projects/{project}', [ProjectController::class, 'details'])
        ->name('projects.details');

    Route::post('/projects', [ProjectController::class, 'add'])
        ->name('projects.add');

    Route::put('/projects/{project}', [ProjectController::class, 'edit'])
        ->name('projects.update');

    Route::delete('/projects/{project}', [ProjectController::class, 'remove'])
        ->name('projects.remove');
});

