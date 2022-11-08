@extends('emails.default')

@section('title', $emailSubject)

@section('main')
{{--    {!! $body !!}--}}
    <p style="margin-bottom: 30px;">{!! nl2br(e($emailMessage)) !!}</p>
    <p style="text-align: center; margin-bottom: 30px;">
        <a href="{{ $url }}/finalista/medjudrzavni/promena/{{ $registration }}" class="ol btn-primary" target="_blank" rel="noreferrer noopener">
            {{ __('text.mail.confirm_arrival') }}
        </a>
    </p>
@endsection
