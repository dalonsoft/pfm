<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Currency extends Model
{
    protected $table = 'currencies';
    protected $fillable = ['name', 'code', 'symbol'];

    public function accounts(): HasMany
    {
        return $this->hasMany(Account::class);
    }
}
