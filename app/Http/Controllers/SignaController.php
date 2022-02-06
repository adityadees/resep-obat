<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Signa_m;

class SignaController extends Controller
{
    public function getData()
    {
        $signa = Signa_m::get();
        return response()->json($signa);
    }
}
