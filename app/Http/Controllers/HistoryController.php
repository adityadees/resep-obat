<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Resep_m;
use App\Models\Resep_detail_m;
use PDF;

class HistoryController extends Controller
{
    public function index()
    {
        $this->data['title'] = 'History';
        $this->data['resep'] = Resep_m::orderBy('created_at', 'desc')->groupBy('resep_kode')->get();
        return view('history/history', $this->data);
    }
    public function cetak(Request $request)
    {
        $uri = $request->segment(3);
        $resep = Resep_m::join('signa_m', 'resep.signa_id', '=', 'signa_m.signa_id')
        ->where(['resep.resep_kode' => $uri])
        ->get();

        $data = [];
        foreach($resep as $i){
            $data[] =  [
                'resep' => $i,
                'jenis' => $i->resep_jenis,
                'detail' => Resep_detail_m::join('obatalkes_m','obatalkes_m.obatalkes_id' , '=','resep_detail.obatalkes_id')
                ->where(['resep_detail.resep_id' => $i->resep_id])
                ->get(),
            ];
        }
        $this->data['resArray'] = $data;
        $this->data['title'] = 'Cetak Resep';
        $pdf = PDF::loadView('history/cetak', $this->data);
        return $pdf->download('downloadResep.pdf');
    }
}
