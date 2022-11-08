<?php

namespace App\Services\User\Exception;

class InvalidPasswordException extends UserException
{
    /**
     * User can't be found
     * @var string
     */
    protected $message = 'Invalid password provided.';

    public function __construct(string $message = null)
    {
        parent::__construct($message ? $message : $this->message, 0, null);
    }
}
