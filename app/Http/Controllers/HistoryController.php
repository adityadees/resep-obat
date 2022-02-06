<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HistoryController extends Controller
{
    public function index()
    {
        $this->data['title'] = 'History';
        return view('history/history', $this->data);
    }
}
