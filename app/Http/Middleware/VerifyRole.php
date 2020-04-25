<?php

namespace App\Http\Middleware;

use Closure;

class VerifyRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next,$role)
    {
        if ($request->user()->role == $role) {
            return $next($request);   
        }

        $response = [
            'code' => 3
        ];
        
        return response()->json($response, 200);
    }
}
