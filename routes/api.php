<?php

use App\Http\Controllers\TransactionController;
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

Route::post('/redeem', [TransactionController::class, 'redeem'])->name('transaction.redeem');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
