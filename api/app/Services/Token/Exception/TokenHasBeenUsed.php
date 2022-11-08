<?php

namespace App\Services\Token\Exception;

class TokenHasBeenUsed extends TokenException
{
    /**
     * Invalid token type is provided
     * @var string
     */
    protected $message = 'Token has already been used.';

    public function __construct()
    {
        parent::__construct($this->message, 0, null);
    }
}
