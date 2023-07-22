<?php

use App\Actions\Fortify\UserProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\RedeemController;
use App\Http\Controllers\TicketDiscountController;
use App\Http\Controllers\TicketTypeController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserActivityController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VisitorController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\SendEmailController;
use App\Models\Transaction;

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


Route::get('/token', function () {
    return csrf_token(); 
});

Route::get('/',[VisitorController::class, 'home'])->name('visitor.home');
Route::get('/event', [VisitorController::class, 'event'])->name('visitor.event');
Route::get('/event/{id}', [VisitorController::class, 'eventDetail'])->name('visitor.event-detail');
Route::post('/transaction/store',[TransactionController::class, 'store'])->name('transaction.store');
Route::post('/callback', [TransactionController::class, 'callback']);
Route::get('/transaction-ticket-type', [TransactionController::class, 'getTransactionByTicketTypeBetweenDatesGroupByDay'])->name('transactionTicketTypes');



Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
    ])->group(function () {
        Route::get('/user/profile', [UserProfileController::class, 'show'])->name('profile.show');
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::middleware(['role:admin|super-admin'])->group(function () {
            Route::prefix('admin')->group(function (){
                Route::resource('event', EventController::class);
                Route::resource('ticket-type', TicketTypeController::class);
                Route::resource('ticket-discount', TicketDiscountController::class);
                Route::resource('redeem', RedeemController::class);
                Route::get('/transaction', [TransactionController::class, 'index'])->name('transaction.index');
                Route::get('/transaction/export', [TransactionController::class, 'exportView'])->name('transaction.export-view');
            });
            Route::middleware(['role:super-admin'])->group(function () {
                Route::resource('/user', UserController::class);
                Route::resource('user-activity', UserActivityController::class);
        });
    });
});


