<?php

namespace App\Services\Mailer\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Generated token
     * @var string
     */
    public string $token;

    /**
     * Web url
     * @var string
     */
    public string $url;

    /**
     * ResetPasswordMail constructor.
     * @param string $token
     */
    public function __construct(string $token)
    {
        $this->token = $token;
        $this->url = env('WEB_URL', '/');

        $this->subject('Zahtev za promenu lozinke');
    }

    /**
     * Build email
     * @return ResetPasswordMail
     */
    public function build()
    {
        return $this->view('emails.auth.reset_password');
    }
}
