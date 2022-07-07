<?php

use App\Http\Controllers\orderController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("/order", [orderController::class, "placeOrder"]);
Route::post("/message", [orderController::class, "newMessage"]);
Route::get("/stock", [orderController::class, "getStock"]);
Route::get("/orders", [orderController::class, "getOrders"]);
Route::get("/messages", [orderController::class, "getMessages"]);

