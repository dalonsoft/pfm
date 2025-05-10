<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\TransactionCategory;

class TransactionCategoryController extends Controller
{
    public function index()
    {
        $transactionCategories = TransactionCategory::with('parent')->get();
        return Inertia::render('TransactionCategories/Index', [
            'transactionCategories' => $transactionCategories
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'parent_id' => 'nullable|exists:transaction_categories,id'
        ]);

        TransactionCategory::create($request->all());
        return redirect()->route('transaction-categories.index');
    }
    
    public function update(Request $request, TransactionCategory $transactionCategory)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'parent_id' => 'nullable|exists:transaction_categories,id'
        ]);

        $transactionCategory->update($request->all());
        return redirect()->route('transaction-categories.index');
    }

    public function destroy(TransactionCategory $transactionCategory)
    {
        $transactionCategory->delete();
        return redirect()->route('transaction-categories.index');
    }
}