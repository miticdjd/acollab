@extends('emails.default')

@section('title', 'Zahtev za promenu lozinke')

@section('main')
{{--    {!! $body !!}--}}
    <h1 style="font-weight: 500; font-family: 'IBM Plex Sans', sans-serif; font-size: 20px;">Pozdrav,</h1>
    <p style="margin-bottom: 30px;">Vaša lozinka može biti resetovana klikom na dugme dole. Ukoliko Vi niste zatražili novu lozinku, molim Vas da ignorišete email.</p>
    <p style="text-align: center; margin-bottom: 30px;">
        <a href="{{ $url }}/auth/reset-password/{{ $token }}" class="ol btn-primary" target="_blank" rel="noreferrer noopener">
            Resetuj lozinku
        </a>
    </p>
@endsection
