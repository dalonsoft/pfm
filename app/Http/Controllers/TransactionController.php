<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Transaction;
use App\Models\Account;
use App\Models\TransactionCategory;
use App\Models\TransactionType;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with(['account', 'transactionCategory', 'transactionType'])->get();
        $accounts = Account::all();
        $transactionCategories = TransactionCategory::all();
        $transactionTypes = TransactionType::all();
        
        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions,
            'accounts' => $accounts,
            'transactionCategories' => $transactionCategories,
            'transactionTypes' => $transactionTypes
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'concept' => 'required|string',
            'amount' => 'required|numeric',
            'account_id' => 'required|exists:accounts,id',
            'transaction_category_id' => 'required|exists:transaction_categories,id',
            'transaction_type_id' => 'required|exists:transaction_types,id',
            'note' => 'nullable|string'
        ]);

        Transaction::create($request->all());
        return redirect()->route('transactions.index');
    }
    
    public function update(Request $request, Transaction $transaction)
    {
        $request->validate([
            'date' => 'required|date',
            'concept' => 'required|string',
            'amount' => 'required|numeric',
            'account_id' => 'required|exists:accounts,id',
            'transaction_category_id' => 'required|exists:transaction_categories,id',
            'transaction_type_id' => 'required|exists:transaction_types,id',
            'note' => 'nullable|string'
        ]);

        $transaction->update($request->all());
        return redirect()->route('transactions.index');
    }

    public function destroy(Transaction $transaction)
    {
        $transaction->delete();
        return redirect()->route('transactions.index');
    }
}