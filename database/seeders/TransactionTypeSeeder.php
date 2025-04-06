<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TransactionType;

class TransactionTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TransactionType::insert([
            [
                'id' => 1,
                'name' => 'Income',
                'description' => 'Money coming into an account'
            ],
            [
                'id' => 2,
                'name' => 'Expense',
                'description' => 'Money going out of an account'
            ],
            [
                'id' => 3,
                'name' => 'Transfer',
                'description' => 'Money moving between accounts'
            ],
        ]);
    }
}
