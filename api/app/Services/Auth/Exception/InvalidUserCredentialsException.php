<?php

namespace App\Services\Auth\Exception;

class InvalidUserCredentialsException extends AuthException
{
    /**
     * User and password combination is invalid.
     * @var string
     */
    protected $message = 'User and password combination is invalid.';

    public function __construct()
    {
        parent::__construct($this->message, 0, null);
    }
}
