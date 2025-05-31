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
        return Inertia::render('Currency/Index', [
            'currencies' => $currencies
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'code' => 'required|unique:currencies,code',
            'symbol' => 'required'
        ]);

        Currency::create($request->all());
        return redirect()->route('currencies.index');
    }
    
    public function update(Request $request, $currency)
    {
        if (!($currency instanceof Currency)) {
            $currency = Currency::findOrFail($currency);
        }

        $request->validate([
            'name' => 'required',
            'code' => 'required|unique:currencies,code,' . $currency->id,
            'symbol' => 'required'
        ]);

        $currency->update($request->all());
        return redirect()->route('currencies.index');
    }

    public function destroy($currency)
    {
        if (!($currency instanceof Currency)) {
            $currency = Currency::findOrFail($currency);
        }

        $currency->delete();
        return redirect()->route('currencies.index');
    }
}