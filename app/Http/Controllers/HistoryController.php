<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Resep_m;
use App\Models\Resep_detail_m;

class HistoryController extends Controller
{
    public function index()
    {
        $this->data['title'] = 'History';
        $this->data['resep'] = Resep_m::orderBy('created_at', 'desc')->groupBy('resep_kode')->get();
        return view('history/history', $this->data);
    }
}
