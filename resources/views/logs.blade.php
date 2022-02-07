@extends('layouts.index')
@section('content')
@include('layouts.alert')


<div class="row">
    <div class="col-md-12">
        <div class="card mt-5">
            <div class="card-header bg-dark">
                <h4 class="card-title text-white">{{$title}}</h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12 mb-2">
                        <div class="table-responsive">
                            <table class="table dttables">
                                <thead>
                                    <tr>
                                        <th class="text-center">NO</th>                                        
                                        <th class="text-center">TANGGAL</th>                                        
                                        <th class="text-center">Keterangan</th>                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($logs as $v => $i)
                                    <tr>
                                        <td class="text-center">{{($v+1)}}</td>
                                        <td class="text-center">{{date('d-m-Y H:i:s',strtotime($i->created_at))}}</td>
                                        <td>{{$i->logs_keterangan}}</td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</div>
@endsection

@section('custom_js')
@endsection