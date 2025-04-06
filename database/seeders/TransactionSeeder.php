<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transaction;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Transaction::insert([
            [
                'amount' => 50.00,
                'transaction_category_id' => 1,
                'account_id' => 1,
                'date' => '2023-04-01',
                'transaction_type_id' => 1,
                'concept' => 'Grocery shopping',
                'balance' => 1000.00,
                'note' => 'Weekly groceries',
            ],
            [
                'amount' => 2.50,
                'transaction_category_id' => 2,
                'account_id' => 2,
                'date' => '2023-04-02',
                'transaction_type_id' => 2,
                'concept' => 'Bus ticket',
                'balance' => 500.00,
                'note' => 'Daily commute',
            ],
        ]);
    }
}
