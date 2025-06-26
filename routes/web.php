<?php

use App\Http\Controllers\LinkController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/login')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('links', function () {
        return Inertia::render('links');
    })->name('links');
    Route::ApiResources([
        'tag' => TagController::class,
        'link' => LinkController::class,
        'user' => UserController::class,
    ]);

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
