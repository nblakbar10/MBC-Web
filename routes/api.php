<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\RedeemController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/checkout', [TransactionController::class, 'store'])->name('checkout');

Route::post('/callback', [TransactionController::class, 'callback']);
Route::post('/callback_dev', [TransactionController::class, 'callback_dev']);

Route::post('/redeem', [RedeemController::class, 'store'])->name('redeemAPI.store');

Route::get('/event', [EventController::class, 'getData'])->name('api.events');

Route::get('/transaction-ticket-type', [TransactionController::class, 'getTransactionByTicketTypeBetweenDatesGroupByDay'])->name('api.ticketTypeTransaction');

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
    ])->group(function () {
        Route::middleware(['role:admin|super-admin'])->group(function () {
            Route::get('/transaction', [TransactionController::class, 'getData'])->name('api.transactions');
            Route::get('/redeem', [RedeemController::class, 'getData'])->name('api.redeemHistories');
            Route::middleware(['role:super-admin'])->group(function () {
                Route::get('/user-activity', [UserActivity::class, 'getData'])->name('api.userActivities');
            });
        });
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
