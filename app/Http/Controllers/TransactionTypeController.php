<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\TransactionType;

class TransactionTypeController extends Controller
{
    public function index()
    {
        $transactionTypes = TransactionType::all();
        return Inertia::render('TransactionTypes/Index', [
            'transactionTypes' => $transactionTypes
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required'
        ]);

        TransactionType::create($request->all());
        return redirect()->route('transaction-types.index');
    }
    
    public function update(Request $request, $transactionType)
    {
        if (!($transactionType instanceof TransactionType)) {
            $transactionType = TransactionType::findOrFail($transactionType);
        }

        $request->validate([
            'name' => 'required',
            'description' => 'required'
        ]);

        $transactionType->update($request->all());
        return redirect()->route('transaction-types.index');
    }

    public function destroy($transactionType)
    {
        if (!($transactionType instanceof TransactionType)) {
            $transactionType = TransactionType::findOrFail($transactionType);
        }

        $transactionType->delete();
        return redirect()->route('transaction-types.index');
    }
}