<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\YearController;
use App\Http\Controllers\AccountCategoryController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\TransactionCategoryController;
use App\Http\Controllers\TransactionCategoryAliasController;
use App\Http\Controllers\TransactionTypeController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\UserPreferenceController;

// Guest routes
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

// Authenticated routes
Route::middleware('auth')->group(function () {
    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Currency
    Route::get('/currencies', [CurrencyController::class, 'index'])->name('currencies.index');
    Route::delete('/currencies/{currency}', [CurrencyController::class, 'destroy'])->name('currencies.destroy');
    Route::post('/currencies', [CurrencyController::class, 'store'])->name('currencies.store');
    Route::put('/currencies/{currency}', [CurrencyController::class, 'update'])->name('currencies.update');

    // Account category
    Route::get('/account-categories', [AccountCategoryController::class, 'index'])->name('account-categories.index');
    Route::delete('/account-categories/{accountCategory}', [AccountCategoryController::class, 'destroy'])->name('account-categories.destroy');
    Route::post('/account-categories', [AccountCategoryController::class, 'store'])->name('account-categories.store');
    Route::put('/account-categories/{accountCategory}', [AccountCategoryController::class, 'update'])->name('account-categories.update');

    // Account
    Route::get('/accounts', [AccountController::class, 'index'])->name('accounts.index');
    Route::post('/accounts', [AccountController::class, 'store'])->name('accounts.store');
    Route::put('/accounts/{account}', [AccountController::class, 'update'])->name('accounts.update');
    Route::delete('/accounts/{account}', [AccountController::class, 'destroy'])->name('accounts.destroy');

    // Transaction
    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
    Route::delete('/transactions/{transaction}', [TransactionController::class, 'destroy'])->name('transactions.destroy');
    Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store');
    Route::put('/transactions/{transaction}', [TransactionController::class, 'update'])->name('transactions.update');
    Route::post('/transactions/search', [TransactionController::class, 'search'])->name('transactions.search');

    // Transaction category
    Route::get('/transaction-categories', [TransactionCategoryController::class, 'index'])->name('transaction-categories.index');
    Route::delete('/transaction-categories/{transactionCategory}', [TransactionCategoryController::class, 'destroy'])->name('transaction-categories.destroy');
    Route::post('/transaction-categories', [TransactionCategoryController::class, 'store'])->name('transaction-categories.store');
    Route::put('/transaction-categories/{transactionCategory}', [TransactionCategoryController::class, 'update'])->name('transaction-categories.update');
    
    // Transaction category alias
    Route::get('/transaction-category-aliases', [TransactionCategoryAliasController::class, 'index'])->name('transaction-category-aliases.index');
    Route::delete('/transaction-category-aliases/{transactionCategoryAlias}', [TransactionCategoryAliasController::class, 'destroy'])->name('transaction-category-aliases.destroy');
    Route::post('/transaction-category-aliases', [TransactionCategoryAliasController::class, 'store'])->name('transaction-category-aliases.store');
    Route::put('/transaction-category-aliases/{transactionCategoryAlias}', [TransactionCategoryAliasController::class, 'update'])->name('transaction-category-aliases.update');
    
    // Transaction type
    Route::get('/transaction-types', [TransactionTypeController::class, 'index'])->name('transaction-types.index');
    Route::delete('/transaction-types/{transactionType}', [TransactionTypeController::class, 'destroy'])->name('transaction-types.destroy');
    Route::post('/transaction-types', [TransactionTypeController::class, 'store'])->name('transaction-types.store');
    Route::put('/transaction-types/{transactionType}', [TransactionTypeController::class, 'update'])->name('transaction-types.update');

    // Settings
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::post('/settings', [SettingsController::class, 'store'])->name('settings.store');
    
    // User Preferences
    Route::get('/user-preferences', [UserPreferenceController::class, 'index'])->name('user-preferences.index');
    Route::post('/user-preferences', [UserPreferenceController::class, 'update'])->name('user-preferences.update');
});

// Chrome DevTools route handler
Route::get('.well-known/appspecific/{any}', function () {
    return response()->json(['status' => 'ok']);
})->where('any', '.*');

require __DIR__.'/auth.php';
