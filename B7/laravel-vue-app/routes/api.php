<?php

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('users', 'Api\UserController');

/*
Route::apiResource('users', 'Api\UserController')->only(['index', 'show']);

Route::get('/users', 'Api\UserController@index');

Route::get('/users', function () {
    //if (rand(1, 10) < 3)
    //    abort(500, 'Bir hata oluştu');
    
    //return UserResource::collection(App\User::paginate(10));
    
    //UserResource::withoutWrapping();
    //return UserResource::collection(App\User::all());
    
    //return new UserResource(App\User::find(1));
    
    //return response()->json(['users' => App\User::all()], 200);
    
    //return App\User::all();
    
    //return factory(App\User::class, 10)->make();
    
    //return [
    //    ['id'=> 1, 'name'=> 'Cem', 'email'=> 'cmg.web@gmail.com'],
    //    ['id'=> 2, 'name'=> 'Esra', 'email'=> 'esra@gmail.com']
    //];
});
*/