<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class SetLocale
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $locale = null;
        $availableLanguages = ['es', 'en'];
        $defaultLocale = 'en'; // Idioma por defecto: inglés

        Log::info('SetLocale middleware starting', [
            'current_locale' => app()->getLocale(),
            'session_locale' => session('locale')
        ]);

        // 1. Prioridad máxima: idioma registrado en preferencias del usuario
        if (auth()->check()) {
            $userPrefLocale = auth()->user()->getPreference('language');
            Log::info('User preference language', ['language' => $userPrefLocale]);
            
            if ($userPrefLocale && in_array($userPrefLocale, $availableLanguages)) {
                $locale = $userPrefLocale;
                Log::info('Setting locale from user preferences', ['locale' => $locale]);
            }
        }

        // 2. Si no hay preferencia de usuario o no es válida, intentar detectar el idioma del navegador
        if (!$locale) {
            $browserLocale = $request->getPreferredLanguage($availableLanguages);
            Log::info('Browser preferred language', ['language' => $browserLocale]);
            
            if ($browserLocale && in_array($browserLocale, $availableLanguages)) {
                $locale = $browserLocale;
                Log::info('Setting locale from browser', ['locale' => $locale]);
            } else {
                // 3. Si el idioma del navegador no está disponible, usar inglés como predeterminado
                $locale = $defaultLocale;
                Log::info('Setting default locale', ['locale' => $locale]);
            }
        }
        
        // Establecer el idioma para la aplicación y la sesión
        app()->setLocale($locale);
        session(['locale' => $locale]);
        
        Log::info('Final locale set', [
            'locale' => app()->getLocale(),
            'session_locale' => session('locale')
        ]);
        
        return $next($request);
    }
}