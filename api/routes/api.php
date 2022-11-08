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
use App\Http\Controllers\Audit\EventController;
use App\Http\Controllers\User\PermissionController;
use App\Http\Controllers\Country\CountryController;
use App\Http\Controllers\Currency\CurrencyController;
use App\Http\Controllers\CompanyType\CompanyTypeController;
use App\Http\Controllers\Department\DepartmentController;
use App\Http\Controllers\Team\TeamController;
use App\Http\Controllers\Position\PositionController;
use App\Http\Controllers\City\CityController;
use App\Http\Controllers\Company\CompanyController;

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

    /** Permissions management */
    Route::get('/permissions/all', [PermissionController::class, 'all'])
        ->name('permissions.list.all');

    /** Countries management */
    Route::get('/countries/all', [CountryController::class, 'all'])
        ->name('countries.list.all');

    Route::get('/countries', [CountryController::class, 'index'])
        ->name('countries.list');

    Route::get('/countries/{country}', [CountryController::class, 'details'])
        ->name('country.details');

    Route::post('/countries', [CountryController::class, 'add'])
        ->name('country.add');

    Route::put('/countries/{country}', [CountryController::class, 'edit'])
        ->name('country.update');

    Route::delete('/countries/{country}', [CountryController::class, 'remove'])
        ->name('country.remove');

    /** Currencies management */
    Route::get('/currencies/all', [CurrencyController::class, 'all'])
        ->name('currencies.list.all');

    Route::get('/currencies', [CurrencyController::class, 'index'])
        ->name('currencies.list');

    Route::get('/currencies/{currency}', [CurrencyController::class, 'details'])
        ->name('currency.details');

    Route::post('/currencies', [CurrencyController::class, 'add'])
        ->name('currency.add');

    Route::put('/currencies/{currency}', [CurrencyController::class, 'edit'])
        ->name('currency.update');

    Route::delete('/currencies/{currency}', [CurrencyController::class, 'remove'])
        ->name('currency.remove');

    /** Company types management */
    Route::get('/company-types/all', [CompanyTypeController::class, 'all'])
        ->name('company-types.list.all');

    Route::get('/company-types', [CompanyTypeController::class, 'index'])
        ->name('company-types.list');

    Route::get('/company-types/{companyType}', [CompanyTypeController::class, 'details'])
        ->name('company-types.details');

    Route::post('/company-types', [CompanyTypeController::class, 'add'])
        ->name('company-types.add');

    Route::put('/company-types/{companyType}', [CompanyTypeController::class, 'edit'])
        ->name('company-types.update');

    Route::delete('/company-types/{companyType}', [CompanyTypeController::class, 'remove'])
        ->name('company-types.remove');

    /** Departments management */
    Route::get('/departments/all', [DepartmentController::class, 'all'])
        ->name('departments.list.all');

    Route::get('/departments', [DepartmentController::class, 'index'])
        ->name('departments.list');

    Route::get('/departments/{department}', [DepartmentController::class, 'details'])
        ->name('departments.details');

    Route::post('/departments', [DepartmentController::class, 'add'])
        ->name('departments.add');

    Route::put('/departments/{department}', [DepartmentController::class, 'edit'])
        ->name('departments.update');

    Route::delete('/departments/{department}', [DepartmentController::class, 'remove'])
        ->name('departments.remove');

    /** Teams management */
    Route::get('/teams/all', [TeamController::class, 'all'])
        ->name('teams.list.all');

    Route::get('/teams', [TeamController::class, 'index'])
        ->name('teams.list');

    Route::get('/teams/{team}', [TeamController::class, 'details'])
        ->name('teams.details');

    Route::post('/teams', [TeamController::class, 'add'])
        ->name('teams.add');

    Route::put('/teams/{team}', [TeamController::class, 'edit'])
        ->name('teams.update');

    Route::delete('/teams/{team}', [TeamController::class, 'remove'])
        ->name('teams.remove');

    /** Positions management */
    Route::get('/positions/all', [PositionController::class, 'all'])
        ->name('positions.list.all');

    Route::get('/positions', [PositionController::class, 'index'])
        ->name('positions.list');

    Route::get('/positions/{position}', [PositionController::class, 'details'])
        ->name('positions.details');

    Route::post('/positions', [PositionController::class, 'add'])
        ->name('positions.add');

    Route::put('/positions/{position}', [PositionController::class, 'edit'])
        ->name('positions.update');

    Route::delete('/positions/{position}', [PositionController::class, 'remove'])
        ->name('positions.remove');

    /** Positions management */
    Route::get('/cities/all', [CityController::class, 'all'])
        ->name('cities.list.all');

    Route::get('/cities', [CityController::class, 'index'])
        ->name('cities.list');

    Route::get('/cities/{city}', [CityController::class, 'details'])
        ->name('cities.details');

    Route::post('/cities', [CityController::class, 'add'])
        ->name('cities.add');

    Route::put('/cities/{city}', [CityController::class, 'edit'])
        ->name('cities.update');

    Route::delete('/cities/{city}', [CityController::class, 'remove'])
        ->name('cities.remove');

    /** Companies management */
    Route::get('/companies/all', [CompanyController::class, 'all'])
        ->name('companies.list.all');

    Route::get('/companies', [CompanyController::class, 'index'])
        ->name('companies.list');

    Route::get('/companies/{company}', [CompanyController::class, 'details'])
        ->name('companies.details');

    Route::post('/companies', [CompanyController::class, 'add'])
        ->name('companies.add');

    Route::put('/companies/{company}', [CompanyController::class, 'edit'])
        ->name('companies.update');

    Route::delete('/companies/{company}', [CompanyController::class, 'remove'])
        ->name('companies.remove');

    /** Language management */
    Route::get('/languages/all', [\App\Http\Controllers\Language\LanguageController::class, 'all'])
        ->name('languages.list.all');

    Route::get('/languages', [\App\Http\Controllers\Language\LanguageController::class, 'index'])
        ->name('languages.list');

    Route::get('/languages/{language}', [\App\Http\Controllers\Language\LanguageController::class, 'details'])
        ->name('languages.details');

    Route::post('/languages', [\App\Http\Controllers\Language\LanguageController::class, 'add'])
        ->name('languages.add');

    Route::put('/languages/{language}', [\App\Http\Controllers\Language\LanguageController::class, 'edit'])
        ->name('languages.update');

    Route::delete('/languages/{language}', [\App\Http\Controllers\Language\LanguageController::class, 'remove'])
        ->name('languages.remove');

    /** Audit events */
    Route::get('/audit-events/types/all', [\App\Http\Controllers\Audit\EventController::class, 'getAllEventTypes'])
        ->name('event-types.all');

    Route::get('/audit-events/all', [\App\Http\Controllers\Audit\EventController::class, 'list'])
        ->name('audit-events.all');

    Route::post('/audit-events/filter', [\App\Http\Controllers\Audit\EventController::class, 'filter'])
        ->name('audit-events.filter');

    Route::get('/audit-event/{auditEvent}/details', [\App\Http\Controllers\Audit\EventController::class, 'details'])
        ->name('audit-event.details');
});

