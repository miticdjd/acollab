<?php

namespace App\Services\Mailer;

use Illuminate\Support\Facades\Mail;
use App\Models\User;
use App\Services\Mailer\Mail\ResetPasswordMail;

class Mailer
{
    const QUEUE_MAILER = 'mailer';

    /**
     * Send email for reset password instructions
     * @param User $user
     * @param string $token
     */
    public function resetPassword(User $user, string $token): void
    {
        $message = (new ResetPasswordMail($token))->onQueue(self::QUEUE_MAILER);

        Mail::to($user->email)->send($message);
    }
}
