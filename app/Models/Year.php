<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Year extends Model
{
    protected $table = 'years';
    protected $fillable = [
        'name',
        'start_date',
        'end_date'
    ];

    // Relationships with account model
    public function accounts()
    {
        return $this->belongsToMany(Account::class, 'account_year', 'year_id', 'account_id')
            ->withPivot('opening_balance')
            ->withTimestamps();
    }
}
