<?php

namespace App\Services\Auth\Exception;

class UserCantBeFoundException extends AuthException
{
    /**
     * User can't be found
     * @var string
     */
    protected $message = 'User could not be found.';

    public function __construct()
    {
        parent::__construct($this->message, 0, null);
    }
}
