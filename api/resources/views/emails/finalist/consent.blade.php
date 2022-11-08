@extends('emails.default')

@section('title', 'Saglasnost za učestvovanje na Sportskim Igrama Mladih')

@section('main')
{{--    {!! $body !!}--}}
    <h1 style="font-weight: 500; font-family: 'IBM Plex Sans', sans-serif; font-size: 20px;">{{ __('text.mail.dear') }},</h1>
    <p style="margin-bottom: 30px;">{{ __('text.mail.confirm_consent', ['member' => $member]) }}</p>
    <p style="text-align: center; margin-bottom: 30px;">
        <a href="{{ $url }}/finalista/saglasnost/{{ $registration }}/{{ $consent }}" class="ol btn-primary" target="_blank" rel="noreferrer noopener">
            {{ __('text.mail.give_consent') }}
        </a>
    </p>
@endsection
