<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Obatalkes_m;

class ObatController extends Controller
{
    public function getData(Request $request)
    {
        $uri = $request->segment(3);
        if($uri == 'undefined'){
            $obat = Obatalkes_m::get();
        } else {
            $obat = Obatalkes_m::Where(['obatalkes_id' => $uri])->first();
        }
        return response()->json($obat);
    }
}
