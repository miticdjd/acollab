@extends('emails.layout')

@section('footer')
    <div class="footer" style="clear: both; margin-top: 30px; text-align: center; width: 100%;">
        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; height: 42px;">
            <tr>
                <td style="height: 30px; vertical-align: middle; padding-left: 20px;">
                    <p style="line-height: 21px; font-size: 14px; color: #8492A5; text-align: left; margin: 0;">
                        Hefes Technology Group | {{ __('text.mail.automatic_mail') }}
                    </p>
                </td>
            </tr>
        </table>
    </div>
@endsection
