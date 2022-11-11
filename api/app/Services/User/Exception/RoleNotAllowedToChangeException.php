<?php

namespace App\Services\User\Exception;

class RoleNotAllowedToChangeException extends RoleException
{
    /**
     * User can't be found
     * @var string
     */
    protected $message = 'Ovu rolu nije dozvoljeno da se menja.';

    public function __construct()
    {
        parent::__construct($this->message, 0, null);
    }
}
