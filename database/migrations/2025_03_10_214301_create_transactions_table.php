<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->foreignId('transaction_type_id')->constrained('transaction_types');
            $table->foreignId('account_id')->constrained('accounts');
            $table->string('concept');
            $table->decimal('amount', 10, 2);
            $table->foreignId('transaction_category_id')->constrained('transaction_categories');
            $table->decimal('balance', 10, 2)->nullable();
            $table->string('note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};