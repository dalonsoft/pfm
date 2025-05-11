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
            'preferred_currency' => $user->getPreference('preferred_currency'),
            'amount_format' => $user->getPreference('amount_format', 'dot_comma'), // European default
            'date_format' => $user->getPreference('date_format', 'dd/mm/yyyy') // European default
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
            'amount_format' => 'required|string|in:dot_comma,comma_dot,space_comma,none_dot,none_comma',
            'date_format' => 'required|string|in:dd/mm/yyyy,mm/dd/yyyy,yyyy-mm-dd,dd-mm-yyyy,dd.mm.yyyy',
        ]);

        $user = auth()->user();
        $user->setPreference('language', $request->language);
        $user->setPreference('amount_format', $request->amount_format);
        $user->setPreference('date_format', $request->date_format);
        
        if ($request->preferred_currency) {
            $user->setPreference('preferred_currency', $request->preferred_currency);
        }

        // Set the locale for the current request
        app()->setLocale($request->language);
        session(['locale' => $request->language]);

        return redirect()->back()->with('message', __('preferences.preferences_updated'));
    }
}