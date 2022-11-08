<?php

namespace App\Services\User\Exception;

class RoleNotAllowedToChangeException extends RoleException
{
    /**
     * User can't be found
     * @var string
     */
    protected $message = 'This role is not allowed to be changed.';

    public function __construct()
    {
        parent::__construct($this->message, 0, null);
    }
}
