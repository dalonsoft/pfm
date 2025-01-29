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

    // Relationships with year model
    public function years()
    {
        return $this->belongsToMany(Year::class, 'account_year', 'account_id', 'year_id')
            ->withPivot('opening_balance')
            ->withTimestamps();
    }

    // Relationship with account category model
    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class);
    }

    // Relationship with currency model
    public function accountCategory(): BelongsTo
    {
        return $this->belongsTo(AccountCategory::class);
    }

    // Relationship with transaction model
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
