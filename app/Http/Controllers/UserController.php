<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;
class UserController extends Controller
{
    //si el usuario y contraseña coincide, generará un token.
    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        $response = compact('token');
        $response['user'] = Auth::user();
        return response()->json($response);
    }

    public function getAuthenticatedUser()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }
        return response()->json(compact('user'));
    }

    public function getIndexUsers(){
        return view('users.index');
    }

    public function index(){
         $users =  User::all();
         return response()->json(['users'=>$users]);
    }


    public function store(Request $request,User $user)
    {
        $user->create($request->all());
        return response()->json($user);
    }

    
    public function update(Request $request,User $user)
    {
        $user->update($request->all());
        return response()->json($user);
    }

    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();

        return response()->json(['menssage'=>'registro eliminado Exitosamente']);
    }
   
}
