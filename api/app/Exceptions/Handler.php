<?php

namespace App\Exceptions;

use App\Http\Responses\BasicResponse;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Throwable
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $e)
    {
        if (
            $e instanceof NotFoundHttpException ||
            $e instanceof ModelNotFoundException
        ) {

            return (new BasicResponse())
                ->setMessage('404 not found.')
                ->setSuccess(false)
                ->response()
                ->setStatusCode(Response::HTTP_NOT_FOUND);
        }

        if ($e instanceof AuthorizationException) {

            return (new BasicResponse())
                ->setMessage('Forbidden.')
                ->setSuccess(false)
                ->response()
                ->setStatusCode(Response::HTTP_FORBIDDEN);
        }

        return parent::render($request, $e);
    }
}
