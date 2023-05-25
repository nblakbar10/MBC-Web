<?php

use App\Actions\Fortify\UserProfileController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\TicketDiscountController;
use App\Http\Controllers\TicketTypeController;
use App\Http\Controllers\UserActivityController;
use App\Http\Controllers\RedeemController;
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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/', [DashboardController::class, 'home'])->name('home');

Route::post('/transaction/store',[TransactionController::class, 'store'])->name('transaction.store');


Route::get('/token', function () {
    return csrf_token(); 
});

Route::prefix('admin')->group(function (){
    Route::resource('event', EventController::class);
    Route::resource('ticket-type', TicketTypeController::class);
    Route::resource('ticket-discount', TicketDiscountController::class);
    Route::resource('user-activity', UserActivityController::class);
    Route::resource('redeem', RedeemController::class);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/user/profile', [UserProfileController::class, 'show'])->name('profile.show');
    // Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::middleware(['role:admin|super-admin'])->group(function () {
        // Route::get('/transaction/redeemForm', [TransactionController::class, 'redeemForm'])->name('transaction.redeemForm');
        // Route::get('/transaction', [TransactionController::class, 'index'])->name('transaction.index');
        // Route::get('/transaction/export', [TransactionController::class, 'exportView'])->name('transaction.export-view');


        Route::middleware(['role:super-admin'])->group(function () {
            // Route::resource('/promo', PromoController::class);
            // Route::resource('/discount', DiscountController::class);
            // Route::get('/trasaction/edit/{id}', [TransactionController::class, 'edit'])->name('transaction.edit');
            // Route::put('/transaction/update/{id}', [TransactionController::class, 'update'])->name('transaction.update');
            // Route::resource('/ticket', TicketController::class);
            Route::resource('/user', UserController::class);
            // Route::resource('/event', EventController::class);
            // Route::resource('/event-promo', PromoController::class);
        });
    });
});


