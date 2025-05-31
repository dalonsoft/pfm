<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\TransactionCategoryAlias;
use App\Models\TransactionCategory;

class TransactionCategoryAliasController extends Controller
{
    public function index()
    {
        $transactionCategoryAliases = TransactionCategoryAlias::with('category')->get();
        $transactionCategories = TransactionCategory::all();
        
        return Inertia::render('TransactionCategoryAliases/Index', [
            'transactionCategoryAliases' => $transactionCategoryAliases,
            'transactionCategories' => $transactionCategories
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'alias' => 'required',
            'transaction_category_id' => 'required|exists:transaction_categories,id'
        ]);

        TransactionCategoryAlias::create($request->all());
        return redirect()->route('transaction-category-aliases.index');
    }
    
    public function update(Request $request, $transactionCategoryAlias)
    {
        if (!($transactionCategoryAlias instanceof TransactionCategoryAlias)) {
            $transactionCategoryAlias = TransactionCategoryAlias::findOrFail($transactionCategoryAlias);
        }

        $request->validate([
            'alias' => 'required',
            'transaction_category_id' => 'required|exists:transaction_categories,id'
        ]);

        $transactionCategoryAlias->update($request->all());
        return redirect()->route('transaction-category-aliases.index');
    }

    public function destroy($transactionCategoryAlias)
    {
        if (!($transactionCategoryAlias instanceof TransactionCategoryAlias)) {
            $transactionCategoryAlias = TransactionCategoryAlias::findOrFail($transactionCategoryAlias);
        }

        $transactionCategoryAlias->delete();
        return redirect()->route('transaction-category-aliases.index');
    }
}