<?php

namespace App\Http\Responses;

use Illuminate\Support\MessageBag;

class CollectionResponse extends BasicResponse
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
     * Meta data
     *
     * @var mixed
     */
    private $meta;

    /**
     * @param mixed $resource
     */
    public function __construct($resource = null)
    {
        parent::__construct($resource->items());

        if ($resource) {
            $this->data = $resource->items();
            $this->meta = [
                'current_page' => $resource->currentPage(),
                'last_page' => $resource->lastPage(),
                'per_page' => $resource->perPage(),
                'total' => $resource->total(),
            ];
        }

        $this->addAdditional('success', $this->success);
        $this->addAdditional('message', __($this->message));
        $this->addAdditional('meta', $this->meta);
    }
}
