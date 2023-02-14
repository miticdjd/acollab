<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class XSS
{
    /**
     * Filter user inputs for XSS prevention
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $userInput = $request->all();
        array_walk_recursive($userInput, function (&$userInput) {
            $userInput = htmlspecialchars(strip_tags($userInput));
        });
        $request->merge($userInput);

        return $next($request);
    }
}
