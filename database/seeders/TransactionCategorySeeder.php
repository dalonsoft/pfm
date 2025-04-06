<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TransactionCategory;

class TransactionCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TransactionCategory::insert([
            ['name' => 'Food', 'description' => 'Expenses related to food and dining'],
            ['name' => 'Transport', 'description' => 'Expenses related to transportation'],
            ['name' => 'Utilities', 'description' => 'Expenses for utilities like electricity, water, etc.'],
        ]);
    }
}
