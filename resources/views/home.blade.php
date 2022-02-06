@extends('layouts.index')
@section('content')
@include('layouts.alert')


<div class="row">
    <div class="col-md-12">
        <div class="card mt-5">
            <div class="card-header bg-dark">
                <h4 class="card-title text-white">RESEP</h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12 mb-2">
                        <label>JENIS RESEP</label>
                    </div>
                    <div class="col-md-12 mb-2">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="jenis_resep" id="jenis-non-racik"
                                value="Non Racikan">
                            <label class="form-check-label" for="jenis-non-racik">NON RACIKAN</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="jenis_resep" id="jenis-racik"
                                value="Racikan">
                            <label class="form-check-label" for="jenis-racik">RACIKAN</label>
                        </div>
                    </div>
                </div>

                <div id="display-form">



                </div>

                <div class="row mt-3">
                    <div class="col-md-12">
                        <div class="form-group text-center">
                            <button class="btn btn-warning" id="save-draft"> <i class="	fas fa-layer-group"></i> Save to
                                Draft</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="col-md-12">
        <div class="card mt-5">
            <div class="card-header bg-dark">
                <h4 class="card-title text-white">Draft Resep</h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12 mb-2">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="table-draft">
                                <thead>
                                    <tr>
                                        <th class="text-center">NO</th>
                                        <th class="text-center">JENIS</th>
                                        <th class="text-center">NAMA RACIKAN/OBAT</th>
                                        <th class="text-center">QTY</th>
                                        <th class="text-center">SIGNA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-md-12 mb-2" id="appendSubmit">

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('custom_js')
<script src="{{ asset('custom/js/resep/_event.js') }}"></script>
<script src="{{ asset('custom/js/resep/_function.js') }}"></script>
@endsection