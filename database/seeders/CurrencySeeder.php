<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Currency;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Currency::insert([
            [
                'id' => 1,
                'name' => 'US Dollar',
                'code' => 'USD',
                'symbol' => '$',
            ],
            [
                'id' => 2,
                'name' => 'Euro',
                'code' => 'EUR',
                'symbol' => '€',
            ],
        ]);
    }
}
