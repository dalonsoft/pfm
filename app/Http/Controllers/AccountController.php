<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Account;
use App\Models\AccountCategory;
use App\Models\Currency;

class AccountController extends Controller
{
    public function index()
    {
        $accounts = Account::with(['category', 'currency'])->get();
        $categories = AccountCategory::all();
        $currencies = Currency::all();
        
        return Inertia::render('Accounts/Index', [
            'accounts' => $accounts,
            'categories' => $categories,
            'currencies' => $currencies
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required',
                'description' => 'nullable',
                'number' => 'nullable',
                'account_category_id' => 'required|numeric',
                'currency_id' => 'required|numeric'
            ]);

            Account::create($validated);
            return redirect()->route('accounts.index');
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'Account creation failed: ' . $e->getMessage()
            ]);
        }
    }

    public function update(Request $request, $account)
    {
        try {
            if (!($account instanceof Account)) {
                $account = Account::findOrFail($account);
            }

            $validated = $request->validate([
                'name' => 'required',
                'description' => 'nullable',
                'number' => 'nullable',
                'account_category_id' => 'required|numeric',
                'currency_id' => 'required|numeric'
            ]);

            $account->update($validated);
            
            return redirect()->route('accounts.index');
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'Account update failed: ' . $e->getMessage()
            ]);
        }
    }

    public function destroy($account)
    {
        try {
            if (!($account instanceof Account)) {
                $account = Account::findOrFail($account);
            }

            $account->transactions()->delete();
            $account->delete();
            
            return redirect()->route('accounts.index');
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Account deletion failed: ' . $e->getMessage()
            ], 500);
        }
    }
}