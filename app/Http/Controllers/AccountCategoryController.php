<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\AccountCategory;

class AccountCategoryController extends Controller
{
    public function index()
    {
        $accountCategories = AccountCategory::all();
        return Inertia::render('AccountCategories/Index', [
            'accountCategories' => $accountCategories
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required'
        ]);

        AccountCategory::create($request->all());
        return redirect()->route('account-categories.index');
    }
    
    public function update(Request $request, $accountCategory)
    {
        if (!($accountCategory instanceof AccountCategory)) {
            $accountCategory = AccountCategory::findOrFail($accountCategory);
        }

        $request->validate([
            'name' => 'required',
            'description' => 'required'
        ]);

        $accountCategory->update($request->all());
        return redirect()->route('account-categories.index');
    }

    public function destroy($accountCategory)
    {
        if (!($accountCategory instanceof AccountCategory)) {
            $accountCategory = AccountCategory::findOrFail($accountCategory);
        }

        $accountCategory->delete();
        return redirect()->route('account-categories.index');
    }
}