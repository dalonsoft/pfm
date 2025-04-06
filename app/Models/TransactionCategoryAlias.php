<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TransactionCategoryAlias extends Model
{
    use HasFactory;

    protected $fillable = ['alias', 'transaction_category_id'];

    /**
     * Get the transaction category that owns the alias.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(TransactionCategory::class, 'transaction_category_id');
    }
}