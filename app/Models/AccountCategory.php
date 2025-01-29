<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccountCategory extends Model
{
    protected $table = 'account_categories';
    protected $fillable = [
        'name',
        'description'
    ];

    // Relationship with account model
    public function accounts()
    {
        return $this->hasMany(Account::class);
    }
}
