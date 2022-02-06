<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LogsController extends Controller
{
    public function index()
    {
        $this->data['title'] = 'Logs';
        return view('logs', $this->data);
    }
}
