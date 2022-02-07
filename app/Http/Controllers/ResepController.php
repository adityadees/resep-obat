<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Resep_m;
use App\Models\Resep_detail_m;
use App\Models\Obatalkes_m;
use App\Models\Logs_m;

class ResepController extends Controller
{
    public function create(Request $request)
    {
        $nonracik = $request->input('nonracik');
        $resepKode = 'RESEP'.rand(0,999).date('md').rand(0,99);
        foreach(json_decode($nonracik) as $i){
            $data = [
                'signa_id' => $i->signa_id,
                'resep_kode' => $resepKode,
                'resep_jenis' => $i->jenis,
            ];
            $id = Resep_m::insertGetId($data);
            if($id){
                $logs = Logs_m::insert(['logs_keterangan' => 'Berhasil menambah data resep dengan ID Resep ' . $id]);
            } else {
                $logs = Logs_m::insert(['logs_keterangan' => 'Gagal menambah data resep ']);
            }

            $detail = [
                'resep_id' => $id,
                'obatalkes_id' => $i->obat_id,
                'resep_qty' => $i->qty,
            ];
            $saveDetail = Resep_detail_m::insert($detail);
            if($saveDetail){
                $logs = Logs_m::insert(['logs_keterangan' => 'Berhasil menambah rincian resep dengan ID Obat ' . $i->obat_id]);
                $update = Obatalkes_m::Where('obatalkes_id',$i->obat_id)->decrement('stok',  $i->qty);
                if($update){
                    $logs = Logs_m::insert(['logs_keterangan' => 'Berhasil mengurangi stok obat dengan ID Obat ' . $i->obat_id]);
                } else {
                    $logs = Logs_m::insert(['logs_keterangan' => 'Gagal mengurangi stok obat ']);
                }
            } else {
                $logs = Logs_m::insert(['logs_keterangan' => 'Gagal menambah rincian resep ']);
            }
        }
        $racik = $request->input('racik');

        foreach(json_decode($racik) as $i){
            $data = [
                'signa_id' => $i->signa_id,
                'resep_kode' => $resepKode,
                'resep_nama' => $i->namaRacikan,
                'resep_jenis' => $i->jenis,
            ];
            $id = Resep_m::insertGetId($data);

            if($id){
                $logs = Logs_m::insert(['logs_keterangan' => 'Berhasil menambah data resep dengan ID Resep ' . $id]);
            } else {
                $logs = Logs_m::insert(['logs_keterangan' => 'Gagal menambah data resep ']);
            }

            for($j=0;$j<count($i->obat_id);$j++){
                $detail = [
                    'resep_id' => $id,
                    'obatalkes_id' => $i->obat_id[$j],
                    'resep_qty' => $i->qty[$j],
                ];
                $saveDetail = Resep_detail_m::insert($detail);
                if($saveDetail){
                    $logs = Logs_m::insert(['logs_keterangan' => 'Berhasil menambah rincian resep dengan ID Obat ' . $i->obat_id[$j]]);
                    $update = Obatalkes_m::Where('obatalkes_id',$i->obat_id[$j])->decrement('stok',  $i->qty[$j]);
                    if($update){
                        $logs = Logs_m::insert(['logs_keterangan' => 'Berhasil mengurangi stok obat dengan ID Obat ' . $i->obat_id[$j]]);
                    } else {
                        $logs = Logs_m::insert(['logs_keterangan' => 'Gagal mengurangi stok obat ']);
                    }
                } else {
                    $logs = Logs_m::insert(['logs_keterangan' => 'Gagal menambah rincian resep ']);
                }
            }
        }

        $res = [
            'status' => $saveDetail,
            'resepKode' => $resepKode,
        ];
        return response()->json($res);
    }
}
