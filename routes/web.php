<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/index.html', function () {
    return view('index');
});

Route::get('/bestellen.html', function () {
    return view('bestellen');
});
Route::get('/contact.html', function () {
    return view('contact');
});
Route::get('/admin.html', function () {
    return view('admin');
});
