<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TransactionCategoryAlias;

class TransactionCategoryAliasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TransactionCategoryAlias::insert([
            ['alias' => 'Groceries', 'transaction_category_id' => 1],
            ['alias' => 'Bus', 'transaction_category_id' => 2],
            ['alias' => 'Electricity', 'transaction_category_id' => 3],
        ]);
    }
}
