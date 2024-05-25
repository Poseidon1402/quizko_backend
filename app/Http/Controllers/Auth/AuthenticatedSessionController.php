<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME);
    }
    /** Handle an incoming authentication request in api.
    */
   public function apiStore(LoginRequest $request): JsonResponse
    {
        if($request->authenticateApi()){
            $user = $request->user();
            $user->tokens()->delete();
            $token = $user->createToken('api-token');
            $user->load('candidate.post');
            return response()->json([
                'user' => $user,
                'token' => $token->plainTextToken,
            ], 200); 
        }else{
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    }
    
    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
  /**
   * Destroy an authenticated session in API
   */
    public function apiDestroy(Request $request): JsonResponse
    {
        $user= $request->user();
        $user->tokens()->delete();

        return response()->json([
            'message'=>"User loged out",
           ]);
    }
}
