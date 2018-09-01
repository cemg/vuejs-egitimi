<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $users = UserResource::collection(User::orderByDesc('id')->paginate(5));
        
        return $users;
        
        //return response()->json(['users' => $users], 200);
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required|max:50',
            'email'    => 'required|email|unique:users',
            'password' => 'required|min:6'
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Bir hata oluştu',
                'errors'  => $validator->errors()
            ], 422);
        }
        
        $data = $request->only('name', 'email', 'password');
        $data['password'] = bcrypt($data['password']);
        
        User::create($data);
        
        return response()->json([
            'success' => true,
            'message' => 'Kaydedildi'
        ]);
    }
    
    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = new UserResource(User::find($id));
        
        return response()->json($user, 200);
        
        //return User::find($id);
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        if (request()->filled('password')) {
            $validator = Validator::make($request->all(), [
                'name'     => 'required|max:50',
                'email'    => 'required|email|unique:users,email,' . $user->id,
                'password' => 'required|min:6'
            ]);
        } else {
            $validator = Validator::make($request->all(), [
                'name'  => 'required|max:50',
                'email' => 'required|email|unique:users,email,' . $user->id
            ]);
        }
        
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Bir hata oluştu',
                'errors'  => $validator->errors()
            ], 422);
        }
        
        $data = $request->only('name', 'email', 'password');
        if (request()->filled('password')) {
            $data['password'] = bcrypt($data['password']);
        }
        $user->update($data);
        
        return response()->json([
            'success' => true,
            'message' => 'Güncellendi'
        ]);
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(User $user)
    {
        $user->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Silindi'
        ]);
    }
}
