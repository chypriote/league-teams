<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

/*Route::get('/', function () {
    return view('welcome');
});*/

Route::get('/', 'ListController@show');

Auth::routes();

Route::get('/home', 'HomeController@index');

Route::get('/teams', [
	'middleware' => ['auth'],
	'uses' => function () {
		echo "You are allowed to view this page";
	}
]);
