<?php

namespace App\Http\Responses;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\MessageBag;

class BasicResponse extends JsonResource
{
    /**
     * Set success of this response
     * @var boolean
     */
    private bool $success = true;

    /**
     * Set message that we will use for display.
     * @var string
     */
    private string $message = 'Ok.';

    /**
     * @var MessageBag
     */
    private MessageBag $errors;

    /**
     * Mixed resource
     * @var mixed
     */
    private $data;

    /**
     * @param mixed $resource
     */
    public function __construct($resource = null)
    {
        parent::__construct($resource);

        if ($resource) {
            $this->data = $resource;
        }

        $this->addAdditional('success', $this->success);
        $this->addAdditional('message', __($this->message));
    }

    /**
     * Add new additional parameter
     * @param string $parameter
     * @param mixed $value
     * @return BasicResponse
     */
    public function addAdditional(string $parameter, $value): BasicResponse
    {
        $this->additional[$parameter] = $value;

        return $this;
    }

    /**
     * Set message
     * @param string $message
     * @return BasicResponse
     */
    public function setMessage(string $message): BasicResponse
    {
        $this->message = $message;
        $this->addAdditional('message', __($message));

        return $this;
    }

    /**
     * Set success flag
     * @param bool $success
     * @return BasicResponse
     */
    public function setSuccess(bool $success): BasicResponse
    {
        $this->success = $success;
        $this->addAdditional('success', $success);

        return $this;
    }

    /**
     * Set errors (usually form validation errors)
     * @param MessageBag $errors
     * @return BasicResponse
     */
    public function setErrors(MessageBag $errors): BasicResponse
    {
        $this->errors = $errors;
        $this->addAdditional('errors', $errors->toArray());

        return $this;
    }
}
