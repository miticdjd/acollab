@extends('emails.default')

@section('title', '')

@section('main')
{{--    {!! $body !!}--}}
    <h1 style="font-weight: 500; font-family: 'IBM Plex Sans', sans-serif; font-size: 20px;">{{ __('text.mail.dear_competators') }},</h1>
    <p style="margin-bottom: 30px;">{{ __('text.mail.thank_you_for_submittion') }} <a href='https://www.igremladih.hr' target='_blank'>www.igremladih.hr</a> {{ __('text.mail.thank_you_for_submittion_part_2') }}</p>
    <p style="margin-bottom: 30px;">{{ __('text.mail.bring_identification') }}</p>
    <p style="margin-bottom: 30px;">{{ __('text.mail.regulations') }} <a href='http://www.igremladih.hr/bs/sportovi/sportovi-i-kategorije' target='_blank'>{{ __('text.mail.more_info') }}</a></p>
    <p style="margin-bottom: 30px;">{{ __('text.mail.your_registration_can_be_changed') }}</p>
    <p style="text-align: center; margin-bottom: 30px;">
        <a href="{{ $url }}/registracija/promena/{{ $token }}" class="ol btn-primary" target="_blank" rel="noreferrer noopener">
            {{ __('text.mail.change_registration') }}
        </a>
    </p>
    <p style="margin-bottom: 30px;">{{ __('text.mail.follow_social_media') }} <a href="https://www.facebook.com/plazma.sportske.igre.mladih" target="_blank">Sportske igre mladih</a> {{ __('text.mail.follow_social_media_and_instagram') }} <a href="https://www.instagram.com/igremladih_hr/" target="_blank">igremladih_hr</a></p>
    <p style="margin-bottom: 30px;">{{ __('text.mail.see_you_on_field') }}</p>
@endsection
