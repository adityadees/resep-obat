@include('layouts.header')
@include('layouts.navbar')
<main class="container">
    @yield('content')
</main>
@yield('section-modal')
@include('layouts.footer')