<script src="{{ asset('jquery/jquery-3.6.0.min.js') }}"></script>
<script src="{{ asset('bootstrap/js/bootstrap.bundle.min.js') }}"></script>
<script src="{{ asset('select2/select2.min.js') }}"></script>
<script src="{{ asset('toastr/toastr.min.js') }}"></script>
<script>
    const base_url = '<?= url('/') ?>';
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
</script>
<script src="{{ asset('custom/js/constant.js') }}"></script>
<script src="{{ asset('custom/js/global.js') }}"></script>
@if (session()->has('success'))
<script>
    toastr.success('<?= session('success') ?>', 'BERHASIL!');
</script>
@elseif(session()-> has('error'))
<script>
    toastr.error('<?= session('error') ?>', 'GAGAL!');
</script>
@endif
@yield('custom_js')
</body>

</html>