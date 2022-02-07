<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Logs_m;

class LogsController extends Controller
{
    public function index()
    {
        $this->data['title'] = 'Logs';
        $this->data['logs'] = Logs_m::orderBy('created_at', 'desc')->get();
        return view('logs', $this->data);
    }
}
