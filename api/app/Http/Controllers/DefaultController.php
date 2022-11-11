<?php

namespace App\Http\Controllers;

use App\Http\Responses\BasicResponse;
use Illuminate\Http\JsonResponse;

class DefaultController extends Controller
{
    /**
     * Display welcome message
     * @return JsonResponse
     */
    public function welcome(): JsonResponse
    {
        return (new BasicResponse(['Dobrodošli na ACollab API.']))
            ->response();
    }
}
