<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Account extends Model
{
    protected $table = 'accounts';
    protected $fillable = [
        'name',
        'description',
        'number',
        'account_category_id',
        'currency_id'
    ];

    // Relationship with account category model
    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class);
    }

    // Relationship with currency model
    public function category(): BelongsTo
    {
        return $this->belongsTo(AccountCategory::class, 'account_category_id');
    }

    // Relationship with transaction model
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
