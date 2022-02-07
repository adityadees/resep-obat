<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ObatController;
use App\Http\Controllers\SignaController;
use App\Http\Controllers\ResepController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\LogsController;

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

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/history', [HistoryController::class, 'index'])->name('history');
Route::get('/logs', [LogsController::class, 'index'])->name('logs');
Route::get('/obat/getData/{obat_id}', [ObatController::class, 'getData'])->name('obat.getData');
Route::get('/signa/getData', [SignaController::class, 'getData'])->name('signa.getData');
Route::post('/resep/create', [ResepController::class, 'create'])->name('resep.create');
Route::get('/history/cetak/{resep_kode}', [HistoryController::class, 'cetak'])->name('history.cetak');
