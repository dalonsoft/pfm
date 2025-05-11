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
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'number' => 'required',
            'account_category_id' => 'required',
            'currency_id' => 'required'
        ]);

        Account::create($request->all());
        return redirect()->route('accounts.index');
    }

    public function update(Request $request, Account $account)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'number' => 'required',
            'account_category_id' => 'required',
            'currency_id' => 'required'
        ]);

        $account->update($request->all());
        return redirect()->route('accounts.index');
    }

    public function destroy(Account $account)
    {
        $account->delete();
        return redirect()->route('accounts.index');
    }
}