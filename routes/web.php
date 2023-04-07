<?php

use App\Actions\Fortify\UserProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\PromoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\SendEmailController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [DashboardController::class, 'home'])->name('home');

Route::get('/transaction/redeemForm', [TransactionController::class, 'redeemForm'])->name('transaction.redeemForm');

Route::post('/callback', [TicketController::class, 'callback']);
Route::post('/redeem_ticket', [TicketController::class, 'redeem_ticket']);
// Route::post('/callback', [TransactionController::class, 'callback']);

Route::resource('/promo', PromoController::class);

// Route::get('send-email', [SendEmailController::class, 'index']);

Route::resource('/user', UserController::class);
Route::resource('/event', EventController::class);
Route::resource('/transaction', TransactionController::class);
Route::resource('/ticket', TicketController::class);


Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/user/profile', [UserProfileController::class, 'show'])->name('profile.show');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::middleware(['role:admin|super-admin'])->group(function () {
        Route::middleware(['role:super-admin'])->group(function () {
            // Route::resource('/user', UserController::class);
            // Route::resource('/event', EventController::class);
            // Route::resource('/event-promo', PromoController::class);
        });
    });
});


