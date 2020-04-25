<?php

use Illuminate\Http\Request;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

 Route::group(['middleware' => ['jwt.auth']], function() {
       Route::post('logout', 'Auth\LoginController@logout')->name('logout');
       Route::get('clients','ClientController@index');
       Route::post('clients','ClientController@store');
       Route::delete('clients/{client}','ClientController@destroy');
       Route::put('clients/{client}','ClientController@update');
    });

    

Route::post('login', 'UserController@authenticate')->name('login');
