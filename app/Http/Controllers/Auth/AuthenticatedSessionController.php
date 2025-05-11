<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;

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

        // Establecer el idioma preferido del usuario en la sesión inmediatamente después del login
        if (Auth::check()) {
            $user = Auth::user();
            $preferredLanguage = $user->getPreference('language');
            
            if ($preferredLanguage) {
                // Guardar el idioma preferido en la sesión
                $request->session()->put('locale', $preferredLanguage);
                
                // Establecer el idioma para la solicitud actual
                app()->setLocale($preferredLanguage);
                
                Log::info('User language preference applied after login', [
                    'user_id' => $user->id,
                    'language' => $preferredLanguage
                ]);
            }
        }

        return redirect()->intended(route('dashboard', absolute: false));
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
}
