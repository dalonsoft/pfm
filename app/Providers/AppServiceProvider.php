<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use App\Http\Middleware\SetLocale;
use Illuminate\Contracts\Http\Kernel;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        
        // Registrar el middleware SetLocale usando el nuevo enfoque de Laravel 11
        $kernel = $this->app->make(Kernel::class);
        $kernel->appendMiddlewareToGroup('web', SetLocale::class);
    }
}
