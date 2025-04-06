<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Transaction;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::all();
        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'transaction_date' => 'required',
            'description' => 'required',
            'amount' => 'required',
            'transaction_category_id' => 'required',
            'account_id' => 'required'
        ]);

        Transaction::create($request->all());
        return redirect()->route('transactions.index');
    }

    public function destroy(Transaction $transaction)
    {
        $transaction->delete();
        return redirect()->route('transactions.index');
    }
}