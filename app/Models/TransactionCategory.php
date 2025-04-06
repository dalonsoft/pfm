<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TransactionCategory extends Model
{
    protected $fillable = [
        'name',
        'description',
        'parent_id'
    ];

    /**
     * Get the parent category.
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(TransactionCategory::class, 'parent_id');
    }

    /**
     * Get the category aliases.
     */
    public function categoryAliases(): HasMany
    {
        return $this->hasMany(TransactionCategoryAlias::class, 'category_id');
    }
}