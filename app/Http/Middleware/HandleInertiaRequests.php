<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Log;
use App\Models\Currency;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request): array
    {
        // Get locale from session or authenticated user
        $locale = $request->session()->get('locale');
        
        if (!$locale && auth()->check()) {
            $locale = auth()->user()->getPreference('language');
        }
        
        // Use application default locale if not set
        if (!$locale) {
            $locale = app()->getLocale();
        } else {
            // Ensure application uses the correct locale
            app()->setLocale($locale);
        }
        
        Log::info('Inertia sharing translations', [
            'locale' => $locale, 
            'app_locale' => app()->getLocale()
        ]);
        
        // Load all translations for the current locale
        $translations = $this->getTranslations($locale);

        // Get user preferences if authenticated
        $userPreferences = [];
        if (auth()->check()) {
            $user = auth()->user();
            $userPreferences = [
                'language' => $user->getPreference('language', 'es'),
                'preferred_currency' => $user->getPreference('preferred_currency'),
                'amount_format' => $user->getPreference('amount_format', 'dot_comma'), // European default
                'date_format' => $user->getPreference('date_format', 'dd/mm/yyyy'), // European default
                'currencies' => Currency::select('id', 'name', 'code', 'symbol')->get()
            ];
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'locale' => $locale,
            'translations' => $translations,
            'userPreferences' => $userPreferences,
            'flash' => [
                'message' => fn () => $request->session()->get('message')
            ],
        ]);
    }

    /**
     * Get all translations for the current locale.
     *
     * @param string $locale
     * @return array
     */
    protected function getTranslations(string $locale): array
    {
        $path = lang_path($locale);
        
        if (!is_dir($path)) {
            Log::warning('Translation directory not found', ['path' => $path]);
            return [];
        }
        
        $translations = [];
        $files = scandir($path);
        
        foreach ($files as $file) {
            if (is_file("$path/$file") && pathinfo($file, PATHINFO_EXTENSION) === 'php') {
                $key = pathinfo($file, PATHINFO_FILENAME);
                $translations[$key] = require "$path/$file";
                Log::info('Loaded translation file', ['locale' => $locale, 'file' => $key]);
            }
        }
        
        return $translations;
    }
}
