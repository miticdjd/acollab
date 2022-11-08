<?php

namespace App\Services\Token\Exception;

class TokenHasExpired extends TokenException
{
    /**
     * Invalid token type is provided
     * @var string
     */
    protected $message = 'Token has been expired.';

    public function __construct()
    {
        parent::__construct($this->message, 0, null);
    }
}
