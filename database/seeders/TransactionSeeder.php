<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transaction;
use App\Models\Account;
use App\Models\TransactionCategory;
use App\Models\TransactionType;
use Carbon\Carbon;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get IDs for related models to create realistic transactions
        $accountIds = Account::pluck('id')->toArray();
        $categoryIds = TransactionCategory::pluck('id')->toArray();
        $typeIds = TransactionType::pluck('id')->toArray();
        
        // Ensure we have data to work with
        if (empty($accountIds) || empty($categoryIds) || empty($typeIds)) {
            $this->command->info('Please run the Account, TransactionCategory, and TransactionType seeders first.');
            return;
        }
        
        // Transaction concepts for more realistic data
        $concepts = [
            'Grocery shopping', 'Restaurant bill', 'Gas station', 'Online purchase',
            'Monthly subscription', 'Phone bill', 'Internet bill', 'Electricity bill',
            'Water bill', 'Rent payment', 'Salary deposit', 'ATM withdrawal',
            'Movie tickets', 'Books', 'Clothing', 'Electronics',
            'Gym membership', 'Coffee shop', 'Fast food', 'Public transport',
            'Taxi/Uber', 'Home insurance', 'Car insurance', 'Health insurance',
            'Home maintenance', 'Car repair', 'Doctor visit', 'Pharmacy',
            'Gift purchase', 'Charity donation', 'Investment deposit', 'Dividend payment',
            'Tax refund', 'Bank fee', 'Interest payment', 'Credit card payment'
        ];
        
        // Notes for more realistic data
        $notes = [
            'Monthly recurring expense', 'Unexpected cost', 'Regular weekly expense',
            'Annual subscription', 'Quarterly bill', 'Emergency expense',
            'Family event', 'Weekend getaway', 'Birthday gift', 'Holiday shopping',
            'Work related', 'Essential purchase', '', '', '' // Including empty notes
        ];
        
        // Create at least 50 transactions
        $transactions = [];
        $startDate = Carbon::now()->subMonths(6);
        
        for ($i = 0; $i < 60; $i++) {
            $date = $startDate->copy()->addDays(rand(0, 180))->format('Y-m-d');
            $isIncome = rand(0, 1) === 1;
            
            $transactions[] = [
                'amount' => $isIncome ? rand(50000, 500000) / 100 : rand(100, 30000) / 100,
                'transaction_category_id' => $categoryIds[array_rand($categoryIds)],
                'account_id' => $accountIds[array_rand($accountIds)],
                'date' => $date,
                'transaction_type_id' => $typeIds[array_rand($typeIds)],
                'concept' => $concepts[array_rand($concepts)],
                'note' => $notes[array_rand($notes)],
                'created_at' => now(),
                'updated_at' => now()
            ];
        }
        
        // Insert transactions in chunks to avoid memory issues
        foreach (array_chunk($transactions, 20) as $chunk) {
            Transaction::insert($chunk);
        }
        
        $this->command->info('60 transactions created successfully.');
    }
}
