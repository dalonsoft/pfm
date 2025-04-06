<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Currency;

class CurrencyController extends Controller
{
    public function index()
    {
        $currencies = Currency::all();
        return Inertia::render('Currencies/Index', [
            'currencies' => $currencies
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'symbol' => 'required'
        ]);

        Currency::create($request->all());
        return redirect()->route('currencies.index');
    }

    public function destroy(Currency $currency)
    {
        $currency->delete();
        return redirect()->route('currencies.index');
    }
}