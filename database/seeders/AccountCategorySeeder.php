<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AccountCategory;

class AccountCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AccountCategory::insert([
            ['name' => 'Savings', 'description' => 'Savings accounts'],
            ['name' => 'Checking', 'description' => 'Checking accounts'],
            ['name' => 'Credit', 'description' => 'Credit accounts'],
        ]);
    }
}
