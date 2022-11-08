<?php

namespace App\Services\Token\Exception;

class InvalidTokenType extends TokenException
{
    /**
     * Invalid token type is provided
     * @var string
     */
    protected $message = 'Invalid token type is provided.';

    public function __construct()
    {
        parent::__construct($this->message, 0, null);
    }
}
