<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Account;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Account::insert([
            [
                'name' => 'Main Savings',
                'description' => 'Primary savings account',
                'number' => '123456789',
                'account_category_id' => 1,
                'currency_id' => 1,
            ],
            [
                'name' => 'Main Checking',
                'description' => 'Primary checking account',
                'number' => '987654321',
                'account_category_id' => 2,
                'currency_id' => 1,
            ],
        ]);
    }
}
