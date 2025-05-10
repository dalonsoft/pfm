<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Currency;

class UserPreferenceController extends Controller
{
    /**
     * Display the user preferences page.
     */
    public function index()
    {
        $user = auth()->user();
        $currencies = Currency::all();
        
        $preferences = [
            'language' => $user->getPreference('language', 'en'),
            'preferred_currency' => $user->getPreference('preferred_currency')
        ];

        return Inertia::render('UserPreferences/Index', [
            'preferences' => $preferences,
            'currencies' => $currencies,
            'availableLanguages' => [
                ['code' => 'es', 'name' => 'Español'],
                ['code' => 'en', 'name' => 'English']
            ]
        ]);
    }

    /**
     * Update the user preferences.
     */
    public function update(Request $request)
    {
        $request->validate([
            'language' => 'required|string|in:es,en',
            'preferred_currency' => 'nullable|exists:currencies,id',
        ]);

        $user = auth()->user();
        $user->setPreference('language', $request->language);
        
        if ($request->preferred_currency) {
            $user->setPreference('preferred_currency', $request->preferred_currency);
        }

        // Set the locale for the current request
        app()->setLocale($request->language);
        session(['locale' => $request->language]);

        return redirect()->back()->with('message', __('preferences.preferences_updated'));
    }
}