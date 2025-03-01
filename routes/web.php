<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('Home', [ // 🔹 Esto indica que la vista "Home" es un componente React, no Blade.
        'message' => '¡Bienvenido a Inertia con React y Laravel!',
    ]);
});

